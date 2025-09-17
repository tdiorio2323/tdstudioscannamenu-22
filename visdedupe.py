import argparse, os, sys, json, math, shutil, base64, io
from pathlib import Path
from PIL import Image, ImageFile
import numpy as np
import imagehash
from psd_tools import PSDImage

ImageFile.LOAD_TRUNCATED_IMAGES = True
IMG_EXT = {'.jpg','.jpeg','.png','.webp','.heic','.bmp','.tif','.tiff','.psd'}

def load_image(path: Path, max_side=1024) -> Image.Image:
    ext = path.suffix.lower()
    if ext == ".psd":
        psd = PSDImage.open(path)
        im = psd.composite()
    else:
        im = Image.open(path)
        if im.mode not in ("RGB","RGBA"): im = im.convert("RGBA" if "A" in im.getbands() else "RGB")
    # resize for stable hashing
    w,h = im.size
    scale = max(w,h)/max_side if max(w,h) > max_side else 1
    if scale>1: im = im.resize((int(round(w/scale)), int(round(h/scale))), Image.LANCZOS)
    # drop alpha if present
    if im.mode == "RGBA":
        bg = Image.new("RGB", im.size, (255,255,255))
        bg.paste(im, mask=im.split()[-1])
        im = bg
    elif im.mode != "RGB":
        im = im.convert("RGB")
    return im

def b64_thumb(im: Image.Image, max_w=320):
    w,h = im.size
    if w>max_w:
        im = im.resize((max_w, int(h*max_w/w)), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, format="JPEG", quality=82, optimize=True)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("root", help="Folder to scan")
    ap.add_argument("--threshold", type=int, default=6, help="Max Hamming distance for near-duplicate (pHash). Default 6")
    ap.add_argument("--move-dupes", metavar="DIR", help="If set, move non-representative files of each cluster here")
    ap.add_argument("--report", default="visdedupe_report.html", help="Output HTML report")
    ap.add_argument("--prefer", choices=["largest","newest","oldest","shortest_name"], default="largest",
                    help="Representative pick policy")
    args = ap.parse_args()

    root = Path(args.root).expanduser().resolve()
    files = [p for p in root.iterdir() if p.is_file() and p.suffix.lower() in IMG_EXT]
    if not files:
        print("No images found", file=sys.stderr); sys.exit(1)

    # compute hashes
    items = []
    for p in sorted(files):
        try:
            im = load_image(p)
            ph = imagehash.phash(im, hash_size=16)  # 256-bit pHash for stronger separation
            items.append({"path":p, "hash":ph, "size":p.stat().st_size, "mtime":p.stat().st_mtime, "thumb": b64_thumb(im)})
        except Exception as e:
            print(f"skip {p}: {e}", file=sys.stderr)

    # cluster by pHash distance
    visited = set()
    clusters = []
    for i,a in enumerate(items):
        if i in visited: continue
        cluster = [i]
        visited.add(i)
        for j,b in enumerate(items[i+1:], start=i+1):
            if j in visited: continue
            if a["hash"] - b["hash"] <= args.threshold:
                cluster.append(j); visited.add(j)
        clusters.append(cluster)

    # choose representative per cluster
    def pick_idx(idxs):
        if args.prefer=="largest":
            return max(idxs, key=lambda k: items[k]["size"])
        if args.prefer=="newest":
            return max(idxs, key=lambda k: items[k]["mtime"])
        if args.prefer=="oldest":
            return min(idxs, key=lambda k: items[k]["mtime"])
        if args.prefer=="shortest_name":
            return min(idxs, key=lambda k: len(items[k]["path"].name))
        return idxs[0]

    # write HTML report
    kept = set()
    rows = []
    dupe_total = 0
    for c in clusters:
        rep = pick_idx(c); kept.add(rep)
        group = []
        for k in c:
            it = items[k]
            group.append({
                "name": it["path"].name,
                "path": str(it["path"]),
                "size_kb": round(it["size"]/1024),
                "hash": str(it["hash"]),
                "rep": (k==rep),
                "thumb": it["thumb"]
            })
        if len(c) > 1:
            dupe_total += len(c)-1
        rows.append(group)

    html = io.StringIO()
    html.write(f"""<!doctype html><meta charset=\"utf-8\"><title>visdedupe report</title>
<style>
body{{font-family:ui-sans-serif,system-ui,Arial;margin:24px}}
.cluster{{border:1px solid #ddd;border-radius:12px;padding:12px;margin:16px 0}}
.item{{display:flex;gap:12px;align-items:center;padding:8px;border-radius:8px}}
.item.rep{{background:#eef9ee;border:1px solid #b7e3b7}}
.item.dupe{{background:#fff2f2;border:1px solid #f0c0c0}}
.thumb img{{height:120px;object-fit:cover;border-radius:8px}}
.meta{{font-size:14px}}
.meta code{{font-size:12px}}
h1{{margin:0 0 12px}}
small{{color:#666}}
""")
    for grp in rows:
        html.write('<div class="cluster">')
        for it in grp:
            cls = "rep" if it["rep"] else "dupe"
            html.write(f"""<div class=\"item {cls}\">
<div class=\"thumb\"><img src=\"{it['thumb']}\" loading=\"lazy\"></div>
<div class=\"meta\">
  <div><strong>{it['name']}</strong>{' — representative' if it['rep'] else ''}</div>
  <div>{it['size_kb']} KB</div>
  <div><code>{it['path']}</code></div>
  <div><code>{it['hash']}</code></div>
</div>
</div>""")
        html.write("</div>")
    with open(args.report, "w", encoding="utf-8") as f: f.write(html.getvalue())
    print(f"Report: {args.report}")

    # optionally move dupes
    if args.move_dupes:
        outdir = Path(args.move_dupes).expanduser().resolve()
        outdir.mkdir(parents=True, exist_ok=True)
        moves = 0
        for c in clusters:
            if len(c)<2: continue
            rep = pick_idx(c)
            for k in c:
                if k==rep: continue
                src = items[k]["path"]
                dst = outdir / src.name
                i=1
                while dst.exists():
                    dst = outdir / f"{dst.stem}-{i}{dst.suffix}"
                    i+=1
                shutil.move(str(src), str(dst))
                moves += 1
        print(f"Moved {moves} files to {outdir}")
if __name__ == "__main__":
    main()