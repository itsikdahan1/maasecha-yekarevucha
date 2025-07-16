import requests
from bs4 import BeautifulSoup

# !!! שנה כאן את הכתובת לדף שאתה רוצה לבדוק !!!
URL_TO_ANALYZE = "https://www.Maasecha.com/"

def analyze_page_seo(url):
    print(f"--- מתחיל ניתוח SEO עבור: {url} ---")
    
    try:
        response = requests.get(url)
        # בדיקה שהצלחנו לגשת לדף
        if response.status_code != 200:
            print(f"❌ שגיאה: לא ניתן לגשת לדף (סטטוס: {response.status_code})")
            return
            
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # --- בדיקת כותרת הדף (Title) ---
        title_tag = soup.find('title')
        if title_tag:
            title_text = title_tag.get_text()
            print(f"✅ כותרת (Title): נמצאה. אורך: {len(title_text)} תווים.")
            if len(title_text) < 30 or len(title_text) > 60:
                print("   ⚠️ אזהרה: אורך הכותרת מחוץ לטווח המומלץ (30-60 תווים).")
            print(f"   - תוכן: \"{title_text}\"")
        else:
            print("❌ שגיאה: תגית <title> חסרה!")

        # --- בדיקת תיאור מטא (Meta Description) ---
        meta_desc_tag = soup.find('meta', attrs={'name': 'description'})
        if meta_desc_tag and meta_desc_tag.get('content'):
            desc_text = meta_desc_tag.get('content')
            print(f"✅ תיאור (Description): נמצא. אורך: {len(desc_text)} תווים.")
            if len(desc_text) < 70 or len(desc_text) > 160:
                print("   ⚠️ אזהרה: אורך התיאור מחוץ לטווח המומלץ (70-160 תווים).")
            print(f"   - תוכן: \"{desc_text[:100]}...\"")
        else:
            print("❌ שגיאה: תגית <meta name='description'> חסרה או ריקה!")

        # --- בדיקת כותרת H1 ---
        h1_tags = soup.find_all('h1')
        print(f"✅ כותרת H1: נמצאו {len(h1_tags)} תגיות.")
        if len(h1_tags) != 1:
            print("   ❌ שגיאה: צריך שתהיה בדיוק תגית H1 אחת בעמוד.")
        else:
            print(f"   - תוכן: \"{h1_tags[0].get_text().strip()}\"")
            
        # --- בדיקת טקסט חלופי לתמונות (Alt Text) ---
        images = soup.find_all('img')
        images_missing_alt = [img for img in images if not img.get('alt', '').strip()]
        
        print(f"✅ תמונות: נמצאו {len(images)} תמונות בעמוד.")
        if images_missing_alt:
            print(f"   ❌ שגיאה: ל-{len(images_missing_alt)} תמונות חסר טקסט חלופי (alt text).")
            # for img in images_missing_alt:
            #     print(f"      - תמונה בעייתית (src): {img.get('src')}")
        else:
            print("   ✅ כל התמונות תקינות וכוללות טקסט חלופי.")
            
        print("\n--- ניתוח SEO בסיסי הושלם ---")

    except Exception as e:
        print(f"❌ אירעה שגיאה כללית במהלך הניתוח: {e}")


if __name__ == "__main__":
    analyze_page_seo(URL_TO_ANALYZE)