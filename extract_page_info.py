import re
import urllib.request

pages = {
    "Home": "http://localhost:3000/",
    "Projeler": "http://localhost:3000/projeler",
    "Konteyner": "http://localhost:3000/konteyner",
    "Moduler": "http://localhost:3000/moduler",
    "Prefabrik Celik": "http://localhost:3000/prefabrik-celik",
    "Hakkimizda": "http://localhost:3000/hakkimizda",
    "Iletisim": "http://localhost:3000/iletisim",
    "Gizlilik": "http://localhost:3000/gizlilik",
    "Kullanim Kosullari": "http://localhost:3000/kullanim-kosullari",
    "404 Page": "http://localhost:3000/nonexistent-page"
}

print("\n=== Page Title Extraction ===\n")

for name, url in pages.items():
    try:
        with urllib.request.urlopen(url, timeout=10) as response:
            html = response.read().decode('utf-8')
            
            # Extract title
            title_match = re.search(r'<title[^>]*>([^<]+)</title>', html, re.IGNORECASE)
            title = title_match.group(1) if title_match else "NOT FOUND"
            
            # Count main content elements
            h1_count = len(re.findall(r'<h1[^>]*>', html, re.IGNORECASE))
            nav_present = '<nav' in html.lower()
            footer_present = '<footer' in html.lower()
            meta_desc = 'meta name="description"' in html.lower()
            
            print(f"Page: {name}")
            print(f"  URL: {url}")
            print(f"  Title: {title}")
            print(f"  H1 count: {h1_count}")
            print(f"  Navigation: {'Present' if nav_present else 'Missing'}")
            print(f"  Footer: {'Present' if footer_present else 'Missing'}")
            print(f"  Meta Description: {'Present' if meta_desc else 'Missing'}")
            print()
            
    except Exception as e:
        print(f"Page: {name}")
        print(f"  ERROR: {str(e)}")
        print()

print("=== Complete ===")
