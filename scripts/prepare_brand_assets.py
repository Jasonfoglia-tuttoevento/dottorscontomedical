"""Prepare web assets from the approved Facile Medical PNG sources."""

from pathlib import Path

from PIL import Image


BRAND_DIR = Path(__file__).resolve().parents[1] / "public" / "brand"
SOURCE_DIR = BRAND_DIR / "source"
RESAMPLE = Image.Resampling.LANCZOS


def visible_bbox(image: Image.Image, threshold: int = 8, margin: int = 12) -> tuple[int, int, int, int]:
    """Return a padded bbox based on materially visible alpha pixels."""
    rgba = image.convert("RGBA")
    alpha = rgba.getchannel("A")
    mask = alpha.point(lambda value: 255 if value > threshold else 0)
    bbox = mask.getbbox()
    if bbox is None:
        raise ValueError("The source contains no visible pixels")

    left, top, right, bottom = bbox
    return (
        max(0, left - margin),
        max(0, top - margin),
        min(rgba.width, right + margin),
        min(rgba.height, bottom + margin),
    )


def contain(image: Image.Image, size: tuple[int, int]) -> Image.Image:
    """Resize without changing the source aspect ratio."""
    result = image.copy()
    result.thumbnail(size, RESAMPLE)
    return result


def square_symbol(symbol: Image.Image, size: int, padding_ratio: float, background: tuple[int, int, int, int]) -> Image.Image:
    """Center the approved symbol on a square RGBA canvas."""
    padding = round(size * padding_ratio)
    fitted = contain(symbol, (size - 2 * padding, size - 2 * padding))
    canvas = Image.new("RGBA", (size, size), background)
    position = ((size - fitted.width) // 2, (size - fitted.height) // 2)
    canvas.alpha_composite(fitted, position)
    return canvas


def save_png(image: Image.Image, destination: Path) -> None:
    image.convert("RGBA").save(destination, "PNG", optimize=True, compress_level=9)


def main() -> None:
    wordmark_source = Image.open(SOURCE_DIR / "facilemedical-logo.original.png").convert("RGBA")
    symbol_source = Image.open(SOURCE_DIR / "favicon.original.png").convert("RGBA")

    wordmark = wordmark_source.crop(visible_bbox(wordmark_source))
    wordmark = contain(wordmark, (1600, 1600))

    symbol = symbol_source.crop(visible_bbox(symbol_source))
    compact = square_symbol(symbol, 512, 0.10, (0, 0, 0, 0))
    favicon = compact.copy()
    apple_touch = square_symbol(symbol, 180, 0.10, (230, 250, 245, 255))
    favicon_32 = favicon.resize((32, 32), RESAMPLE)
    favicon_16 = favicon.resize((16, 16), RESAMPLE)

    save_png(wordmark, BRAND_DIR / "facilemedical-logo-full.png")
    save_png(compact, BRAND_DIR / "facilemedical-logo.png")
    save_png(favicon, BRAND_DIR / "favicon.png")
    save_png(apple_touch, BRAND_DIR / "apple-touch-icon.png")
    save_png(favicon_32, BRAND_DIR / "favicon-32x32.png")
    save_png(favicon_16, BRAND_DIR / "favicon-16x16.png")


if __name__ == "__main__":
    main()
