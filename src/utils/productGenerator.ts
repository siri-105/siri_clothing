import { Product } from '../types';
import { ALL_PRODUCTS } from '../data/mockData';

const BRANDS = [
  'SIRI ORIGINALS',
  'AURA BY SIRI',
  'FESTIVE BLOOM',
  'SIRI EVERYDAY',
  'ROYAL HERITAGE',
  'PASTEL WHISPER',
  'LIBAS FESTIVE',
  'BIBA LUXE',
  'W FOR WOMAN',
  'DRESSBERRY LUXE',
  'SANGRIA FESTIVE',
  'HOUSE OF PATAUDI',
  'ANOUK ETHNIC',
  'INDYA COUTURE',
  'VARANGA HERITAGE',
  'KALINI LUXE',
];

const STYLES = [
  'Handloom Chanderi Silk Kurta Set',
  'Foil Print Angrakha Kurti with Palazzos',
  'Zari Embroidered Silk Lehenga Choli',
  'Floral Printed A-Line Cotton Kurta',
  'Velvet Yoke Flared Anarkali Gown',
  'Organza Embroidered Straight Suit',
  'Gota Patti Silk Blend Sharara Set',
  'Mirror Work Georgette Anarkali Suit',
  'Banarasi Brocade Straight Kurta with Pants',
  'Lucknowi Chikankari Georgette Kurta Set',
  'Bandhani Printed Chiffon Anarkali with Dupatta',
  'Peplum Top with Flared Gharara Pants',
  'Tiered Bohemian Cotton Maxi Dress',
  'Raw Silk Jacket Style Kurta Set',
  'Handblock Kalamkari Pure Cotton Suit',
  'Resham Threadwork Tussar Silk Kurti',
  'Embellished Velvet Kaftan Gown',
  'Sequined Net Festive Lehenga Set',
  'Jacquard Woven Straight Cut Kurta Set',
  'Floral Organza Saree Style Kurti Set',
];

const FABRICS = [
  'Pure Chanderi Silk',
  'Georgette Blend',
  'Raw Silk Blend',
  '100% Pure Cambric Cotton',
  'Micro Velvet & Georgette',
  'Pure Organza & Silk Crepe',
  'Banarasi Silk Brocade',
  'Mulmul Cotton',
  'Tussar Silk',
  'Modal Satin Blend',
];

const WEAVES = [
  'Handloom Art',
  'Jacquard Zari Weave',
  'Plain Weave Cotton',
  'Brocade Weave',
  'Georgette Flute',
  'Velvet Pile Weave',
  'Organza Sheer Weave',
];

const ORNAMENTATIONS = [
  'Zari & Rose Gold Thread Work',
  'Intricate Mirror & Foil Work',
  'Hand Embroidered Resham Thread',
  'Traditional Gota Patti & Sequins',
  'Delicate Pearl & Bead Embellishments',
  'Handblock Floral Botanical Print',
  'Fine Lucknowi Chikankari Embroidery',
  'Zardozi & Antique Tilla Borders',
];

const COLOR_PALETTES = [
  { name: 'Magenta Pink', hex: '#E72763' },
  { name: 'Emerald Green', hex: '#006953' },
  { name: 'Royal Navy', hex: '#1b263b' },
  { name: 'Mustard Gold', hex: '#d4a373' },
  { name: 'Soft Peach', hex: '#fbcfe8' },
  { name: 'Wine Velvet', hex: '#4a0e17' },
  { name: 'Mint Green', hex: '#a7f3d0' },
  { name: 'Peacock Teal', hex: '#008469' },
  { name: 'Rust Terracotta', hex: '#c2410c' },
  { name: 'Royal Blue', hex: '#1d4ed8' },
  { name: 'Dusty Rose', hex: '#fb7185' },
  { name: 'Ivory Gold', hex: '#fef08a' },
];

// Curated high quality fashion imagery for endless scrolling
const IMAGE_CATALOG = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBC4bYmeBxw7WocUoZiX4H8IwQinxeAIDECiGiYZ6w_DYMDVNSztb93_OLhGeS_pGzwT--k_9wHri0g0uQHbzMyMzAbNmr6ed989fSyS27e4xGTV_fgQ0WAQL5Xw_HcpV6j_M96BvldOk1kESgAv33TaoPKmIjXkTBWHlVH972-tCT8Y5htRLLVWAgxlbbs7MPuJAMr_GDsn_Dq9gE30zww3OsD3JthP_CkaIkSMiQRx4QLeqyu1J1-zw',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuChV7dJN_QZ58ek6h8lGmugEEhmA7aFbMBdbg1mIppnWzw8xmtPFh0ooq1qO4jwQArYhvDZOUKVwqFeUMKJuNiF7vP0VTvATJkjnjkIXWNK1Molg06L-aHbMW_9p_CXflUdXEQHHMiuSdAWfmOFAmcGnKoRPBFa6sjwOSa6j1t8KxcBzWLMonxJDhgcCbrtWbPV2u3f1CJHqm0gZ9DyP4Acs9rDgRewDnJW8B0Omcz6G16UJXwkiUCg2w',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCzzRbZEqC5BEBbI8zMbC7VoGJvAbEMOEkVA2ac5zuRPONvppG95p7PJMCbqs80NEcL2q5aou5GWwy10IkDRAxij96rWUl9GSDhXQSUQ21L0Qm3YTzQztPviMIObzo-UiCYh8XGu839dv6IeZMqwJx2qQBDvIXusNvcuf7zHWDJlxOvXkBvZjSGuzY0NsSoHXfSLHDf47DCVz35f_g56cwF2XMoJcHHn6VhayPI6KYnL2vkfjUz5muIXA',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB7yepcF-LdDOPWCjYJojOYfPNL184SP3JNAgwm3NxxbVI8H5ZaSzets-Y5LJguNOq5_bwIJ6Zfm_D3krzImVprF7gGp8unGEUFSVKBX8omFqKn3Uq7dbtBqgE5mSs4iEbAGrCpalQB6II6QsTTxuZ35SgiucjpTyvQFOIg_xWrH4S19DHuvO4Hpg1Qn1SEXKxHP9lsAbPowsDCAUWiM8I4naP8-kq3kDNJziqE6UxqmsMff8OhrhH0Rw',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAP8evGxUnjr979ZlqdCOWUNTv83548phnPw6yamcP8p-RGBtTrgI0X7PIdUGBw3Q1gALOfXMasFyEdb7Gl6INDAnTPWmrFVeWKeXdXcYv-980MdEhjCmR-x_JJPZzLeeqRQ2HRBs2NTRQnizfc1tW_22iuHjhuflrkq6TOqVuxl5M_0DsQETGxd3nKZJFvIhcxGS4uZdZXMj_jOhhNrS5Wnom32DXeLEzEsA8z1UtlU73cOFRUrNec1Q',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuByJv2jwNq3kplU7_0hj-km_Poq1c3eX6d3mhLMH-cSX3ltVEgLSzCnQdtM78ks40kmhFBHPT3G8YVKpn5pAebHdhsur34OOnUPLFgI6stY35e4PuMD_XXUYoqytRrx5YaHGm-iATuPAwiJtfbFpaH7qCheSKMMyreZb6b2S0NbjwP2eY48nPL6QStBWM8eAKNx6HF4IPP9MRE7aE1QNW6QrdWf3neOwch-PnucwVepCRUkvd_V3tdTXA',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDiuOs_OphuVezM5xE-XiEbpkZwqCIbtXaGLVZVh90qHhof29_R2idRXHWdAColqpo1s3t10u-vyPkreBJ67Fsc-PlFtR1pUzi7L7ZkgLG6UwVUtYgO9ElMRvdb76mBeLBUYzYaepbqnPyygnvtjAuEfzozDUMaGcSdDLhskgWlarvzCBBQSfI7WTV-wfwl7OsB_WqvDB1y0NzILzsSGGcoDLFdhv0pXKdyc4s-rnyUtbWdHOuXIbD6HA',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCe4JHrh7wk-7OK0_PR_1jgeD60SHQ0PSvkTWEHQeUPU5PmLyUqHW8pnQSF-gIH66Or-YU2Ni74SuAmaw7J2_m0R0boCAkBadjnOnNpcTWinnnXbH7DgrtJlJfC4U9HvMn_LSIo1xACsGTlYXxw5FNf6K3o-lDQL8naARQe9RKnqyre-XwGIEfMmw0ofT4UDp9UoITT3VlGOaUoft_WFzLQdfe3rh_FnbmEuZA0KiBouKD_va2BBkLMPA',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBRj7VHBui3uViy5YeWDY9DOr7ck6JOGUuLYnuYMsby6r0Kpv9odt1YOzh9UwczGjZAqpY47QEhQidowobf_F2F5dGzwHjTj5bS_48T9Hfkl1cxJc4ZQetVwf7vcbKCmUXSEkh2EZnTJKqDKwWQ3ASaYZquTImixLl95Da61Jn39ukuBN5u4xQ1Pcs2LYVltcY76B_nOxdCpoi3nUN0QuOwAkEXfKeP9Y4O0LHAcv8b3_Ikezhw5IQJrA',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAH6oG2U9ROrhCVsbcTgVSAmYYGrBMwajUhINeUadnlpbHhp60MNCzHv2HhhHopu-e3VWjbbUbEM1KI6urj__JoleJDYiiigJ0p498aNV4gE7slw4LeEJgLZvfb0XvUMh_bxyvCwGuK58TG0zrlNkb5P_CZP0z-EBKDHCCjmK9xlFfu_8iLcwl_U4eWNm3j5tD1QnuM6aS5-da9ED_qBU3GrVO3FJXpv__SNjUR2AIOsHl-kg4BO4POHw',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDJQlk4ut5KWEqKLU59q3jmd-6IhB-nXPjmJYtPAmkFP7g81KqKU7eoAR_xzQY1703IWeLzdqs7o2_x5UmY5eq9DMNyZ4JqdDbDUtCd1HSpi71ms2nUU9XUtlg8T8F8fVkVxrVj8UoekDcV7jYERSqBSlVx2Y_jrLBNJLbEa5y6efWrBoEN7e45hCOriYdLd4-fmSpMEByRo2zjVrE0lvadwjPrFiyvn1m4Xhw3FGAl04PhYqGySgRVEA',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCoxxA7lWajvYqtqsdk3l1UuXTtXwDFCgI5WZ1cm6J3SKCD6FsophUvJD8pVmrP9AV1sNBpv0ooqgXwp_y64IMlKGtN-iu_haXJTJxFyZ1seGRL2otZY625iNtPvoFFnh_UAqHAJZkfwMkFIzursfuF9vHXDQ3LYsKDmLaO4za39EwFbjwkpweEeKvE9By5P3EprQp3PbKBP6DP04WZG7NdWTMbnQ7eWxcLIEp3gcceZRDcHDz_-eSp7Q',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAN3xaqm71IIhJPBmk6zEX76VypZ5xOOqtc47540OctXkhaGWxc-EukgsVh-B6moH07cgCjKK-fhDwAyBYSadfz2Rp8KaaKjzeCDU8WO-4RfvfHIiVoD1DFp_Qhs3bHdKmDgMPD8sr0JWzdw14aAky--kH7ExmG1iN8elu1g1qs3sNNMNnqa72G8Y8tdXTDqy8VAOaCMOxJ2ttzviItI8zoahCFT-txoJyzuE9ZyFlYwkOY7ESvcXss8g',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA5Z7s3vV08PZZzFL1hocX-qVThl_oN2vZq6bDtntFrFGpkHD5XqLs-AcuXn4SukovkM2OzEZ1M_Q3JEfVpf_x1SxrBEksWf8ZLcyoY5np7dDN37eF9qhitEwAPVBfR6cGjVkJPzeTVqzabAUSTG16AIF6HVxZCru06S6OMtWK7K0ZJEfimhP0jK1kAthYdxT3QS6oZ9i88264Y1XCCmpc7w2qw13mzHtPDcf66nKdHerDhvREH5cxqkw',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCxh9vZFf21cmzKtNJ6n4CCDI2KzegBU9P-9EyUBQo33YgmQHdFvLO71L1XNQGYUPorOwfnyAXyqS7mZMUqIlP6cwoxPtcK_WrDgKjIlJdeYbqQ5jYju0EAA2opLpnkHDRPIzEe_Hn0cjBYoaajQ2LQleFDhi_S--vS8UeSzJujijaRpschuhA1EfSskbix9n9GNzSXMhFpIrFksmocg_6aag0S9dVNCpcT65jXkeZC91F0tEYAD8tTZQ',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBLSqzVgwgN1kHBYHR-Oc9zEHiNvvZLHgfCrt7Z4PmJfaIWFcrTLgnMjC_G0DaoA8mxkmCBb9Kwg_KS2EgWA9tvqqCo0gu1GPsdd3O6TnV6C53rDnaw85hMJc8hAaBxYbBMQDAWqpgpQKWam6ptHW0jofPXAKK5f3ogftxceHzEL7mY9P_kpHnh5iGgMrtGm2WwgJIOZPugeref8VCgRXTHB9awQApgg8bQ6dHYAOvkBHVOhaUJ0ZYLsA',
];

const TAG_POOL = [
  'TRENDING #1',
  'ONLY 3 LEFT',
  '1-DAY DELIVERY',
  'BESTSELLER',
  'NEW LAUNCH',
  'FESTIVE EDIT',
  'HANDCRAFTED',
  undefined,
  undefined,
];

// Generates an infinite batch of products
export function generateInfiniteProducts(page: number, pageSize: number = 12): Product[] {
  // First page starts with our hand-curated products to preserve 1:1 match with prompt screenshots
  if (page === 1) {
    return ALL_PRODUCTS.slice(0, pageSize);
  }

  const generated: Product[] = [];
  const startIndex = (page - 1) * pageSize;

  for (let i = 0; i < pageSize; i++) {
    const globalIdx = startIndex + i;
    const brand = BRANDS[globalIdx % BRANDS.length];
    const styleName = STYLES[globalIdx % STYLES.length];
    const fabric = FABRICS[globalIdx % FABRICS.length];
    const weave = WEAVES[globalIdx % WEAVES.length];
    const ornamentation = ORNAMENTATIONS[globalIdx % ORNAMENTATIONS.length];
    const image = IMAGE_CATALOG[globalIdx % IMAGE_CATALOG.length];

    // Additional secondary images
    const image2 = IMAGE_CATALOG[(globalIdx + 3) % IMAGE_CATALOG.length];
    const image3 = IMAGE_CATALOG[(globalIdx + 7) % IMAGE_CATALOG.length];

    const tag = TAG_POOL[globalIdx % TAG_POOL.length];
    const basePrice = 799 + ((globalIdx * 197) % 3600);
    const discount = 45 + ((globalIdx * 7) % 30); // 45% - 75%
    const originalPrice = Math.round((basePrice / (1 - discount / 100)) / 100) * 100 - 1;
    const rating = Number((4.1 + ((globalIdx * 13) % 9) / 10).toFixed(1));
    const ratingCountNum = 150 + ((globalIdx * 373) % 4500);
    const ratingCount =
      ratingCountNum >= 1000
        ? (ratingCountNum / 1000).toFixed(1) + 'k'
        : String(ratingCountNum);

    const color1 = COLOR_PALETTES[globalIdx % COLOR_PALETTES.length];
    const color2 = COLOR_PALETTES[(globalIdx + 4) % COLOR_PALETTES.length];
    const color3 = COLOR_PALETTES[(globalIdx + 8) % COLOR_PALETTES.length];

    const category =
      styleName.includes('Anarkali')
        ? 'Anarkali Suits'
        : styleName.includes('Lehenga')
        ? 'Lehenga Choli'
        : styleName.includes('Maxi') || styleName.includes('Co-ord')
        ? 'Fusion Dresses'
        : 'Kurta Sets';

    generated.push({
      id: `gen-prod-${globalIdx}`,
      name: `${fabric} ${styleName}`,
      brand,
      category,
      price: basePrice,
      originalPrice,
      discountPercentage: discount,
      rating,
      ratingCount,
      tag: tag || undefined,
      tagType:
        tag === 'TRENDING #1'
          ? 'trending'
          : tag === 'ONLY 3 LEFT'
          ? 'low_stock'
          : tag === '1-DAY DELIVERY'
          ? 'fast_delivery'
          : undefined,
      image,
      images: [image, image2, image3],
      colors: [color1, color2, color3],
      sizes: [
        { size: 'XS', stock: (globalIdx % 3), available: globalIdx % 5 !== 0 },
        { size: 'S', stock: 5 + (globalIdx % 10), available: true },
        { size: 'M', stock: 8 + (globalIdx % 12), available: true },
        { size: 'L', stock: 2 + (globalIdx % 7), available: true },
        { size: 'XL', stock: 4 + (globalIdx % 8), available: true },
        { size: 'XXL', stock: 2 + (globalIdx % 5), available: true },
      ],
      fabric,
      weaveType: weave,
      ornamentation,
      washCare: 'Dry Clean Recommended',
      description: `Exquisitely crafted ${brand} ${styleName}. Made from luxurious ${fabric} with intricate ${ornamentation}. Perfect for festive gatherings, family weddings, and celebratory elegance with comfortable modern drape.`,
      isBestseller: tag === 'BESTSELLER' || tag === 'TRENDING #1',
    });
  }

  return generated;
}
