import React from 'react';

type PictureProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  webpQuality?: number;
};

/**
 * Renders a <picture> that prefers a sibling .webp and falls back to the given src.
 * If the src already ends with .webp or .svg, renders a plain <img>.
 */
export function Picture({ src, alt = '', className, loading, style, sizes, srcSet, webpQuality, ...rest }: PictureProps) {
  const lower = (src || '').toLowerCase();
  const isWebp = lower.endsWith('.webp');
  const isSvg = lower.endsWith('.svg');

  if (isWebp || isSvg) {
    return <img src={src} alt={alt} className={className} loading={loading} style={style} sizes={sizes} srcSet={srcSet} {...rest} />;
  }

  // Derive the .webp path by swapping common raster extensions; browsers will fall back if missing
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img src={src} alt={alt} className={className} loading={loading} style={style} sizes={sizes} srcSet={srcSet} {...rest} />
    </picture>
  );
}

export default Picture;

