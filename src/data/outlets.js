// Towns taken from Avadh's Instagram opening posts. Photos are from those posts.
export const OUTLETS = [
  { town: 'Bardoli', img: '/ig/p5-bardoli.jpg' },
  { town: 'Mandvi', img: '/ig/p7-mandvi.jpg' },
  { town: 'Navsari', img: '/ig/p10-navsari.jpg' },
  { town: 'Vyara', img: '/ig/p11-vyara.jpg' },
  { town: 'Halol', img: '/ig/p6-halol.jpg' },
]

export const directionsUrl = (town) =>
  `https://www.google.com/maps/search/${encodeURIComponent(`Avadh Cafe ${town} Gujarat`)}`
