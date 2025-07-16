import asyncio
from playwright.async_api import async_playwright
from PIL import Image, ImageChops
import os

# --- הגדרות ---
# !!! שנה כאן את הכתובת לדף שאתה רוצה לנטר !!!
URL_TO_MONITOR = "https://www.Maasecha.com/"

# שמות הקבצים
BASELINE_FILENAME = "baseline.png"
LATEST_FILENAME = "latest.png"
DIFF_FILENAME = "diff.png"

# הגדרות צילום ודפדפן
TIMEOUT_DURATION = 60000  # 60 שניות
VIEWPORT_SIZE = {"width": 1920, "height": 1080} # רזולוציה לדוגמה

def compare_images(img1_path, img2_path, diff_path):
    """
    פונקציה להשוואת שתי תמונות ויצירת קובץ הבדלים
    """
    try:
        img1 = Image.open(img1_path).convert('RGB')
        img2 = Image.open(img2_path).convert('RGB')
        
        if img1.size != img2.size:
            print("⚠️ גודל התמונות שונה, לא ניתן להשוות פיקסלים. כנראה שהיה שינוי משמעותי בפריסה.")
            return False, "גודל תמונה שונה"

        # יצירת תמונת הבדלים
        diff = ImageChops.difference(img1, img2)
        
        # בדיקה אם יש הבדלים
        if diff.getbbox(): # אם יש תוכן בתמונת ההבדלים, סימן שהתמונות שונות
            print("✅ זוהו שינויים ויזואליים!")
            
            # כדי להדגיש את ההבדלים באדום (מתקדם)
            diff_inv = ImageChops.invert(diff)
            img1_r, img1_g, img1_b = img1.split()
            img2_r, img2_g, img2_b = img2.split()
            
            # האיזורים שהשתנו יהיו אדומים, השאר יהיו בגווני אפור
            highlighted_r = ImageChops.darker(img1_r, diff_inv)
            highlighted_g = ImageChops.darker(img1_g, diff_inv)
            highlighted_b = ImageChops.darker(img1_b, diff_inv)
            
            diff_img = Image.merge('RGB', (img1_r, highlighted_g, highlighted_b))
            diff_img.save(diff_path)
            print(f"   - קובץ המדגיש את ההבדלים נשמר בשם: {diff_path}")
            return False, diff_path
        else:
            print("✅ לא זוהו שינויים ויזואליים.")
            return True, None
            
    except FileNotFoundError as e:
        print(f"שגיאה: קובץ תמונה לא נמצא. {e}")
        return False, "קובץ חסר"


async def main():
    print(f"--- מתחיל ניטור ויזואלי עבור: {URL_TO_MONITOR} ---")
    
    # שלב 1: צילום תמונת מסך עדכנית
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        page.set_default_timeout(TIMEOUT_DURATION)
        await page.set_viewport_size(VIEWPORT_SIZE)
        
        print("טוען את האתר ומצלם גרסה עדכנית...")
        await page.goto(URL_TO_MONITOR, wait_until="load")
        await page.wait_for_timeout(5000)
        await page.screenshot(path=LATEST_FILENAME, full_page=True)
        await browser.close()
        print(f"   - תמונה עדכנית נשמרה בשם: {LATEST_FILENAME}")

    # שלב 2: בדיקה אם קיימת תמונת בסיס להשוואה
    if not os.path.exists(BASELINE_FILENAME):
        print("\nℹ️ זוהי ההרצה הראשונה. אין תמונת בסיס להשוואה.")
        os.rename(LATEST_FILENAME, BASELINE_FILENAME)
        print(f"   - התמונה הנוכחית נשמרה כתמונת בסיס: {BASELINE_FILENAME}")
        print("   - יש להריץ את הסקריפט שוב בעתיד כדי לבצע השוואה.")
    else:
        # שלב 3: השוואת התמונה החדשה לתמונת הבסיס
        print("\nמשווה את התמונה העדכנית לתמונת הבסיס...")
        are_identical, diff_file = compare_images(BASELINE_FILENAME, LATEST_FILENAME, DIFF_FILENAME)
        
        if not are_identical:
            # אם יש הבדלים, המשתמש יכול לבחור אם לעדכן את תמונת הבסיס
            choice = input("\nהאם לעדכן את תמונת הבסיס לגרסה החדשה? (כן/לא): ").lower()
            if choice == 'כן' or choice == 'y' or choice == 'yes':
                os.remove(BASELINE_FILENAME)
                os.rename(LATEST_FILENAME, BASELINE_FILENAME)
                print(f"✅ תמונת הבסיס עודכנה לגרסה החדשה.")
            else:
                os.remove(LATEST_FILENAME) # מחיקת התמונה העדכנית אם לא רוצים לעדכן
                print("ℹ️ תמונת הבסיס לא שונתה.")
        else:
            # אם אין הבדלים, אין צורך בתמונה העדכנית
            os.remove(LATEST_FILENAME)
    
    print("\n--- הניטור הסתיים ---")

if __name__ == "__main__":
    asyncio.run(main())