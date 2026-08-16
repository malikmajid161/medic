import os
from PIL import Image

def generate_icons():
    source_path = "public/logo.png"
    res_dir = "android/app/src/main/res"

    if not os.path.exists(source_path):
        print("Source logo not found.")
        return

    # Open the original logo
    img = Image.open(source_path).convert("RGBA")

    # Target sizes for standard icons
    sizes = {
        "mipmap-mdpi": 48,
        "mipmap-hdpi": 72,
        "mipmap-xhdpi": 96,
        "mipmap-xxhdpi": 144,
        "mipmap-xxxhdpi": 192,
    }

    # Generate standard icons with padding so they fit inside Android's circular mask
    for folder, size in sizes.items():
        folder_path = os.path.join(res_dir, folder)
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)
        
        # Create a SOLID WHITE canvas of the target size (prevents black background rendering on Android)
        canvas = Image.new("RGBA", (size, size), (255, 255, 255, 255))
        
        # Logo should take up ~65% of the canvas to avoid being cropped by circles
        logo_size = int(size * 0.65)
        resized_logo = img.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
        
        # Center the logo on the canvas
        offset = ((size - logo_size) // 2, (size - logo_size) // 2)
        canvas.paste(resized_logo, offset, mask=resized_logo if 'A' in img.getbands() else None)
        
        # Save ic_launcher and round
        canvas.save(os.path.join(folder_path, "ic_launcher.png"))
        canvas.save(os.path.join(folder_path, "ic_launcher_round.png"))
        print(f"Generated {size}x{size} (padded) for {folder}")

    # Generate Adaptive Icon Foreground (432x432, logo scaled to 288x288 in center)
    anydpi_folder = os.path.join(res_dir, "mipmap-anydpi-v26")
    if not os.path.exists(anydpi_folder):
        os.makedirs(anydpi_folder)
    
    # Create 432x432 SOLID WHITE canvas
    adaptive_bg = Image.new("RGBA", (432, 432), (255, 255, 255, 255))
    
    # Scale logo to 288x288
    logo_scaled = img.resize((288, 288), Image.Resampling.LANCZOS)
    
    # Paste centered
    offset = ((432 - 288) // 2, (432 - 288) // 2)
    adaptive_bg.paste(logo_scaled, offset, mask=logo_scaled)
    
    adaptive_bg.save(os.path.join(anydpi_folder, "ic_launcher_foreground.png"))
    
    # Generate the XML files
    xml_content = """<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>
</adaptive-icon>"""

    with open(os.path.join(anydpi_folder, "ic_launcher.xml"), "w") as f:
        f.write(xml_content)
        
    with open(os.path.join(anydpi_folder, "ic_launcher_round.xml"), "w") as f:
        f.write(xml_content)
        
    print("Generated adaptive icon foreground and XMLs for anydpi-v26")

if __name__ == "__main__":
    generate_icons()
