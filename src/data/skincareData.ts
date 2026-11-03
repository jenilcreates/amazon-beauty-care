import { ListicleItem, FaqItem } from '../types';

export const LISTICLE_ITEMS: ListicleItem[] = [
  {
    id: 'item-1',
    categoryHeader: 'A Sneaky Way To Splurge',
    title: "The Cream Those In The Know Won't Shut Up About (For Good Reason)",
    description: "A buttery moisturizer with near-mythical status, it's rich but not greasy, hydrating but not heavy.",
    price: '$99',
    ctaText: '$99 from amazon',
    imageSrc: '/assets/crops/card1_augustinus.png',
    imageAlt: 'Augustinus Bader The Cream moisturizer with Vogue editor endorsement quote',
    amazonUrl: 'https://link.amazon/B04to6BCZ',
    brand: 'Augustinus Bader',
    size: '15 ml / 0.5 fl. oz.',
    rating: 4.8,
    reviewsCount: 3420,
    keyBenefits: [
      'Patented TFC8® technology supports cellular renewal',
      'Intensely hydrates without clogging pores',
      'Leaves skin silky, luminous, and plump'
    ],
    couponCode: 'LUXEGLOW10'
  },
  {
    id: 'item-2',
    categoryHeader: 'A Vitamin C Serum For Skin-Care Lovers',
    title: 'Nourishing Enough To Double As A Light Moisturizer',
    description: 'Zesty orange meets silky serum in this hydrating vitamin C pick.',
    price: '$42',
    ctaText: '$42 from amazon',
    imageSrc: '/assets/crops/card2_sunday_riley.png',
    imageAlt: 'Sunday Riley C.E.O. 15% Vitamin C Brightening Serum benefits and collagen support',
    amazonUrl: 'https://link.amazon/B03jVJevl',
    brand: 'Sunday Riley',
    size: '30 ml / 1.0 fl. oz.',
    rating: 4.7,
    reviewsCount: 2890,
    keyBenefits: [
      '15% THD Ascorbate—an ultra-stable, lipid-soluble Vitamin C',
      'Rapidly boosts radiance and diminishes dark spots',
      'Provides rich antioxidant defense against environmental stress'
    ],
    couponCode: 'VITC42'
  },
  {
    id: 'item-3',
    categoryHeader: 'Un Petit Sparkle For The Francophile',
    title: 'Roll-On Nourishment And Shine, From Flyaways To Toes',
    description: 'Orange blossom and vanilla are what make this dry oil smell like summer in Provence. Dab it on hair, skin, or cuticles.',
    price: '$35',
    ctaText: '$35 from amazon',
    imageSrc: '/assets/crops/card3_nuxe.png',
    imageAlt: 'Nuxe Huile Prodigieuse Roll-On multi-purpose dry oil for face, body, and hair',
    amazonUrl: 'https://link.amazon/B06xOKIFp',
    brand: 'Nuxe Paris',
    size: '50 ml / 1.6 fl. oz.',
    rating: 4.9,
    reviewsCount: 5120,
    keyBenefits: [
      'Blend of 7 botanical precious oils (Tsubaki, Argan, Macadamia)',
      'Dry oil texture that absorbs instantly with non-greasy satin sheen',
      'Signature French fragrance with orange blossom, magnolia, and vanilla'
    ],
    couponCode: 'FRENCHPARFUM'
  },
  {
    id: 'item-4',
    categoryHeader: 'A Multitasking Mist',
    title: 'A Fine Mist From Our Guide To The Best French Pharmacy Products',
    description: 'Rosemary, mint, and grape extract make this cooling mist a great midafternoon or flight refresh.',
    price: '$20',
    ctaText: '$20 from amazon',
    imageSrc: '/assets/crops/card4_caudalie.png',
    imageAlt: 'Caudalie Beauty Elixir face mist travel and full size bottles',
    amazonUrl: 'https://link.amazon/B09xVeFWo',
    brand: 'Caudalie',
    size: '30 ml Travel Size / 100 ml Full Size',
    rating: 4.8,
    reviewsCount: 4670,
    keyBenefits: [
      'Tightens pores, smoothes fine lines, and sets makeup flawlessly',
      '100% natural formula with rosemary, mint, and soothing grape water',
      'Iconic backstage makeup artist essential for instant dewy glow'
    ],
    couponCode: 'MIST20'
  },
  {
    id: 'item-5',
    categoryHeader: 'A French Pharmacy Staple',
    title: 'Also Used As A Cleanser, Aftershave, And Sunburn Treatment',
    description: 'Aloe vera, shea butter, and beeswax make this lightweight French moisturizer a treasured multitasker.',
    price: '$19',
    ctaText: '$19 from amazon',
    imageSrc: '/assets/crops/card5_embryolisse.png',
    imageAlt: 'Embryolisse Lait-Crème Concentré award-winning moisturizer and makeup primer',
    amazonUrl: 'https://link.amazon/B0i11EbSd',
    brand: 'Embryolisse',
    size: '75 ml / 2.54 fl. oz.',
    rating: 4.8,
    reviewsCount: 9840,
    keyBenefits: [
      'The cult favorite 6-in-1 moisturizer, primer, mask, and makeup remover',
      'Soothes and softens the skin barrier with nourishing shea butter and aloe',
      'Acclaimed by top runway makeup artists globally since 1950'
    ],
    couponCode: 'PARISCHIC'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Is the Embryolisse Lait-Crème Concentré also a make-up base?',
    answer: 'Yes, it can absolutely be used as a makeup base. Testing shows that 100% of women confirm it serves as an excellent primer to create a smooth canvas for foundation.'
  },
  {
    id: 'faq-2',
    question: "There's a golden-brown ring at the top of my Caudalie Beauty Elixir is this normal?",
    answer: 'Yes, this is completely normal. The elixir is composed of distilled plant water and essential oils that naturally separate, causing the essential oils to float to the top. Just shake the bottle well before each use.'
  },
  {
    id: 'faq-3',
    question: 'Can you use Caudalie Beauty Elixir if you are pregnant?',
    answer: 'No, it is not recommended. The brand advises against using this product during pregnancy or breastfeeding because it contains active essential oils.'
  },
  {
    id: 'faq-4',
    question: 'Is the Embryolisse Lait-Crème Concentré non-comedogenic?',
    answer: 'Yes, it is formulated to be non-comedogenic. You do not need to worry about it clogging your pores.'
  },
  {
    id: 'faq-5',
    question: 'Why is the Embryolisse tube made of aluminum instead of plastic?',
    answer: 'The brand prioritizes aluminum because it is lightweight, durable, and provides the best possible protection against formula oxidation. It also helps you squeeze out the product easily right down to the very last drop.'
  }
];

export const SPOTLIGHT_GALLERY = [
  {
    id: 'thumb-1',
    src: '/assets/crops/thumb_1.png',
    largeSrc: '/assets/aistudio/71UBu1IL5cL._SL1500___1__d6bece72.jpg',
    alt: 'Augustinus Bader The Rich Cream with cream swirl and copper disc',
    label: 'Bottle & Swirl'
  },
  {
    id: 'thumb-2',
    src: '/assets/crops/thumb_2.png',
    largeSrc: '/assets/crops/gallery_2.png',
    alt: 'Model applying luxury face cream',
    label: 'Application'
  },
  {
    id: 'thumb-3',
    src: '/assets/crops/thumb_3.png',
    largeSrc: '/assets/crops/gallery_3.png',
    alt: 'Glowing skin results front view',
    label: 'Skin Glow'
  },
  {
    id: 'thumb-4',
    src: '/assets/crops/thumb_4.png',
    largeSrc: '/assets/crops/gallery_4.png',
    alt: 'Model profile side angle',
    label: 'Profile'
  },
  {
    id: 'thumb-5',
    src: '/assets/crops/thumb_5.png',
    largeSrc: '/assets/crops/gallery_5.png',
    alt: 'Rich cream buttery texture close-up',
    label: 'Texture'
  },
  {
    id: 'thumb-6',
    src: '/assets/crops/thumb_6.png',
    largeSrc: '/assets/crops/gallery_6.png',
    alt: 'Luxury packaging open jar and bottle',
    label: 'Packaging'
  }
];
