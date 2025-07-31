import { ComponentPropsWithoutRef, useState } from 'react';

type ImageWithFallbackProps = ComponentPropsWithoutRef<'img'> & {
  fallbackSrc?: string;
};

export function Img({
  src,
  alt,
  fallbackSrc = '/fallback.jpg',
  loading = 'lazy',
  ...rest
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc || fallbackSrc}
      alt={alt || 'image'}
      loading={loading}
      onError={() => setImgSrc(fallbackSrc)}
      {...rest}
    />
  );
}
