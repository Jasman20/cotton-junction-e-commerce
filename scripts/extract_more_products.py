import os
from PIL import Image

STOCK_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "stock")

# 1. From cat-festive.jpg (1920x1080)
# Top-left kurti: x: ~30 to ~820, y: ~20 to ~700
festive_img = Image.open(os.path.join(STOCK_DIR, "cat-festive.jpg")).convert("RGB")
w_f, h_f = festive_img.size

crop_mustard = festive_img.crop((int(w_f * 0.04), int(h_f * 0.02), int(w_f * 0.43), int(h_f * 0.68)))
crop_mustard.save(os.path.join(STOCK_DIR, "prod-kurti-mustard.jpg"), quality=95)

# Center-bottom saree: x: ~20% to ~58%, y: ~44% to ~98%
crop_green_saree = festive_img.crop((int(w_f * 0.20), int(h_f * 0.44), int(w_f * 0.58), int(h_f * 0.98)))
crop_green_saree.save(os.path.join(STOCK_DIR, "prod-saree-green.jpg"), quality=95)

# Right kurta: x: ~62% to ~96%, y: ~28% to ~92%
crop_rust = festive_img.crop((int(w_f * 0.62), int(h_f * 0.28), int(w_f * 0.96), int(h_f * 0.92)))
crop_rust.save(os.path.join(STOCK_DIR, "prod-kurta-rust.jpg"), quality=95)

print("Festive garments extracted.")

# 2. From cat-men.jpg (1024x1365 approx)
men_img = Image.open(os.path.join(STOCK_DIR, "cat-men.jpg")).convert("RGB")
w_m, h_m = men_img.size
crop_men_portrait = men_img.crop((int(w_m * 0.28), int(h_m * 0.11), int(w_m * 0.72), int(h_m * 0.66)))
crop_men_portrait.save(os.path.join(STOCK_DIR, "prod-men-kurta-portrait.jpg"), quality=95)

print("Men garment extracted.")

# 3. From cat-women.jpg (1024x1365 approx)
women_img = Image.open(os.path.join(STOCK_DIR, "cat-women.jpg")).convert("RGB")
w_w, h_w = women_img.size
crop_women_green = women_img.crop((int(w_w * 0.28), int(h_w * 0.06), int(w_w * 0.75), int(h_m * 0.68)))
crop_women_green.save(os.path.join(STOCK_DIR, "prod-women-green-kurta.jpg"), quality=95)

print("Women garment extracted.")

# 4. From cat-kids.jpg (1024x1365 approx)
kids_img = Image.open(os.path.join(STOCK_DIR, "cat-kids.jpg")).convert("RGB")
w_k, h_k = kids_img.size

# Boy in mustard: left ~14%, top ~25%, right ~58%, bottom ~85%
crop_kid_boy = kids_img.crop((int(w_k * 0.14), int(h_k * 0.25), int(w_k * 0.58), int(h_k * 0.85)))
crop_kid_boy.save(os.path.join(STOCK_DIR, "prod-kids-boy-mustard.jpg"), quality=95)

# Girl in floral frock: left ~47%, top ~33%, right ~92%, bottom ~92%
crop_kid_girl = kids_img.crop((int(w_k * 0.47), int(h_k * 0.33), int(w_k * 0.92), int(h_k * 0.92)))
crop_kid_girl.save(os.path.join(STOCK_DIR, "prod-kids-girl-floral.jpg"), quality=95)

print("Kids garments extracted.")

# 5. From hero-family.jpg
hero_img = Image.open(os.path.join(STOCK_DIR, "hero-family.jpg")).convert("RGB")
w_h, h_h = hero_img.size

# Girl in mustard: ~42% to ~53%, y: ~16% to ~55%
crop_girl_hero = hero_img.crop((int(w_h * 0.42), int(h_h * 0.16), int(w_h * 0.53), int(h_h * 0.55)))
crop_girl_hero.save(os.path.join(STOCK_DIR, "prod-kids-girl-mustard.jpg"), quality=95)

# Boy in ivory: ~53% to ~68%, y: ~34% to ~85%
crop_boy_hero = hero_img.crop((int(w_h * 0.53), int(h_h * 0.34), int(w_h * 0.68), int(h_h * 0.85)))
crop_boy_hero.save(os.path.join(STOCK_DIR, "prod-kids-boy-ivory.jpg"), quality=95)

print("Hero family garments extracted successfully!")
