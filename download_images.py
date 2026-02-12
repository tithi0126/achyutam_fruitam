
import os
import requests
import json

menu_items = [
  {
    "name": "Apple - Fruit Bomb",
    "description": "A burst of fruity flavors in every bite, this veggie dish is a delightful combination of fresh apples.",
    "imageUrl": "https://b.zmtcdn.com/data/dish_photos/761/dcf66bd2cf8c0b2f2389473f39ce3761.jpg"
  },
  {
    "name": "Guava - Fruit Bomb",
    "description": "A burst of tropical flavors, this Guava - Fruit Bomb will transport your taste buds to paradise.",
    "imageUrl": "https://b.zmtcdn.com/data/dish_photos/27e/77bf002e5f7768689429d394f627c27e.jpeg"
  },
  {
    "name": "Mango - Fruit Bomb",
    "description": "Indulge in a burst of fruity goodness with this tantalizing explosion of mango flavors.",
    "imageUrl": "https://b.zmtcdn.com/data/dish_photos/764/3237cd62b69cd96e8312605628857764.jpeg"
  },
  {
    "name": "Muskmelon - Fruit Bomb",
    "description": "Indulge in an explosion of fresh muskmelon flavors with this delightful real fruit treat.",
    "imageUrl": "https://b.zmtcdn.com/data/dish_photos/325/6ea33a359956913bfb2f9659a00ec325.jpeg"
  },
  {
    "name": "Mix Fruit Ice Cream",
    "description": "A delightful combination of various real fruits blended into a refreshing and tempting frozen treat.",
    "imageUrl": "https://b.zmtcdn.com/data/dish_photos/c10/45f152337cca2a37b96e0b5644f44c10.jpg"
  },
  {
    "name": "Jamun - Fruit Ice Cream",
    "description": "Indulge in a luscious real fruit ice cream bursting with the rich, sweet and tart flavors of fresh Jamun.",
    "imageUrl": "https://b.zmtcdn.com/data/dish_photos/5a7/75c85d9f9db42860e8f41724377945a7.jpeg"
  },
  {
    "name": "Kesar Pista - Ice Cream",
    "description": "A delightful and refreshing real fruit ice cream bursting with the rich flavors of saffron and pistachios.",
    "imageUrl": "https://b.zmtcdn.com/data/dish_photos/dfb/a64dc51fb6cd639f128d62a9a808cdfb.jpg"
  },
  {
    "name": "Lotus Biscoff Bliss Shake",
    "description": "A thick, cookie packed shake exploding with biscoff flavor think creamy, biscoff swirl.",
    "imageUrl": "https://b.zmtcdn.com/data/dish_photos/22d/39748c213829ef7eceacb581532a522d.png"
  },
  {
    "name": "Mawa Malai - Kulfi",
    "description": "A traditional favorite made with thickened milk and rich mawa. Smooth, dense, and creamy.",
    "imageUrl": "https://b.zmtcdn.com/data/dish_photos/15c/202a72a59a3ad5d973eace1d67e6015c.png"
  }
]

output_dir = "src/assets/menu"
os.makedirs(output_dir, exist_ok=True)

processed_items = []

for item in menu_items:
    try:
        url = item["imageUrl"]
        if not url:
            continue
            
        ext = url.split('.')[-1].split('?')[0]
        if len(ext) > 4: ext = "jpg" # default to jpg if extension is weird
        
        # Create safe filename
        safe_name = item["name"].lower().replace(' - ', '_').replace(' ', '_').replace('-', '_')
        filename = f"{safe_name}.{ext}"
        filepath = os.path.join(output_dir, filename)
        
        # Download
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            with open(filepath, 'wb') as f:
                f.write(response.content)
            print(f"Downloaded: {filename}")
            
            # Add local path to item
            item["localImage"] = filename
            processed_items.append(item)
        else:
            print(f"Failed to download {url}: {response.status_code}")
            
    except Exception as e:
        print(f"Error processing {item['name']}: {e}")

# Generate simple TS code snippet for the mapping
ts_code = "export const menuItems = [\n"
for item in processed_items:
    ts_code += f"  {{ name: \"{item['name']}\", description: \"{item['description']}\", image: \"{item['localImage']}\" }},\n"
ts_code += "];"

with open("menu_data.ts.tmp", "w") as f:
    f.write(ts_code)

print("Done.")
