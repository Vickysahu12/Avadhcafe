// Every /cut image ships in -sm (420px), -md (760px) and full (1100px) sizes.
export function cut(name, sizes = '50vw') {
  return {
    src: `/cut/${name}-md.webp`,
    srcSet: `/cut/${name}-sm.webp 420w, /cut/${name}-md.webp 760w, /cut/${name}.webp 1100w`,
    sizes,
    decoding: 'async',
  }
}
