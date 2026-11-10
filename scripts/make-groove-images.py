"""
GROOVE images: the Past Work card + case-study header, and the MVP 1 sketch.

Run from the project folder (needs Python with Pillow: `pip install pillow`):
    python scripts/make-groove-images.py <mockup.png> <sketch.jpg>

<mockup.png> is Irene's "Concept development" GROOVE slide (1672 × 941): title on top, then the sketch,
form exploration and sequencer panels, then tags. The card already shows the title, so we keep only the
panels and centre them on the slide's background. Writes to public/assets/projects/:
    groove-cover-1200/1672.webp  → card + header (src/data/projects.ts: grooveCover)
    groove-sketch-1200/2360.webp → the annotated MVP 1 sketch (grooveSketch)
"""
import sys
from pathlib import Path

from PIL import Image

PROJECTS = Path(__file__).resolve().parent.parent / "public" / "assets" / "projects"
BACKGROUND = (251, 248, 251)  # sampled from the slide
PANELS_TOP, PANELS_BOTTOM = 160, 840  # the strip of panels in the slide, in pixels


def save(img: Image.Image, name: str, widths: list[int]) -> None:
    for w in widths:
        h = round(img.height * w / img.width)
        img.resize((w, h), Image.LANCZOS).save(PROJECTS / f"{name}-{w}.webp", quality=88)


mockup = Image.open(sys.argv[1]).convert("RGB")
strip = mockup.crop((0, PANELS_TOP, mockup.width, PANELS_BOTTOM))
cover = Image.new("RGB", mockup.size, BACKGROUND)
cover.paste(strip, (0, (mockup.height - strip.height) // 2))
save(cover, "groove-cover", [1200, 1672])

sketch = Image.open(sys.argv[2]).convert("RGB")
save(sketch, "groove-sketch", [1200, 2360])
