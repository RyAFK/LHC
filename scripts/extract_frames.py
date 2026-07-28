#!/usr/bin/env python3
"""Extract a sequential WebP frame sequence from the hero video for the
scroll-scrubbed canvas engine (components/hero/HeroSequence.tsx).

Usage:
    python3 scripts/extract_frames.py <input.mp4> <output_dir> --fps 24 --width 1920

Produces frame_0000.webp, frame_0001.webp, ... in <output_dir>, resized to
the given width (height computed to preserve aspect ratio) at the given
frame rate. Requires ffmpeg to be installed and on PATH.
"""

import argparse
import shutil
import subprocess
import sys
from pathlib import Path


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", help="Path to the source video (e.g. public/media/lhc-heart-precision.mp4)")
    parser.add_argument("output_dir", help="Directory to write frame_XXXX.webp files into")
    parser.add_argument("--fps", type=int, default=24, help="Frames per second to extract (default: 24)")
    parser.add_argument("--width", type=int, default=1920, help="Output frame width in pixels (default: 1920)")
    parser.add_argument("--quality", type=int, default=82, help="WebP quality 0-100 (default: 82)")
    args = parser.parse_args()

    if shutil.which("ffmpeg") is None:
        print("Error: ffmpeg is not installed or not on PATH.", file=sys.stderr)
        return 1

    input_path = Path(args.input)
    if not input_path.exists():
        print(f"Error: input file not found: {input_path}", file=sys.stderr)
        return 1

    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    # -2 keeps the computed height divisible by 2, which most encoders require.
    scale_filter = f"fps={args.fps},scale={args.width}:-2:flags=lanczos"
    output_pattern = str(output_dir / "frame_%04d.webp")

    cmd = [
        "ffmpeg",
        "-y",
        "-i", str(input_path),
        "-vf", scale_filter,
        "-start_number", "0",
        "-q:v", str(round((100 - args.quality) / 100 * 63)),  # ffmpeg webp qscale is inverted (0=best)
        output_pattern,
    ]

    print("Running:", " ".join(cmd))
    result = subprocess.run(cmd)
    if result.returncode != 0:
        print("ffmpeg failed.", file=sys.stderr)
        return result.returncode

    frame_count = len(list(output_dir.glob("frame_*.webp")))
    print(f"Extracted {frame_count} frames to {output_dir}")
    print("Expected ~96 frames for a 4-second clip at 24fps — update lib/hero/frames.ts's TOTAL_FRAMES if this differs.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
