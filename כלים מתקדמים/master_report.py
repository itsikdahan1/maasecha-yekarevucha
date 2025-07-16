import asyncio
from playwright.async_api import async_playwright
from PIL import Image, ImageChops
import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from datetime import datetime

# ==============================================================================
# --- הגדרות מרכזיות ---
# ==============================================================================
BASE_URL = "https://www.Maasecha.com/"
PAGES_FOR_SEO_CHECK = [
    "https://www.Maasecha.com/",
    "https://www.Maasecha.com/how-it-works",
    "https://www.Maasecha.com/blog"
]
HOMEPAGE_URL = "https://www.Maasecha.com/"
VISUAL_BASELINE_FILENAME = "baseline.png"

# ==============================================================================
# --- חלק 1: לוגיקה של בדיקת קישורים ---
# ==============================================================================
internal_urls_crawled = set()
broken_links_found = {}

def check_link_status(url, source_page):
    try:
        response = requests.head(url, timeout=5)
        if response.status_code >= 400:
            if url not in broken_links_found:
                broken_links_found[url] = {"source": source_page, "status": response.status_code}
    except requests.RequestException:
        if url not in broken_links_found:
            broken_links_found[url] = {"source": source_page, "status": "שגיאת רשת"}

def crawl_for_links(url, base_domain):
    if url in internal_urls_crawled:
        return
    internal_urls_crawled.add(url)
    try:
        response = requests.get(url, timeout=10)
        soup = BeautifulSoup(response.content, 'html.parser')
        for a_tag in soup.find_all("a", href=True):
            href = a_tag.attrs.get("href")
            if href:
                full_url = urljoin(url, href)
                parsed_full = urlparse(full_url)
                if bool(parsed_full.netloc) and bool(parsed_full.scheme):
                    if parsed_full.netloc == base_domain:
                        crawl_for_links(full_url, base_domain)
                    # בודקים את כל הקישורים, גם חיצוניים
                    if full_url not in broken_links_found:
                        check_link_status(full_url, url)
    except requests.RequestException:
        return

async def run_link_check():
    print("מתחיל בדיקת קישורים...")
    base_domain = urlparse(BASE_URL).netloc
    crawl_for_links(BASE_URL, base_domain)
    print("בדיקת קישורים הסתיימה.")
    return broken_links_found

# ==============================================================================
# --- חלק 2: לוגיקה של ניטור ויזואלי ---
# ==============================================================================
async def run_visual_check():
    print("מתחיל ניטור ויזואלי...")
    latest_filename = "latest_homepage.png"
    diff_filename = "diff_homepage.png"
    
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()
            await page.goto(HOMEPAGE_URL, wait_until="load")
            await page.screenshot(path=latest_filename, full_page=True)
            await browser.close()
    except Exception as e:
        return f"שגיאה בצילום המסך: {e}", None

    if not os.path.exists(VISUAL_BASELINE_FILENAME):
        os.rename(latest_filename, VISUAL_BASELINE_FILENAME)
        return "נוצרה תמונת בסיס חדשה", None
    
    img_base = Image.open(VISUAL_BASELINE_FILENAME).convert('RGB')
    img_latest = Image.open(latest_filename).convert('RGB')
    
    if img_base.size != img_latest.size:
        os.remove(latest_filename)
        return "שינוי זוהה (גודל תמונה שונה)", None

    diff = ImageChops.difference(img_base, img_latest)
    
    os.remove(latest_filename)
    if diff.getbbox():
        diff.save(diff_filename)
        return f"זוהה שינוי! קובץ הבדלים נשמר בשם {diff_filename}", diff_filename
    else:
        if os.path.exists(diff_filename):
            os.remove(diff_filename) # מחיקת קובץ הבדלים ישן אם אין יותר הבדלים
        return "תקין, לא זוהה שינוי", None

# ==============================================================================
# --- חלק 3: לוגיקה של ניתוח SEO ---
# ==============================================================================
def analyze_single_page_seo(url):
    results = {}
    try:
        response = requests.get(url, timeout=10)
        soup = BeautifulSoup(response.content, 'html.parser')
        
        title_tag = soup.find('title')
        results['title'] = title_tag.get_text().strip() if title_tag else "חסר"
        
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        results['description'] = meta_desc.get('content', 'חסר') if meta_desc else "חסר"
        
        h1_tags = soup.find_all('h1')
        results['h1_count'] = len(h1_tags)
        
        images = soup.find_all('img')
        images_missing_alt = len([img for img in images if not img.get('alt', '').strip()])
        results['images_missing_alt'] = images_missing_alt
        
        return results
    except Exception as e:
        return {"error": f"לא ניתן לסרוק: {e}"}

async def run_seo_check():
    print("מתחיל בדיקת SEO...")
    report = {}
    for page_url in PAGES_FOR_SEO_CHECK:
        report[page_url] = analyze_single_page_seo(page_url)
    print("בדיקת SEO הסתיימה.")
    return report

# ==============================================================================
# --- חלק 4: יצירת דוח HTML ---
# ==============================================================================
def generate_html_report(link_results, visual_results, seo_results):
    report_time = datetime.now().strftime("%d-%m-%Y %H:%M:%S")
    visual_status, diff_file_path = visual_results

    # בניית החלק של הקישורים השבורים
    if not link_results:
        link_report_html = '<p class="ok">לא נמצאו קישורים שבורים!</p>'
    else:
        rows = ""
        for link, details in link_results.items():
            rows += f'<tr><td><a href="{link}" target="_blank">{link}</a></td><td>{details["status"]}</td><td>{details["source"]}</td></tr>'
        link_report_html = f"""
        <p class="error">נמצאו {len(link_results)} קישורים שבורים:</p>
        <table>
            <tr><th>קישור שבור</th><th>סטטוס</th><th>נמצא בעמוד</th></tr>
            {rows}
        </table>
        """
    
    # בניית החלק של בדיקת ה-SEO
    seo_rows = ""
    for url, data in seo_results.items():
        if "error" in data:
            status_html = f'<span class="error">{data["error"]}</span>'
        else:
            is_ok = data.get('h1_count') == 1 and data.get('images_missing_alt') == 0
            status_class = 'ok' if is_ok else 'error'
            status_text = 'תקין' if is_ok else 'דורש בדיקה'
            status_html = f'<span class="{status_class}">{status_text}</span>'

        seo_rows += f"""
        <tr>
            <td><a href="{url}" target="_blank">{url.replace(BASE_URL, '/')}</a></td>
            <td>{data.get('h1_count', 'N/A')}</td>
            <td>{data.get('images_missing_alt', 'N/A')}</td>
            <td>{status_html}</td>
        </tr>
        """
    seo_report_html = f"<table><tr><th>עמוד</th><th>ספירת H1</th><th>תמונות ללא Alt</th><th>סטטוס</th></tr>{seo_rows}</table>"


    # הרכבת קובץ ה-HTML המלא
    html = f"""
    <!DOCTYPE html>
    <html lang="he" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <title>דוח בריאות אתר - {report_time}</title>
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4; color: #333; }}
            .container {{ max-width: 960px; margin: 20px auto; background: #fff; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1); border-radius: 8px; }}
            h1, h2, h3 {{ color: #1a202c; border-bottom: 2px solid #06b6d4; padding-bottom: 10px; }}
            h1 {{ text-align: center; }}
            .summary {{ background: #eefbff; border-left: 5px solid #06b6d4; padding: 15px; margin-bottom: 20px; }}
            .section {{ margin-bottom: 30px; }}
            .ok {{ color: green; font-weight: bold; }}
            .error {{ color: red; font-weight: bold; }}
            table {{ width: 100%; border-collapse: collapse; margin-top: 15px; }}
            th, td {{ padding: 12px; border: 1px solid #ddd; text-align: right; }}
            th {{ background-color: #f2f2f2; }}
            a {{ color: #06b6d4; text-decoration: none; }}
            a:hover {{ text-decoration: underline; }}
        </style>
    </head>
    <body>
        <div class="container">
            <h1>דוח בריאות אתר - מעשיך יקרבוך</h1>
            <p class="summary">הדוח נוצר בתאריך: {report_time}</p>

            <div class="section">
                <h2>ניטור שינויים ויזואליים (דף הבית)</h2>
                <p><strong>סטטוס:</strong> <span class="{'ok' if 'תקין' in visual_status else 'error'}">{visual_status}</span></p>
                {'<p>ניתן לצפות בקובץ ההבדלים: <a href="' + diff_file_path + '">' + diff_file_path + '</a></p>' if diff_file_path else ''}
            </div>

            <div class="section">
                <h2>בדיקת קישורים שבורים</h2>
                {link_report_html}
            </div>

            <div class="section">
                <h2>בדיקת SEO טכני</h2>
                {seo_report_html}
            </div>

        </div>
    </body>
    </html>
    """
    with open("health_report.html", "w", encoding="utf-8") as f:
        f.write(html)
    print("\nדוח HTML נוצר בהצלחה: health_report.html")

# ==============================================================================
# --- פונקציה ראשית להרצת כל הבדיקות ---
# ==============================================================================
async def main():
    print("--- מתחיל הפקת דוח בריאות שבועי ---")
    
    link_check_results = await run_link_check()
    visual_check_results = await run_visual_check()
    seo_check_results = await run_seo_check()
    
    generate_html_report(link_check_results, visual_check_results, seo_check_results)
    
    print("\n--- כל הבדיקות הסתיימו ---")

if __name__ == "__main__":
    asyncio.run(main())