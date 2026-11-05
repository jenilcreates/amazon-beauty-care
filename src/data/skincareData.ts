import { ListicleItem, FaqItem } from '../types';

export const LISTICLE_ITEMS: ListicleItem[] = [
  {
    id: 'item-1',
    categoryHeader: 'A Sneaky Way To Splurge - (Best Overall)',
    title: 'Augustinus Bader The Rich Cream – 15 ml',
    description: 'a rich, fragrance-free luxury moisturizer that delivers deep hydration and barrier support for dry and mature skin at a price that demands results.',
    buyItIf: "Your Skin Is Dry And Feels Tight, You're Over 40, Your Face Flakes Or Feels Rough After Using Retinol, You Don't Mind Spending More For Something That Actually Works.",
    ctaText: 'view on amazon',
    imageSrc: '/assets/wirecutter/product_1_augustinus.png',
    imageAlt: 'Augustinus Bader The Rich Cream – 15 ml',
    amazonUrl: 'https://link.amazon/B04to6BCZ',
    brand: 'Augustinus Bader',
    size: '15 ml / 0.5 fl. oz.'
  },
  {
    id: 'item-2',
    categoryHeader: 'A Vitamin C Serum For Skin-Care Lovers',
    title: 'Sunday Riley C.E.O. 15% Vitamin C Brightening Serum – 0.5 Fl Oz',
    description: 'a dermatologist-recommended, stabilized vitamin c serum that brightens, evens tone, and delivers a noticeable glow without stickiness.',
    buyItIf: 'Your skin looks dull or tired, you have dark spots from the sun, other vitamin c serums burn or sting you, you want a glow without the pain.',
    ctaText: 'view on amazon',
    imageSrc: '/assets/wirecutter/product_2_sunday_riley.png',
    imageAlt: 'Sunday Riley C.E.O. 15% Vitamin C Brightening Serum – 0.5 Fl Oz',
    amazonUrl: 'https://link.amazon/B03jVJevl',
    brand: 'Sunday Riley',
    size: '0.5 Fl Oz'
  },
  {
    id: 'item-3',
    categoryHeader: 'Un Petit Sparkle For The Francophile',
    title: 'Nuxe Huile Prodigieuse Roll-On',
    description: 'the iconic french dry oil that moisturizes, softens, and adds a luxurious glow to your face, body, and hair without ever feeling greasy.',
    buyItIf: 'You want one bottle that works on your face, body, and hair, your arms, knees, or chest look crepey, you like nice-smelling things.',
    ctaText: 'view on amazon',
    imageSrc: '/assets/wirecutter/product_3_nuxe.png',
    imageAlt: 'Nuxe Huile Prodigieuse Roll-On',
    amazonUrl: 'https://link.amazon/B06xOKIFp',
    brand: 'Nuxe Paris',
    size: 'Roll-On'
  },
  {
    id: 'item-4',
    categoryHeader: 'A Multitasking Mist',
    title: 'Caudalie Beauty Elixir Face Mist (30 ml)',
    description: 'the iconic french spa-in-a-bottle mist that tightens pores, sets makeup, and gives an instant dewy glow in a travel-friendly size.',
    buyItIf: 'You wear makeup and want it to last longer, you want a quick refresh during the day, you like keeping something small in your purse, your pores look big.',
    ctaText: 'view on amazon',
    imageSrc: '/assets/wirecutter/product_4_caudalie.png',
    imageAlt: 'Caudalie Beauty Elixir Face Mist (30 ml)',
    amazonUrl: 'https://link.amazon/B09xVeFWo',
    brand: 'Caudalie',
    size: '30 ml'
  },
  {
    id: 'item-5',
    categoryHeader: 'A French Pharmacy Staple',
    title: 'Embryolisse Lait-Crème Concentré, Travel Size',
    description: 'aloe vera, shea butter, and beeswax make this lightweight french moisturizer a treasured multitasker.',
    buyItIf: 'Your skin is dry and sensitive, your face stings when you put most creams on, you wear makeup and want it to stop clinging to dry patches, your skin changed after menopause.',
    ctaText: 'view on amazon',
    imageSrc: '/assets/wirecutter/product_5_embryolisse.png',
    imageAlt: 'Embryolisse Lait-Crème Concentré, Travel Size',
    amazonUrl: 'https://link.amazon/B0i11EbSd',
    brand: 'Embryolisse',
    size: 'Travel Size'
  },
  {
    id: 'item-6',
    categoryHeader: 'An Exfoliating Toner For Those Who Love A Tingle',
    title: "Paula's Choice Skin Perfecting 2% BHA Liquid Salicylic Acid Exfoliant, Travel Size, 1 Fluid Ounce",
    description: 'this classic uses 2% salicylic acid to sweep away dullness and reveal smooth, glowy skin.',
    buyItIf: 'You get blackheads, especially on your nose, your skin feels bumpy or rough, you break out a lot, you have dark spots left over from old pimples.',
    ctaText: 'view on amazon',
    imageSrc: '/assets/wirecutter/product_6_paulas_choice.png',
    imageAlt: "Paula's Choice Skin Perfecting 2% BHA Liquid Salicylic Acid Exfoliant",
    amazonUrl: 'https://link.amazon/B0i9kXxVk',
    brand: "Paula's Choice",
    size: '1 Fluid Ounce'
  },
  {
    id: 'item-7',
    categoryHeader: 'A Gentle Makeup Remover For Anyone',
    title: 'The Micellar Water That Launched A Thousand (Incomparable) Dupes',
    description: 'this french icon melts foundation and waterproof mascara without stinging.',
    buyItIf: 'Your skin is sensitive, your eyes water or sting when you take off makeup, you have rosacea or your skin gets red easily, you travel a lot.',
    ctaText: 'view on amazon',
    imageSrc: '/assets/wirecutter/product_7_bioderma.png',
    imageAlt: 'The Micellar Water That Launched A Thousand (Incomparable) Dupes (Bioderma Sensibio H2O)',
    amazonUrl: 'https://link.amazon/B00mmCR7Q',
    brand: 'Bioderma Sensibio',
    size: 'Travel Size'
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
