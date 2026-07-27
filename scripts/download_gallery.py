#!/usr/bin/env python3
"""Download gallery placeholder photos for Kep Crab Market via LoremFlickr.

LoremFlickr resolves to Flickr CC photos by tag. These are generic seafood /
coastal / market themed images, NOT guaranteed to be Kep Crab Market.
Replace with real, licensed photos (keeping the same filenames) before launch.
"""
import os
import sys
import urllib.request

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "gallery")
os.makedirs(OUT_DIR, exist_ok=True)

# (filename index, loremflickr tag string)
TAGS = [
    (1, "crab,seafood"),
    (2, "seafood,market"),
    (3, "fish,market"),
    (4, "fisherman"),
    (5, "market,customer"),
    (6, "coast,cambodia"),
    (7, "fishing,boat"),
    (8, "cambodia,town"),
    (9, "market,asia"),
    (10, "seafood,food"),
    (11, "market,stall"),
    (12, "sea,coast"),
]

ok = 0
for idx, tags in TAGS:
    url = f"https://loremflickr.com/800/600/{tags}?lock={idx}"
    dest = os.path.join(OUT_DIR, f"kep-crab-market-{idx}.jpg")
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = resp.read()
        if data[:2] == b"\xff\xd8":  # JPEG magic
            with open(dest, "wb") as f:
                f.write(data)
            print(f"OK  kep-crab-market-{idx}.jpg ({len(data)} bytes)")
            ok += 1
        else:
            print(f"WARN kep-crab-market-{idx}.jpg not a JPEG, skipping")
    except Exception as e:
        print(f"ERR kep-crab-market-{idx}.jpg: {e}")

print(f"\nDownloaded {ok}/12 images.")
sys.exit(0 if ok > 0 else 1)
