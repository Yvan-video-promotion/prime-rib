/**
 * Everything shop-specific lives here so it can be changed in one place.
 */
export const site = {
  /** Display name used in the header, footer and page titles. */
  name: 'Ember & Bone',
  /** Sits under the name in the header. */
  tagline: 'The Prime Rib Method',
  /** The Etsy listing every buy button points at. */
  etsyUrl: 'https://www.etsy.com/listing/4544070417',
  /** Where the recipe PDF download buttons point. */
  downloadUrl: 'https://www.yvanvideopromotion.info/pho-bo-recipe-digital-download-web-app',
  description:
    'A slow-roasted, hand-carved, roadhouse-style prime rib guide: 24-hour dry brine, low-and-slow roast, high-heat finish and bone-broth au jus — plus an interactive Roast Calculator.',
} as const
