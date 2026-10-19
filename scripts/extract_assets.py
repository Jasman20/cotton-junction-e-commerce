import os
from PIL import Image

USER_MEDIA_DIR = r"C:\Users\UNICOM\.gemini\antigravity-ide\brain\323557cc-f8c2-494c-8b53-e5ab76b27483\.user_uploaded"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "stock")

os.makedirs(OUTPUT_DIR, exist_ok=True)

# 1. UI Kit: media_1792342477888.png (1024x572)
img_ui = Image.open(os.path.join(USER_MEDIA_DIR, "media_1792342477888.png")).convert("RGB")
w_ui, h_ui = img_ui.size
print(f"UI Kit image size: {w_ui}x{h_ui}")

# Normalized coordinates for UI Kit:
# Women's Floral Kurta card: left ~73.5%, top ~14.0%, right ~86.0%, bottom ~40.0%
crop_wf = img_ui.crop((int(w_ui * 0.735), int(h_ui * 0.14), int(w_ui * 0.86), int(h_ui * 0.40)))
crop_wf.save(os.path.join(OUTPUT_DIR, "prod-women-floral.jpg"), quality=95)

# Men's Beige Kurta flat lay card: left ~87.8%, top ~14.0%, right ~98.5%, bottom ~40.0%
crop_mb = img_ui.crop((int(w_ui * 0.878), int(h_ui * 0.14), int(w_ui * 0.985), int(h_ui * 0.40)))
crop_mb.save(os.path.join(OUTPUT_DIR, "prod-men-beige-flat.jpg"), quality=95)

# Family in Green & Gold: left ~80.5%, top ~73.0%, right ~92.0%, bottom ~96.5%
crop_fg = img_ui.crop((int(w_ui * 0.805), int(h_ui * 0.73), int(w_ui * 0.92), int(h_ui * 0.965)))
crop_fg.save(os.path.join(OUTPUT_DIR, "prod-family-green.jpg"), quality=95)

# Woman in Yellow Saree: left ~92.0%, top ~71.0%, right ~97.5%, bottom ~92.5%
crop_ys = img_ui.crop((int(w_ui * 0.92), int(h_ui * 0.71), int(w_ui * 0.975), int(h_ui * 0.925)))
crop_ys.save(os.path.join(OUTPUT_DIR, "prod-women-yellow-saree.jpg"), quality=95)

print("UI Kit crops saved.")

# 2. Laptop mockup: media_1792342385086.png
img_lap = Image.open(os.path.join(USER_MEDIA_DIR, "media_1792342385086.png")).convert("RGB")
w_l, h_l = img_lap.size
print(f"Laptop image size: {w_l}x{h_l}")

# Screen banner has:
# Boy: ~50.5% to ~59.5%, y: ~29.5% to ~61.0%
crop_boy = img_lap.crop((int(w_l * 0.505), int(h_l * 0.295), int(w_l * 0.595), int(h_l * 0.61)))
crop_boy.save(os.path.join(OUTPUT_DIR, "prod-boy-beige-kurta.jpg"), quality=95)

# Father in beige kurta: ~55.5% to ~66.0%, y: ~22.5% to ~62.0%
crop_father = img_lap.crop((int(w_l * 0.555), int(h_l * 0.225), int(w_l * 0.66), int(h_l * 0.62)))
crop_father.save(os.path.join(OUTPUT_DIR, "prod-father-kurta.jpg"), quality=95)

# Mother in emerald green suit: ~64.5% to ~72.0%, y: ~25.5% to ~62.0%
crop_mother = img_lap.crop((int(w_l * 0.645), int(h_l * 0.255), int(w_l * 0.72), int(h_l * 0.62)))
crop_mother.save(os.path.join(OUTPUT_DIR, "prod-mother-suit.jpg"), quality=95)

# Daughter in festive frock/lehenga: ~70.5% to ~80.5%, y: ~32.0% to ~63.0%
crop_daughter = img_lap.crop((int(w_l * 0.705), int(h_l * 0.32), int(w_l * 0.805), int(h_l * 0.63)))
crop_daughter.save(os.path.join(OUTPUT_DIR, "prod-daughter-lehenga.jpg"), quality=95)

print("All extractions completed successfully!")
