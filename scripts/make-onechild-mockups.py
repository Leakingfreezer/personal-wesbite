"""
OneChild mockups: both prototype screens in simple browser windows, overlapping, on a soft grey background.

Run from the project folder (needs Python with Pillow: `pip install pillow`):
    python scripts/make-onechild-mockups.py

Reads the two screenshots in public/assets/projects/ and writes:
    onechild-mockup-square-800/1600.webp  → the Past Work card (src/data/projects.ts: oneChildMockupSquare)
    onechild-mockup-wide-1200/2400.webp   → the case-study header (oneChildMockupWide)

Easy tweaks: BACKGROUND (colour), the window positions in the two compose(...) calls at the bottom,
or swap BOARD/FOOTPRINT in compose() to change which screen sits in front.
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

PROJECTS = Path(__file__).resolve().parent.parent / "public" / "assets" / "projects"
BOARD = Image.open(PROJECTS / "onechild-opportunities-board-screen.png").convert("RGB")
FOOTPRINT = Image.open(PROJECTS / "onechild-advocacy-footprint-screen.png").convert("RGB")

BACKGROUND = (240, 239, 237)
SS = 2  # draw at 2x, then scale down, so rounded corners and shadows stay smooth


def window(screen: Image.Image, width: int) -> Image.Image:
    """A browser window (title bar with three dots and an address pill) holding the screenshot."""
    bar = round(width * 0.045)
    radius = round(width * 0.018)
    height = bar + round(screen.height * width / screen.width)
    win = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    mask = Image.new("L", (width, height), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, width - 1, height - 1], radius, fill=255)

    body = Image.new("RGB", (width, height), (255, 255, 255))
    d = ImageDraw.Draw(body)
    d.rectangle([0, 0, width, bar], fill=(246, 246, 247))
    d.line([0, bar - 1, width, bar - 1], fill=(228, 228, 230), width=max(1, width // 900))
    dot = bar * 0.26
    for i, colour in enumerate([(255, 95, 87), (254, 188, 46), (40, 200, 64)]):
        cx, cy = bar * 0.62 + i * dot * 2.9, bar / 2
        d.ellipse([cx - dot / 2, cy - dot / 2, cx + dot / 2, cy + dot / 2], fill=colour)
    pill_w, pill_h = width * 0.34, bar * 0.52
    d.rounded_rectangle(
        [(width - pill_w) / 2, (bar - pill_h) / 2, (width + pill_w) / 2, (bar + pill_h) / 2],
        pill_h / 2,
        fill=(234, 234, 236),
    )
    body.paste(screen.resize((width, height - bar), Image.LANCZOS), (0, bar))
    win.paste(body, (0, 0), mask)
    return win


def shadow(win: Image.Image, blur: int):
    """A soft drop shadow the same shape as the window."""
    alpha = win.getchannel("A").point(lambda a: a * 0.22)
    pad = blur * 3
    sh = Image.new("RGBA", (win.width + pad * 2, win.height + pad * 2), (0, 0, 0, 0))
    sh.paste(Image.new("RGBA", win.size, (20, 20, 30, 255)), (pad, pad), alpha)
    return sh.filter(ImageFilter.GaussianBlur(blur)), pad


def compose(size, window_width, back_pos, front_pos) -> Image.Image:
    """The Board window at back_pos, the Footprint window in front of it at front_pos."""
    canvas = Image.new("RGBA", (size[0] * SS, size[1] * SS), BACKGROUND + (255,))
    for screen, pos in [(BOARD, back_pos), (FOOTPRINT, front_pos)]:
        win = window(screen, window_width * SS)
        sh, pad = shadow(win, 30 * SS)
        x, y = pos[0] * SS, pos[1] * SS
        canvas.alpha_composite(sh, (x - pad, y - pad + 24 * SS))
        canvas.alpha_composite(win, (x, y))
    return canvas.convert("RGB").resize(size, Image.LANCZOS)


def save(image: Image.Image, name: str, widths) -> None:
    for w in widths:
        out = PROJECTS / f"{name}-{w}.webp"
        image.resize((w, w * image.height // image.width), Image.LANCZOS).save(out, "WEBP", quality=88)
        print("saved", out.name)


# Wide (case-study header): side by side, overlapping in the middle.
save(compose((2400, 1500), 1180, (150, 110), (1070, 300)), "onechild-mockup-wide", (1200, 2400))
# Square (Past Work card): back window top-left, front window bottom-right.
save(compose((1600, 1600), 1080, (90, 90), (430, 510)), "onechild-mockup-square", (800, 1600))
