"""
Food for Thought case-study images → public/assets/projects/fft-*.webp

Run from the project folder (needs Python with Pillow: `pip install pillow`):
    python scripts/make-fft-images.py <bouquets.jpg> <journey-map.png> <mission.png> <tote.png> <brochure.png> <knife-guide.png> <fermentation.png>

Phone photos store their rotation separately (EXIF), so each photo is turned upright first.
Writes:
    fft-bouquets-900/1800.webp   → photo grid (src/data/projects.ts: fftBouquets)
    fft-journey-map.webp         → "Designing the experience" (fftJourneyMap)
    fft-<material>.webp          → "Program materials" row (fftMaterials)
"""
import sys
from pathlib import Path

from PIL import Image, ImageOps

PROJECTS = Path(__file__).resolve().parent.parent / "public" / "assets" / "projects"


def load(path: str) -> Image.Image:
    return ImageOps.exif_transpose(Image.open(path)).convert("RGB")


def save_width(img: Image.Image, name: str, width: int, **options) -> None:
    height = round(img.height * width / img.width)
    img.resize((width, height), Image.LANCZOS).save(PROJECTS / f"{name}.webp", **options)
    print(f"{name}.webp  {width}×{height}")


bouquets, journey, *materials = sys.argv[1:]

photo = load(bouquets)
for width in (900, 1800):
    save_width(photo, f"fft-bouquets-{width}", width, quality=82)

# The journey map has small text: keep it at full size, lossless.
journey_img = load(journey)
save_width(journey_img, "fft-journey-map", journey_img.width, lossless=True)

# Flyers and guides: at most 1000 px on the long side (they're shown small).
for name, path in zip(["mission", "tote", "brochure", "knife-guide", "fermentation-guide"], materials):
    img = load(path)
    scale = min(1, 1000 / max(img.size))
    save_width(img, f"fft-{name}", round(img.width * scale), quality=85)
