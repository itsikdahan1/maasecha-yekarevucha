import requests
from bs4 import BeautifulSoup
import google.generativeai as genai
import os

# --- הגדרות ---

# 1. !!! הדבק כאן את מפתח ה-API שקיבלת מגוגל !!!
GOOGLE_API_KEY = "AIzaSyCy7341VmdfnzuUbopl14O2lV5mYebaleM"

# 2. !!! שנה כאן את הכתובת למאמר שאתה רוצה לנתח מהבלוג שלך !!!
ARTICLE_URL = "https://www.maasecha.com/blog/1" 

# ----------------------------------------------------------------

def fetch_article_text(url):
    """
    מביא את הטקסט המרכזי מכתובת של מאמר
    """
    print(f"מביא תוכן מ: {url}...")
    try:
        response = requests.get(url)
        if response.status_code != 200:
            return None
        soup = BeautifulSoup(response.content, 'html.parser')
        # הנחה שהתוכן המרכזי נמצא בתגית <article> או <main>
        # ניתן לשנות את זה לפי מבנה האתר שלך
        main_content = soup.find('article') or soup.find('main')
        if main_content:
            return main_content.get_text(separator='\n', strip=True)
        return None
    except Exception as e:
        print(f"שגיאה בהבאת תוכן המאמר: {e}")
        return None

def main():
    if GOOGLE_API_KEY == "YOUR_GOOGLE_AI_API_KEY_HERE":
        print("❌ שגיאה: יש להגדיר את מפתח ה-API של גוגל בשורת הקוד המתאימה.")
        return

    # הגדרת ה-API Key
    genai.configure(api_key=GOOGLE_API_KEY)
    
    article_text = fetch_article_text(ARTICLE_URL)
    
    if not article_text:
        print("לא ניתן היה להביא את תוכן המאמר.")
        return
        
    print("תוכן המאמר הובא בהצלחה. שולח לניתוח AI...")
    
    # יצירת המודל
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    # Prompt מפורט שמנחה את המודל מה אנחנו רוצים לקבל
    prompt = f"""
    Based on the following article text, please provide the following in Hebrew:
    1.  A short, concise summary of the article (2-3 sentences).
    2.  Three suggestions for engaging Twitter/Facebook posts based on the article's main points. Each suggestion should be short and include a relevant hashtag.
    3.  A list of the 5 most important keywords from the article for SEO purposes.

    Format the output clearly with headings for each section.

    Article Text:
    ---
    {article_text}
    ---
    """
    
    try:
        response = model.generate_content(prompt)
        
        print("\n" + "="*20 + "  ניתוח AI הושלם  " + "="*20)
        print(response.text)
        print("="*62)

    except Exception as e:
        print(f"\n❌ אירעה שגיאה בפנייה ל-API של Gemini:")
        print(e)


if __name__ == "__main__":
    main()