import asyncio
from playwright.async_api import async_playwright
import os

# --- 1. רשימת הדפים להמרה ---
# !!! הוסף או שנה את הכתובות ברשימה לפי הדפים באתר שלך !!!
PAGES_TO_CONVERT = {
    "home": "https://www.Maasecha.com/",
    "how-it-works": "https://www.Maasecha.com/how-it-works",
    "blog": "https://www.Maasecha.com/blog",
    "testimonials": "https://www.Maasecha.com/testimonials",
    "faq": "https://www.Maasecha.com/faq"
    # הוסף עוד דפים כאן במבנה: "שם-קובץ": "כתובת-מלאה"
}

# --- 2. הגדרות צילום התמונה ---
TIMEOUT_DURATION = 60000  # 60 שניות


async def convert_page_to_png(page_name, url):
    """
    פונקציה שמקבלת שם וכתובת של דף, ומצלמת אותו לקובץ PNG
    """
    output_filename = f"Maasecha-{page_name}.png"  # <-- שינוי סיומת הקובץ ל-png
    
    print(f"\n--- מתחיל צילום באיכות גבוהה (PNG) עבור: {page_name} ---")
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page()
            page.set_default_timeout(TIMEOUT_DURATION)
            
            print(f"טוען את האתר: {url}")
            await page.goto(url, wait_until="load")
            
            print("ממתין לטעינה סופית...")
            await page.wait_for_timeout(3000)

            print(f"מצלם את העמוד לקובץ: {output_filename}...")
            # --- הפקודה עודכנה ליצירת תמונת PNG ---
            await page.screenshot(
                path=output_filename, 
                full_page=True, # חשוב: מצלם את כל גובה העמוד
                type='png'      # <--- השינוי המרכזי: שומרים כ-PNG
            )
            
            await browser.close()
            output_full_path = os.path.join(os.getcwd(), output_filename)
            print(f"✅ הצלחה! הקובץ נוצר בנתיב: {output_full_path}")
            return True

    except Exception as e:
        print(f"❌ אירעה שגיאה בעת צילום הדף '{page_name}':")
        print(e)
        return False

async def main():
    print(f"נמצאו {len(PAGES_TO_CONVERT)} דפים לצילום.")
    success_count = 0
    fail_count = 0
    
    for name, url_address in PAGES_TO_CONVERT.items():
        if await convert_page_to_png(name, url_address):
            success_count += 1
        else:
            fail_count += 1
            
    print("\n--- סיכום ---")
    print(f"✅ הושלמו בהצלחה: {success_count} קבצים.")
    print(f"❌ נכשלו: {fail_count} קבצים.")


# הרצת הקוד הראשי
if __name__ == "__main__":
    asyncio.run(main())