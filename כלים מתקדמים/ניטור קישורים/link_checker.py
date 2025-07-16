import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

# --- הגדרות ---
START_URL = "https://www.Maasecha.com/"
# ---------------------------------------------

# משתנים גלובליים לאחסון הנתונים
all_internal_urls = set()
all_external_urls = set()
broken_links = {}

def is_valid(url):
    """
    בודק אם הקישור הוא תקין (לא קישור למייל, טלפון וכו')
    """
    parsed = urlparse(url)
    return bool(parsed.netloc) and bool(parsed.scheme)

def check_link_status(url, source_page):
    """
    בודק את הסטטוס של קישור בודד
    """
    try:
        response = requests.head(url, timeout=10)
        if response.status_code >= 400:
            broken_links[url] = {"source": source_page, "status": response.status_code}
            print(f"❌ קישור שבור נמצא: {url} (סטטוס {response.status_code}) בעמוד: {source_page}")
    except requests.RequestException as e:
        broken_links[url] = {"source": source_page, "status": "שגיאת רשת"}
        print(f"❌ קישור שבור נמצא: {url} (שגיאת רשת) בעמוד: {source_page}")

def crawl(url, base_domain):
    """
    הפונקציה המרכזית שסורקת דף, מוצאת קישורים ומפעילה את עצמה מחדש על קישורים פנימיים
    """
    if url in all_internal_urls:
        return 
    
    print(f"🔎 סורק את העמוד: {url}")
    all_internal_urls.add(url)
    
    try:
        response = requests.get(url, timeout=10)
    except requests.RequestException:
        return

    soup = BeautifulSoup(response.content, 'html.parser')

    for a_tag in soup.find_all("a", href=True):
        href = a_tag.attrs.get("href")
        if not href:
            continue
            
        full_url = urljoin(url, href)
        
        if not is_valid(full_url):
            continue

        # בדיקת הקישור בפעם הראשונה שפוגשים אותו
        if full_url not in broken_links and full_url not in all_external_urls and full_url not in all_internal_urls:
             check_link_status(full_url, url)

        if urlparse(full_url).netloc != base_domain:
            if full_url not in all_external_urls:
                all_external_urls.add(full_url)
        else:
            if full_url not in all_internal_urls:
                crawl(full_url, base_domain)


def main():
    base_domain = urlparse(START_URL).netloc
    print(f"--- מתחיל סריקת קישורים באתר: {base_domain} ---")
    
    crawl(START_URL, base_domain)

    print("\n\n--- סריקה הושלמה. מכין דוח ---")
    
    # --- דוח קישורים שבורים ---
    if broken_links:
        print(f"\n❌ נמצאו {len(broken_links)} קישורים שבורים:")
        for link, details in broken_links.items():
            print(f"  - קישור: {link} | סטטוס: {details['status']} | נמצא בעמוד: {details['source']}")
    else:
        print("\n✅ כל הכבוד! לא נמצאו קישורים שבורים באתר.")
        
    # --- דוח כללי (סיכום) ---
    print("\n" + "="*40)
    print("📊 סיכום כללי:")
    print(f"   - נסרקו {len(all_internal_urls)} דפים פנימיים.")
    print(f"   - נבדקו {len(all_external_urls)} קישורים חיצוניים.")
    print(f"   - נמצאו {len(broken_links)} קישורים שבורים.")
    print("="*40)
    
    # --- הוספה חדשה: הדפסת כל הקישורים שנמצאו ---
    print("\nרשימת כל הדפים הפנימיים שנסרקו:")
    for internal_url in sorted(list(all_internal_urls)):
        print(f"  - {internal_url}")
        
    print("\nרשימת כל הקישורים החיצוניים שנמצאו:")
    if all_external_urls:
        for external_url in sorted(list(all_external_urls)):
            print(f"  - {external_url}")
    else:
        print("  - לא נמצאו קישורים חיצוניים.")


if __name__ == "__main__":
    main()