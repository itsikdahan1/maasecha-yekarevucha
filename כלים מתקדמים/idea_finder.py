import requests
from bs4 import BeautifulSoup
import urllib.parse

# --- הגדרות ---
# !!! שנה כאן את מונח החיפוש לנושא שמעניין אותך !!!
SEARCH_TERM = "זוגיות לדתיים"

# --- הגדרות טכניות ---
BASE_URL = "https://html.duckduckgo.com/html/"
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
}
# ---------------------------------------------

def get_search_results(query):
    """
    מבצע חיפוש ב-DuckDuckGo ומחזיר את תוכן ה-HTML
    """
    params = {'q': query}
    print(f"🔎 מחפש ב-DuckDuckGo את הביטוי: '{query}'...")
    try:
        response = requests.post(BASE_URL, data=params, headers=HEADERS)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        print(f"❌ אירעה שגיאה בגישה ל-DuckDuckGo: {e}")
        return None

def parse_results(html):
    """
    מנתח את ה-HTML ומחלץ את הכותרות של תוצאות החיפוש
    """
    soup = BeautifulSoup(html, 'html.parser')
    result_titles = []
    
    # --- סלקטור חדש שמכוון לכותרות התוצאות ---
    for title_tag in soup.select('h2.result__title a.result__a'):
        result_titles.append(title_tag.get_text(strip=True))
            
    return result_titles

def main():
    html_content = get_search_results(SEARCH_TERM)
    
    if not html_content:
        return
        
    titles = parse_results(html_content)
    
    print("\n" + "="*20 + "  רעיונות לתוכן  " + "="*20)

    if titles:
        print("\n💡 כותרות מובילות (רעיונות למילות מפתח ונושאים):")
        for i, title in enumerate(titles, 1):
            print(f"  {i}. {title}")
    else:
        print("\n- לא נמצאו תוצאות חיפוש עבור מונח זה.")
        
    print("\n" + "="*58)


if __name__ == "__main__":
    main()