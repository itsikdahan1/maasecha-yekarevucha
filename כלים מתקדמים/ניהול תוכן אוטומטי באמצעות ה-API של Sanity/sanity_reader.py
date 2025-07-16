import requests
import json
from datetime import datetime

# ==============================================================================
# --- הגדרות ---
# ==============================================================================
# ה-Project ID שלך (כבר בפנים)
SANITY_PROJECT_ID = "libeyywa"

# !!! הדבק כאן את הטוקן הארוך ששלחת לי !!!
SANITY_API_TOKEN = "YOUR_API_TOKEN_HERE" 

# --- הגדרות טכניות (אין צורך לשנות) ---
GROQ_QUERY = '*[_type == "post"]{title, "publishedAt": _createdAt}'
API_VERSION = "v2021-10-21"
# ------------------------------------------------------------------------------


def fetch_sanity_data():
    """
    מתחבר ל-API של Sanity ומביא את הנתונים
    """
    if SANITY_PROJECT_ID == "YOUR_PROJECT_ID_HERE" or SANITY_API_TOKEN == "YOUR_API_TOKEN_HERE":
        print("❌ שגיאה: יש להגדיר את ה-Project ID וה-API Token בקוד.")
        return None

    url = f"https://{SANITY_PROJECT_ID}.api.sanity.io/{API_VERSION}/data/query/production?query={GROQ_QUERY}"
    
    headers = {
        "Authorization": f"Bearer {SANITY_API_TOKEN}"
    }

    print(f"שולח בקשה ל-Sanity API...")
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"❌ אירעה שגיאה בפנייה ל-API: {e}")
        if e.response is not None:
            print(f"   פרטי שגיאה מהשרת: {e.response.text}")
        return None

def main():
    data = fetch_sanity_data()
    
    if data and 'result' in data:
        posts = data['result']
        if not posts:
            print("\n✅ הבקשה הצליחה, אך לא נמצאו מאמרים מסוג 'post' בפרויקט שלך.")
            return

        print(f"\n✅ נמצאו {len(posts)} מאמרים בבלוג שלך:")
        print("-" * 40)
        for post in posts:
            title = post.get('title', 'ללא כותרת')
            date_str = post.get('publishedAt', 'תאריך לא ידוע')
            try:
                formatted_date = datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%SZ").strftime("%d-%m-%Y")
            except (ValueError, TypeError):
                formatted_date = date_str

            print(f"📄 כותרת: {title}")
            print(f"   📅 תאריך פרסום: {formatted_date}\n")
    else:
        print("לא הצלחתי להביא את רשימת המאמרים. בדוק שה-Project ID וה-Token נכונים.")

if __name__ == "__main__":
    main()