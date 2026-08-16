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

    # Generate standard icons
    for folder, size in sizes.items():
        folder_path = os.path.join(res_dir, folder)
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)
        
        resized = img.resize((size, size), Image.Resampling.LANCZOS)
        
        # Save ic_launcher and round
        resized.save(os.path.join(folder_path, "ic_launcher.png"))
        resized.save(os.path.join(folder_path, "ic_launcher_round.png"))
        print(f"Generated {size}x{size} for {folder}")

    # Generate Adaptive Icon Foreground (432x432, logo scaled to 288x288 in center)
    anydpi_folder = os.path.join(res_dir, "mipmap-anydpi-v26")
    if not os.path.exists(anydpi_folder):
        os.makedirs(anydpi_folder)
    
    # Create 432x432 transparent canvas
    adaptive_bg = Image.new("RGBA", (432, 432), (255, 255, 255, 0))
    
    # Scale logo to 288x288
    logo_scaled = img.resize((288, 288), Image.Resampling.LANCZOS)
    
    # Paste centered
    offset = ((432 - 288) // 2, (432 - 288) // 2)
    adaptive_bg.paste(logo_scaled, offset, mask=logo_scaled)
    
    adaptive_bg.save(os.path.join(anydpi_folder, "ic_launcher_foreground.png"))
    print("Generated adaptive icon foreground 432x432 for anydpi-v26")

if __name__ == "__main__":
    generate_icons()
