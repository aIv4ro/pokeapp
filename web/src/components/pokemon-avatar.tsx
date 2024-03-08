export function PokemonAvatar ({
  src,
  alt,
  size = 'medium'
}: {
  src: string
  alt: string
  size?: 'small' | 'medium'
}) {
  const sizeClass = size === 'small' ? 'w-24' : 'w-48'

  return (
    <img
      src={src}
      alt={alt}
      className={`${sizeClass} aspect-square bg-slate-300 rounded`}
    />
  )
}
