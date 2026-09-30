import { Product, Address, Coupon } from '../types';

export const BRAND_LOGO_URL =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="26" fill="%23FF386B"/><path d="M64 36C64 26 52 20 39 24C27 28 23 37 28 44C33 50 48 53 56 57C67 62 72 71 65 81C58 90 40 92 28 85C22 81 23 74 30 74C35 74 39 78 47 79C54 80 58 76 57 71C55 64 42 61 33 56C22 51 18 41 24 31C31 20 52 14 67 23C73 27 72 36 64 36Z" fill="%23FFFFFF"/></svg>';

export const USER_AVATAR_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAVTisikjJve-cbckg8NXBgRvnDH9-3UsP9DQ2pd_95CLRdFxTd0Po-3MRkcfuhaibj4CtKmKcOxTRoRtd8gm4LAO3P9L-1rSjvzod7c6jZCPSHIyTsZJGtGh4PLksKMe2WgukAZhj4s3D_8eMTwXFv3Rgeln86qVEFKDJY9_vYlTyaiX1oqISsM8QTblwgNew6eqvVUDkEK9UMkUFMwOViIRvTLqWtyqkj4J4xw5MPsVJF63rhIF9S6g';

export const CATEGORIES_DATA = [
  {
    id: 'women',
    name: 'Women',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAJaBlujRYutlI5045ZLNlRolMervJg50umRZZRF5zD2mNIeK0TTaWoKw0JBihNpy0TD8SW69uALHerZASJkGhkfXCImybsdJDhDWHnCS5VPN43R8TMXjEu9RKiz9Bkd63z3Z4P7wyjJWIoUMYGe_73kt8Ztu0m-lf9rU3s6yCoDYuqrK0am0YcbRdtUrpSpc4sVTSpN_KmhpXSMoQKfqEVzw9DLXNcqyDObW4TV--fIdw1cbbKWWNDUQ',
  },
  {
    id: 'men',
    name: 'Men',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBHPL0gIJa7vazBGxlXdiVfsqhWrDWLzdbhMgeD_d7Wvw4XlHnHGjFhvfCtd7ePUFZnnrqCoLtS_qEzTXJ0NPOrp2Sf13UXM9TVUWwvWKiZnKnBD2cpgvtt0gDoXRvFJLuPFvzjuAFqt6qeb8C_w163PwjbbU2oM5aGioVrSx0KCXYGXyuLwogd8DWVJRz6DcbkEmRjXRuOkK4MZZ9qfp0iOz5xNd1WnrfK880F2AsRNOnVEzT2xkQ_hg',
  },
  {
    id: 'ethnic',
    name: 'Ethnic',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBDOvL3FbgUd2VOxxvN2olDNjcJ12wLuxqpMWPXOeWUK1OFCPkXJxTo-zudbGwZ0GPqeRHnC7EDZnSOG3d-nMuuEBnQDSaFl2NKfux5RO5246qMboS_w8YjMf9ckcxaZ2rE9T055Vjfu-tzQVl2UPLAArjHzbUY3JLl4ma712Jp3GVnT9YmfwWyksn4kJiibSQNWNA1f-0xkpjlPNReuSYb32cnQYz8dS5PmhzeRBBst80V6zqbi76oJQ',
  },
  {
    id: 'western',
    name: 'Western',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDZq29jd22EhMX3qr4ymsCJMbEnIS4sS95zdnAZiLrLKLD-1nwqKzySaHan3OLhh8PJmku_R8R27kWVfe-q-Wa70ZMu_CSjnUaENScdmQndxLeeKW28wdNweeIKPsY5fYUlBZZykJW9Hg--O_tnZDOloV7NwMlDyYpkNYLsQhAzC4vEYshPbebgHKDjVXp05-rfLbEuz67WzVrPCpRsUGhxdXuyy0DHihKm0Qfk3fIzUIHXKL7NlkoViQ',
  },
  {
    id: 'footwear',
    name: 'Footwear',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDGCvg909IUS9NxSJomVDrPLmswvAJolLGVDNNnLcw_HaWEIqFYD1rgXTVHweAB5irbTLIZqgoj8t6j22f64KnZmuiOe211b4ykmaLqeCM98visjWRw7KgOp-Z4pJXos_V52vwxSxEH1FzcoVwNMZZ7d3MH9Zopyv4vhZd98fkJEW_ZB8nYlqEvqJf4969Dckgm_arA_xsWuTu7YdR_wqbesT5__d_Vy9hOx1jbLIQ-WOmRjc6zysJD5g',
  },
  {
    id: 'kids',
    name: 'Kids',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBIQz_WZ5t20HGCZJlJ8FavaVZWroOI5oiZz9Do_Y-dKi3NKGDdLGxrmFyMP9la2qihYFQ22d1ls7WCN8DJXtPWDRob_h8pT6yHYvceyNwx6I8-glW9bXBS8MBqzZUPixyYEcSpM1umFM5KHHYqqplV02d21qGi3aMBiVlaB0Gcb1OBMuM0kFf2TheYBACe62dCG3xIJO8gObejEptEpiGsV5bzQAlIYgWaERblg1hyzVqA15eArxHqtg',
  },
  {
    id: 'jewellery',
    name: 'Jewellery',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBaT9Y30c4Vyp5pBXaenuX606TsdYDPmpdL9NGrYRLKP1RjOXMRVTYMzxytvZa-4P0leJKkRsqJjdk2pPIDcPlL_GM04_kq2y49M9-FX9uEuPwgsEJF1sK_HrRVIgceqVoR8fIuJMdPmL4wlPnsp7KKWrxIH1T1WqL2fChqPEzGRURI5EGDlAfYwlkL31HbDuF9beROttsMQC7a5cb71rVf1C6UyS-DJj9KGcA_HztR09Qa-otsgmobrA',
  },
];

export const ALL_PRODUCTS: Product[] = [
  {
    id: 'siri-originals-chanderi',
    name: 'Embroidered Silk Blend Straight Kurta with Trousers & Dupatta',
    brand: 'SIRI ORIGINALS',
    category: 'Kurta Sets',
    price: 2299,
    originalPrice: 4999,
    discountPercentage: 54,
    rating: 4.6,
    ratingCount: '2.4k',
    tag: 'TRENDING #1',
    tagType: 'trending',
    isBestseller: true,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBC4bYmeBxw7WocUoZiX4H8IwQinxeAIDECiGiYZ6w_DYMDVNSztb93_OLhGeS_pGzwT--k_9wHri0g0uQHbzMyMzAbNmr6ed989fSyS27e4xGTV_fgQ0WAQL5Xw_HcpV6j_M96BvldOk1kESgAv33TaoPKmIjXkTBWHlVH972-tCT8Y5htRLLVWAgxlbbs7MPuJAMr_GDsn_Dq9gE30zww3OsD3JthP_CkaIkSMiQRx4QLeqyu1J1-zw',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA5Z7s3vV08PZZzFL1hocX-qVThl_oN2vZq6bDtntFrFGpkHD5XqLs-AcuXn4SukovkM2OzEZ1M_Q3JEfVpf_x1SxrBEksWf8ZLcyoY5np7dDN37eF9qhitEwAPVBfR6cGjVkJPzeTVqzabAUSTG16AIF6HVxZCru06S6OMtWK7K0ZJEfimhP0jK1kAthYdxT3QS6oZ9i88264Y1XCCmpc7w2qw13mzHtPDcf66nKdHerDhvREH5cxqkw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCxh9vZFf21cmzKtNJ6n4CCDI2KzegBU9P-9EyUBQo33YgmQHdFvLO71L1XNQGYUPorOwfnyAXyqS7mZMUqIlP6cwoxPtcK_WrDgKjIlJdeYbqQ5jYju0EAA2opLpnkHDRPIzEe_Hn0cjBYoaajQ2LQleFDhi_S--vS8UeSzJujijaRpschuhA1EfSskbix9n9GNzSXMhFpIrFksmocg_6aag0S9dVNCpcT65jXkeZC91F0tEYAD8tTZQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBLSqzVgwgN1kHBYHR-Oc9zEHiNvvZLHgfCrt7Z4PmJfaIWFcrTLgnMjC_G0DaoA8mxkmCBb9Kwg_KS2EgWA9tvqqCo0gu1GPsdd3O6TnV6C53rDnaw85hMJc8hAaBxYbBMQDAWqpgpQKWam6ptHW0jofPXAKK5f3ogftxceHzEL7mY9P_kpHnh5iGgMrtGm2WwgJIOZPugeref8VCgRXTHB9awQApgg8bQ6dHYAOvkBHVOhaUJ0ZYLsA',
    ],
    colors: [
      { name: 'Magenta Pink', hex: '#E72763' },
      { name: 'Royal Navy', hex: '#1b263b' },
      { name: 'Emerald Green', hex: '#006953' },
      { name: 'Mustard Gold', hex: '#d4a373' },
    ],
    sizes: [
      { size: 'XS', stock: 0, available: false },
      { size: 'S', stock: 12, available: true },
      { size: 'M', stock: 8, available: true },
      { size: 'L', stock: 2, available: true },
      { size: 'XL', stock: 6, available: true },
      { size: 'XXL', stock: 4, available: true },
    ],
    fabric: 'Pure Chanderi Silk',
    weaveType: 'Handloom Art',
    ornamentation: 'Zari & Thread Work',
    washCare: 'Dry Clean Only',
    description:
      'Elevate your festive presence with the Siri Originals Masterpiece set. Cut from fluid pure Chanderi silk, this hand-finished kurta is accentuated with rich rose gold floral embroidery along the notched V-neckline and sleeve cuffs. Complemented by tapered straight trousers and a feather-light scalloped organza dupatta.',
  },
  {
    id: 'aura-by-siri-angrakha',
    name: 'Foil Print Angrakha Kurti & Palazzos',
    brand: 'AURA BY SIRI',
    category: 'Kurta Sets',
    price: 1599,
    originalPrice: 3499,
    discountPercentage: 54,
    rating: 4.3,
    ratingCount: '1.1k',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuChV7dJN_QZ58ek6h8lGmugEEhmA7aFbMBdbg1mIppnWzw8xmtPFh0ooq1qO4jwQArYhvDZOUKVwqFeUMKJuNiF7vP0VTvATJkjnjkIXWNK1Molg06L-aHbMW_9p_CXflUdXEQHHMiuSdAWfmOFAmcGnKoRPBFa6sjwOSa6j1t8KxcBzWLMonxJDhgcCbrtWbPV2u3f1CJHqm0gZ9DyP4Acs9rDgRewDnJW8B0Omcz6G16UJXwkiUCg2w',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuChV7dJN_QZ58ek6h8lGmugEEhmA7aFbMBdbg1mIppnWzw8xmtPFh0ooq1qO4jwQArYhvDZOUKVwqFeUMKJuNiF7vP0VTvATJkjnjkIXWNK1Molg06L-aHbMW_9p_CXflUdXEQHHMiuSdAWfmOFAmcGnKoRPBFa6sjwOSa6j1t8KxcBzWLMonxJDhgcCbrtWbPV2u3f1CJHqm0gZ9DyP4Acs9rDgRewDnJW8B0Omcz6G16UJXwkiUCg2w',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD8uSnM5Cf2MckUUBCdlRrbgBEDg3Qie6mTFNGH4B_P848upTm7bN5QovuTZ6Dsvc2DhmzwcJrQOFK2dodjKF9BFG1q_uFXlr7YISYDdvUB0Vuy2FPTp124YaHP-HHo_G-0ZHM2dHJX2Ipe22JqibsQySJmTvZiwm0ogd8hqBfTyQFEVw-YkaOC9YMA-BxdQxpHnTbqMLLv8k2p8lR5qonygMxIK3ePaQAYA3VxBOUhXMXWmhBJz14UcQ',
    ],
    colors: [
      { name: 'Soft Peach', hex: '#fbcfe8' },
      { name: 'Dusty Slate', hex: '#94a3b8' },
    ],
    sizes: [
      { size: 'XS', stock: 4, available: true },
      { size: 'S', stock: 8, available: true },
      { size: 'M', stock: 5, available: true },
      { size: 'L', stock: 3, available: true },
      { size: 'XL', stock: 4, available: true },
    ],
    fabric: 'Georgette Blend',
    weaveType: 'Powerloom',
    ornamentation: 'Metallic Foil Print',
    washCare: 'Hand Wash Gently',
    description:
      'Contemporary pastel peach foil print Angrakha style tunic kurti with flared matching palazzos worn by an elegant young model in minimalist studio setting, soft airy illumination, Siri Clothing premium festive catalogue.',
  },
  {
    id: 'festive-bloom-lehenga',
    name: 'Zari Embroidered Silk Lehenga Choli',
    brand: 'FESTIVE BLOOM',
    category: 'Lehenga Choli',
    price: 3499,
    originalPrice: 7999,
    discountPercentage: 56,
    rating: 4.7,
    ratingCount: '3.8k',
    tag: 'ONLY 3 LEFT',
    tagType: 'low_stock',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCzzRbZEqC5BEBbI8zMbC7VoGJvAbEMOEkVA2ac5zuRPONvppG95p7PJMCbqs80NEcL2q5aou5GWwy10IkDRAxij96rWUl9GSDhXQSUQ21L0Qm3YTzQztPviMIObzo-UiCYh8XGu839dv6IeZMqwJx2qQBDvIXusNvcuf7zHWDJlxOvXkBvZjSGuzY0NsSoHXfSLHDf47DCVz35f_g56cwF2XMoJcHHn6VhayPI6KYnL2vkfjUz5muIXA',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCzzRbZEqC5BEBbI8zMbC7VoGJvAbEMOEkVA2ac5zuRPONvppG95p7PJMCbqs80NEcL2q5aou5GWwy10IkDRAxij96rWUl9GSDhXQSUQ21L0Qm3YTzQztPviMIObzo-UiCYh8XGu839dv6IeZMqwJx2qQBDvIXusNvcuf7zHWDJlxOvXkBvZjSGuzY0NsSoHXfSLHDf47DCVz35f_g56cwF2XMoJcHHn6VhayPI6KYnL2vkfjUz5muIXA',
    ],
    colors: [
      { name: 'Peacock Teal', hex: '#006953' },
      { name: 'Royal Gold', hex: '#eab308' },
    ],
    sizes: [
      { size: 'S', stock: 2, available: true },
      { size: 'M', stock: 1, available: true },
      { size: 'L', stock: 0, available: false },
    ],
    fabric: 'Raw Silk Blend',
    weaveType: 'Brocade & Zari Jacquard',
    ornamentation: 'Heavy Golden Zari & Resham Work',
    washCare: 'Dry Clean Only',
    description:
      'Magnificent jewel-toned silk blend royal lehenga choli with ornate zari gold embroidery, poised and grand for bridal festivities and memorable celebrations.',
  },
  {
    id: 'siri-everyday-cotton',
    name: 'Floral Printed A-Line Cotton Kurta',
    brand: 'SIRI EVERYDAY',
    category: 'Kurtas & Tunics',
    price: 899,
    originalPrice: 1999,
    discountPercentage: 55,
    rating: 4.4,
    ratingCount: '4.5k',
    tag: '1-DAY',
    tagType: 'fast_delivery',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB7yepcF-LdDOPWCjYJojOYfPNL184SP3JNAgwm3NxxbVI8H5ZaSzets-Y5LJguNOq5_bwIJ6Zfm_D3krzImVprF7gGp8unGEUFSVKBX8omFqKn3Uq7dbtBqgE5mSs4iEbAGrCpalQB6II6QsTTxuZ35SgiucjpTyvQFOIg_xWrH4S19DHuvO4Hpg1Qn1SEXKxHP9lsAbPowsDCAUWiM8I4naP8-kq3kDNJziqE6UxqmsMff8OhrhH0Rw',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB7yepcF-LdDOPWCjYJojOYfPNL184SP3JNAgwm3NxxbVI8H5ZaSzets-Y5LJguNOq5_bwIJ6Zfm_D3krzImVprF7gGp8unGEUFSVKBX8omFqKn3Uq7dbtBqgE5mSs4iEbAGrCpalQB6II6QsTTxuZ35SgiucjpTyvQFOIg_xWrH4S19DHuvO4Hpg1Qn1SEXKxHP9lsAbPowsDCAUWiM8I4naP8-kq3kDNJziqE6UxqmsMff8OhrhH0Rw',
    ],
    colors: [
      { name: 'Ivory Floral', hex: '#fffbeb' },
      { name: 'Sky Blue', hex: '#bfdbfe' },
    ],
    sizes: [
      { size: 'XS', stock: 5, available: true },
      { size: 'S', stock: 15, available: true },
      { size: 'M', stock: 20, available: true },
      { size: 'L', stock: 12, available: true },
      { size: 'XL', stock: 8, available: true },
    ],
    fabric: '100% Pure Cambric Cotton',
    weaveType: 'Plain Weave',
    ornamentation: 'Hand Block Style Floral Print',
    washCare: 'Machine Wash Normal',
    description:
      'Chic everyday floral printed A-line cotton straight kurti on youthful Indian woman walking along a bright sunlit veranda, fresh natural light, lifestyle aesthetic, Siri Clothing pret collection.',
  },
  {
    id: 'royal-heritage-velvet',
    name: 'Velvet Yoke Flared Anarkali Gown',
    brand: 'ROYAL HERITAGE',
    category: 'Anarkali Suits',
    price: 2999,
    originalPrice: 5999,
    discountPercentage: 50,
    rating: 4.5,
    ratingCount: '920',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAP8evGxUnjr979ZlqdCOWUNTv83548phnPw6yamcP8p-RGBtTrgI0X7PIdUGBw3Q1gALOfXMasFyEdb7Gl6INDAnTPWmrFVeWKeXdXcYv-980MdEhjCmR-x_JJPZzLeeqRQ2HRBs2NTRQnizfc1tW_22iuHjhuflrkq6TOqVuxl5M_0DsQETGxd3nKZJFvIhcxGS4uZdZXMj_jOhhNrS5Wnom32DXeLEzEsA8z1UtlU73cOFRUrNec1Q',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAP8evGxUnjr979ZlqdCOWUNTv83548phnPw6yamcP8p-RGBtTrgI0X7PIdUGBw3Q1gALOfXMasFyEdb7Gl6INDAnTPWmrFVeWKeXdXcYv-980MdEhjCmR-x_JJPZzLeeqRQ2HRBs2NTRQnizfc1tW_22iuHjhuflrkq6TOqVuxl5M_0DsQETGxd3nKZJFvIhcxGS4uZdZXMj_jOhhNrS5Wnom32DXeLEzEsA8z1UtlU73cOFRUrNec1Q',
    ],
    colors: [
      { name: 'Wine Velvet', hex: '#4a0e17' },
      { name: 'Deep Emerald', hex: '#064e3b' },
    ],
    sizes: [
      { size: 'S', stock: 4, available: true },
      { size: 'M', stock: 6, available: true },
      { size: 'L', stock: 3, available: true },
      { size: 'XL', stock: 2, available: true },
    ],
    fabric: 'Micro Velvet & Georgette Flare',
    weaveType: 'Velvet Jacquard',
    ornamentation: 'Dori & Tilla Embroidery',
    washCare: 'Specialist Dry Clean',
    description:
      'Regal deep jewel-tone wine velvet yoke Anarkali floor-length gown adorned with delicate tilla work, modeled against a rich heritage palace backdrop with soft dusk light, Siri Clothing couture edit.',
  },
  {
    id: 'pastel-whisper-organza',
    name: 'Organza Embroidered Straight Suit',
    brand: 'PASTEL WHISPER',
    category: 'Kurta Sets',
    price: 2199,
    originalPrice: 4599,
    discountPercentage: 52,
    rating: 4.2,
    ratingCount: '480',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuByJv2jwNq3kplU7_0hj-km_Poq1c3eX6d3mhLMH-cSX3ltVEgLSzCnQdtM78ks40kmhFBHPT3G8YVKpn5pAebHdhsur34OOnUPLFgI6stY35e4PuMD_XXUYoqytRrx5YaHGm-iATuPAwiJtfbFpaH7qCheSKMMyreZb6b2S0NbjwP2eY48nPL6QStBWM8eAKNx6HF4IPP9MRE7aE1QNW6QrdWf3neOwch-PnucwVepCRUkvd_V3tdTXA',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuByJv2jwNq3kplU7_0hj-km_Poq1c3eX6d3mhLMH-cSX3ltVEgLSzCnQdtM78ks40kmhFBHPT3G8YVKpn5pAebHdhsur34OOnUPLFgI6stY35e4PuMD_XXUYoqytRrx5YaHGm-iATuPAwiJtfbFpaH7qCheSKMMyreZb6b2S0NbjwP2eY48nPL6QStBWM8eAKNx6HF4IPP9MRE7aE1QNW6QrdWf3neOwch-PnucwVepCRUkvd_V3tdTXA',
    ],
    colors: [
      { name: 'Mint Green', hex: '#a7f3d0' },
      { name: 'Powder Blue', hex: '#bae6fd' },
    ],
    sizes: [
      { size: 'XS', stock: 3, available: true },
      { size: 'S', stock: 8, available: true },
      { size: 'M', stock: 7, available: true },
      { size: 'L', stock: 5, available: true },
    ],
    fabric: 'Pure Organza & Silk Crepe Lining',
    weaveType: 'Organza Sheer Weave',
    ornamentation: 'Delicate Resham Thread Floral Work',
    washCare: 'Dry Clean Only',
    description:
      'Dreamy sheer pastel mint green organza embroidered straight suit with fine floral resham threads and matching silk dupatta, delicate ethereal lighting, Siri Clothing summer festive celebration.',
  },
  // Steal Deals & Home items:
  {
    id: 'siri-exclusive-emerald',
    name: 'Emerald Silk Anarkali Set',
    brand: 'SIRI EXCLUSIVE',
    category: 'Anarkali Suits',
    price: 2499,
    originalPrice: 5999,
    discountPercentage: 58,
    rating: 4.4,
    ratingCount: '1.2k',
    tag: 'FAST 2-DAY DELIVERY',
    tagType: 'fast_delivery',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDiuOs_OphuVezM5xE-XiEbpkZwqCIbtXaGLVZVh90qHhof29_R2idRXHWdAColqpo1s3t10u-vyPkreBJ67Fsc-PlFtR1pUzi7L7ZkgLG6UwVUtYgO9ElMRvdb76mBeLBUYzYaepbqnPyygnvtjAuEfzozDUMaGcSdDLhskgWlarvzCBBQSfI7WTV-wfwl7OsB_WqvDB1y0NzILzsSGGcoDLFdhv0pXKdyc4s-rnyUtbWdHOuXIbD6HA',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDiuOs_OphuVezM5xE-XiEbpkZwqCIbtXaGLVZVh90qHhof29_R2idRXHWdAColqpo1s3t10u-vyPkreBJ67Fsc-PlFtR1pUzi7L7ZkgLG6UwVUtYgO9ElMRvdb76mBeLBUYzYaepbqnPyygnvtjAuEfzozDUMaGcSdDLhskgWlarvzCBBQSfI7WTV-wfwl7OsB_WqvDB1y0NzILzsSGGcoDLFdhv0pXKdyc4s-rnyUtbWdHOuXIbD6HA',
    ],
    colors: [{ name: 'Emerald', hex: '#006953' }],
    sizes: [
      { size: 'S', stock: 6, available: true },
      { size: 'M', stock: 8, available: true },
      { size: 'L', stock: 4, available: true },
    ],
    fabric: 'Pure Silk Blend',
    weaveType: 'Handloom',
    ornamentation: 'Zari Embroidery',
    washCare: 'Dry Clean Only',
    description:
      'Editorial full length shot of an Indian model in an emerald green pure silk Anarkali kurta set with zari work and organza dupatta.',
  },
  {
    id: 'libas-festive-peach',
    name: 'Peach Embroidered Kurta Set',
    brand: 'LIBAS FESTIVE',
    category: 'Kurta Sets',
    price: 1799,
    originalPrice: 3999,
    discountPercentage: 55,
    rating: 4.3,
    ratingCount: '840',
    tag: 'FAST 2-DAY DELIVERY',
    tagType: 'fast_delivery',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCe4JHrh7wk-7OK0_PR_1jgeD60SHQ0PSvkTWEHQeUPU5PmLyUqHW8pnQSF-gIH66Or-YU2Ni74SuAmaw7J2_m0R0boCAkBadjnOnNpcTWinnnXbH7DgrtJlJfC4U9HvMn_LSIo1xACsGTlYXxw5FNf6K3o-lDQL8naARQe9RKnqyre-XwGIEfMmw0ofT4UDp9UoITT3VlGOaUoft_WFzLQdfe3rh_FnbmEuZA0KiBouKD_va2BBkLMPA',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCe4JHrh7wk-7OK0_PR_1jgeD60SHQ0PSvkTWEHQeUPU5PmLyUqHW8pnQSF-gIH66Or-YU2Ni74SuAmaw7J2_m0R0boCAkBadjnOnNpcTWinnnXbH7DgrtJlJfC4U9HvMn_LSIo1xACsGTlYXxw5FNf6K3o-lDQL8naARQe9RKnqyre-XwGIEfMmw0ofT4UDp9UoITT3VlGOaUoft_WFzLQdfe3rh_FnbmEuZA0KiBouKD_va2BBkLMPA',
    ],
    colors: [{ name: 'Peach', hex: '#fbcfe8' }],
    sizes: [
      { size: 'S', stock: 4, available: true },
      { size: 'M', stock: 7, available: true },
      { size: 'L', stock: 5, available: true },
    ],
    fabric: 'Georgette',
    weaveType: 'Fine Weave',
    ornamentation: 'Pearl Embellishment',
    washCare: 'Dry Clean Only',
    description:
      'Front editorial angle of female model in pastel peach embroidered georgette kurta set with pearl embellishments.',
  },
  {
    id: 'dressberry-luxe-maxi',
    name: 'Cotton Tiered Maxi Dress',
    brand: 'DRESSBERRY LUXE',
    category: 'Fusion Dresses',
    price: 1199,
    originalPrice: 2499,
    discountPercentage: 52,
    rating: 4.5,
    ratingCount: '2.1k',
    tag: 'FAST 2-DAY DELIVERY',
    tagType: 'fast_delivery',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBRj7VHBui3uViy5YeWDY9DOr7ck6JOGUuLYnuYMsby6r0Kpv9odt1YOzh9UwczGjZAqpY47QEhQidowobf_F2F5dGzwHjTj5bS_48T9Hfkl1cxJc4ZQetVwf7vcbKCmUXSEkh2EZnTJKqDKwWQ3ASaYZquTImixLl95Da61Jn39ukuBN5u4xQ1Pcs2LYVltcY76B_nOxdCpoi3nUN0QuOwAkEXfKeP9Y4O0LHAcv8b3_Ikezhw5IQJrA',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBRj7VHBui3uViy5YeWDY9DOr7ck6JOGUuLYnuYMsby6r0Kpv9odt1YOzh9UwczGjZAqpY47QEhQidowobf_F2F5dGzwHjTj5bS_48T9Hfkl1cxJc4ZQetVwf7vcbKCmUXSEkh2EZnTJKqDKwWQ3ASaYZquTImixLl95Da61Jn39ukuBN5u4xQ1Pcs2LYVltcY76B_nOxdCpoi3nUN0QuOwAkEXfKeP9Y4O0LHAcv8b3_Ikezhw5IQJrA',
    ],
    colors: [{ name: 'Boho Print', hex: '#fb923c' }],
    sizes: [
      { size: 'XS', stock: 4, available: true },
      { size: 'S', stock: 9, available: true },
      { size: 'M', stock: 11, available: true },
      { size: 'L', stock: 7, available: true },
    ],
    fabric: 'Pure Slub Cotton',
    weaveType: 'Tiered Weave',
    ornamentation: 'Bohemian Floral Print',
    washCare: 'Machine Wash Gentle',
    description:
      'Model posing outdoors wearing a bohemian floral printed cotton tiered maxi dress in soft natural sunshine.',
  },
  {
    id: 'w-for-woman-mirror',
    name: 'Royal Blue Mirror Work Kurti',
    brand: 'W FOR WOMAN',
    category: 'Kurtas & Tunics',
    price: 1899,
    originalPrice: 4299,
    discountPercentage: 55,
    rating: 4.2,
    ratingCount: '610',
    tag: 'FAST 2-DAY DELIVERY',
    tagType: 'fast_delivery',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAH6oG2U9ROrhCVsbcTgVSAmYYGrBMwajUhINeUadnlpbHhp60MNCzHv2HhhHopu-e3VWjbbUbEM1KI6urj__JoleJDYiiigJ0p498aNV4gE7slw4LeEJgLZvfb0XvUMh_bxyvCwGuK58TG0zrlNkb5P_CZP0z-EBKDHCCjmK9xlFfu_8iLcwl_U4eWNm3j5tD1QnuM6aS5-da9ED_qBU3GrVO3FJXpv__SNjUR2AIOsHl-kg4BO4POHw',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAH6oG2U9ROrhCVsbcTgVSAmYYGrBMwajUhINeUadnlpbHhp60MNCzHv2HhhHopu-e3VWjbbUbEM1KI6urj__JoleJDYiiigJ0p498aNV4gE7slw4LeEJgLZvfb0XvUMh_bxyvCwGuK58TG0zrlNkb5P_CZP0z-EBKDHCCjmK9xlFfu_8iLcwl_U4eWNm3j5tD1QnuM6aS5-da9ED_qBU3GrVO3FJXpv__SNjUR2AIOsHl-kg4BO4POHw',
    ],
    colors: [{ name: 'Royal Blue', hex: '#1e40af' }],
    sizes: [
      { size: 'S', stock: 5, available: true },
      { size: 'M', stock: 8, available: true },
      { size: 'L', stock: 4, available: true },
    ],
    fabric: 'Chiffon & Silk',
    weaveType: 'Jacquard',
    ornamentation: 'Authentic Mirror Work',
    washCare: 'Dry Clean Only',
    description:
      'Indian model in rich royal blue mirror work festive kurti with matching chiffon dupatta against palace archway.',
  },
  // Steal deals items:
  {
    id: 'siri-handcraft-slub',
    name: 'Cotton Slub Kurta',
    brand: 'SIRI HANDCRAFT',
    category: 'Kurtas & Tunics',
    price: 499,
    originalPrice: 1699,
    discountPercentage: 70,
    rating: 4.4,
    ratingCount: '980',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDJQlk4ut5KWEqKLU59q3jmd-6IhB-nXPjmJYtPAmkFP7g81KqKU7eoAR_xzQY1703IWeLzdqs7o2_x5UmY5eq9DMNyZ4JqdDbDUtCd1HSpi71ms2nUU9XUtlg8T8F8fVkVxrVj8UoekDcV7jYERSqBSlVx2Y_jrLBNJLbEa5y6efWrBoEN7e45hCOriYdLd4-fmSpMEByRo2zjVrE0lvadwjPrFiyvn1m4Xhw3FGAl04PhYqGySgRVEA',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDJQlk4ut5KWEqKLU59q3jmd-6IhB-nXPjmJYtPAmkFP7g81KqKU7eoAR_xzQY1703IWeLzdqs7o2_x5UmY5eq9DMNyZ4JqdDbDUtCd1HSpi71ms2nUU9XUtlg8T8F8fVkVxrVj8UoekDcV7jYERSqBSlVx2Y_jrLBNJLbEa5y6efWrBoEN7e45hCOriYdLd4-fmSpMEByRo2zjVrE0lvadwjPrFiyvn1m4Xhw3FGAl04PhYqGySgRVEA',
    ],
    colors: [{ name: 'Blush Pink', hex: '#f472b6' }],
    sizes: [
      { size: 'S', stock: 10, available: true },
      { size: 'M', stock: 15, available: true },
      { size: 'L', stock: 8, available: true },
    ],
    fabric: 'Pure Cotton Slub',
    weaveType: 'Slub Weave',
    ornamentation: 'Wooden Buttons & Thread Details',
    washCare: 'Hand Wash Normal',
    description:
      'Elegantly draped blush pink cotton anarkali kurti on an Indian female model indoors with warm shadows.',
  },
  {
    id: 'sangria-festive-printed',
    name: 'Printed Straight Kurta',
    brand: 'SANGRIA FESTIVE',
    category: 'Kurtas & Tunics',
    price: 549,
    originalPrice: 1999,
    discountPercentage: 72,
    rating: 4.3,
    ratingCount: '710',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCoxxA7lWajvYqtqsdk3l1UuXTtXwDFCgI5WZ1cm6J3SKCD6FsophUvJD8pVmrP9AV1sNBpv0ooqgXwp_y64IMlKGtN-iu_haXJTJxFyZ1seGRL2otZY625iNtPvoFFnh_UAqHAJZkfwMkFIzursfuF9vHXDQ3LYsKDmLaO4za39EwFbjwkpweEeKvE9By5P3EprQp3PbKBP6DP04WZG7NdWTMbnQ7eWxcLIEp3gcceZRDcHDz_-eSp7Q',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCoxxA7lWajvYqtqsdk3l1UuXTtXwDFCgI5WZ1cm6J3SKCD6FsophUvJD8pVmrP9AV1sNBpv0ooqgXwp_y64IMlKGtN-iu_haXJTJxFyZ1seGRL2otZY625iNtPvoFFnh_UAqHAJZkfwMkFIzursfuF9vHXDQ3LYsKDmLaO4za39EwFbjwkpweEeKvE9By5P3EprQp3PbKBP6DP04WZG7NdWTMbnQ7eWxcLIEp3gcceZRDcHDz_-eSp7Q',
    ],
    colors: [{ name: 'Mustard Yellow', hex: '#eab308' }],
    sizes: [
      { size: 'S', stock: 12, available: true },
      { size: 'M', stock: 14, available: true },
      { size: 'L', stock: 7, available: true },
    ],
    fabric: 'Viscose Rayon',
    weaveType: 'Straight Cut',
    ornamentation: 'Geometric Block Print',
    washCare: 'Machine Wash Cold',
    description:
      'Modern geometric printed yellow and ivory festive straight kurta set styled with cropped pants.',
  },
  {
    id: 'aurelia-trend-coord',
    name: 'Festive Co-ord Set',
    brand: 'AURELIA TREND',
    category: 'Fusion Dresses',
    price: 699,
    originalPrice: 2199,
    discountPercentage: 68,
    rating: 4.5,
    ratingCount: '1.4k',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAN3xaqm71IIhJPBmk6zEX76VypZ5xOOqtc47540OctXkhaGWxc-EukgsVh-B6moH07cgCjKK-fhDwAyBYSadfz2Rp8KaaKjzeCDU8WO-4RfvfHIiVoD1DFp_Qhs3bHdKmDgMPD8sr0JWzdw14aAky--kH7ExmG1iN8elu1g1qs3sNNMNnqa72G8Y8tdXTDqy8VAOaCMOxJ2ttzviItI8zoahCFT-txoJyzuE9ZyFlYwkOY7ESvcXss8g',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAN3xaqm71IIhJPBmk6zEX76VypZ5xOOqtc47540OctXkhaGWxc-EukgsVh-B6moH07cgCjKK-fhDwAyBYSadfz2Rp8KaaKjzeCDU8WO-4RfvfHIiVoD1DFp_Qhs3bHdKmDgMPD8sr0JWzdw14aAky--kH7ExmG1iN8elu1g1qs3sNNMNnqa72G8Y8tdXTDqy8VAOaCMOxJ2ttzviItI8zoahCFT-txoJyzuE9ZyFlYwkOY7ESvcXss8g',
    ],
    colors: [{ name: 'Sage Green', hex: '#86efac' }],
    sizes: [
      { size: 'S', stock: 8, available: true },
      { size: 'M', stock: 12, available: true },
      { size: 'L', stock: 5, available: true },
    ],
    fabric: 'Modal Cotton Blend',
    weaveType: 'Peplum Top & Flared Pants',
    ornamentation: 'Subtle Gota Work',
    washCare: 'Hand Wash',
    description:
      'Chic sage green festive co-ord set with peplum top and flared trousers in soft cinematic daylight studio.',
  },
  {
    id: 'house-of-pataudi-mojaris',
    name: 'Velvet Zardozi Mojaris',
    brand: 'HOUSE OF PATAUDI',
    category: 'Footwear',
    price: 599,
    originalPrice: 2399,
    discountPercentage: 75,
    rating: 4.6,
    ratingCount: '890',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBN9JEWhLxnrvPC3Pyb96Xx84OwUoHLvEQdj7rwrJAcC7GgybKM7amSF1LtS7xtASqpoXn9EZNTr3ym6qyjy_R8dwxr4kKdg2RghJuJp1eQ0L-dWu-miEbUyyZBwzYWygUONDlaEAgPbly8GY-1QsTkZJ5S6hKTGBH0jYpqCCP4JAv41PZF3J8EaxTuxN9SPsSyePMTIGhuy_232HoizDZoAWttdIksSX6gB6KBW1ucpOpoMkcnmpWwrw',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBN9JEWhLxnrvPC3Pyb96Xx84OwUoHLvEQdj7rwrJAcC7GgybKM7amSF1LtS7xtASqpoXn9EZNTr3ym6qyjy_R8dwxr4kKdg2RghJuJp1eQ0L-dWu-miEbUyyZBwzYWygUONDlaEAgPbly8GY-1QsTkZJ5S6hKTGBH0jYpqCCP4JAv41PZF3J8EaxTuxN9SPsSyePMTIGhuy_232HoizDZoAWttdIksSX6gB6KBW1ucpOpoMkcnmpWwrw',
    ],
    colors: [{ name: 'Royal Maroon', hex: '#881337' }],
    sizes: [
      { size: '5', stock: 4, available: true },
      { size: '6', stock: 8, available: true },
      { size: '7', stock: 12, available: true },
      { size: '8', stock: 6, available: true },
    ],
    fabric: 'Velvet Upper with Leather Sole',
    weaveType: 'Handcrafted',
    ornamentation: 'Zardozi Golden Embroidery',
    washCare: 'Wipe with Dry Cloth',
    description:
      'Maroon hand-embroidered velvet ethnic slip on mojaris with subtle gold zardozi detailing.',
  },
];

export const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    name: 'Priya Sharma',
    pincode: '560034',
    addressLine: '#42, 4th Cross, Koramangala 5th Block',
    city: 'Bengaluru',
    state: 'Karnataka',
    phone: '+91 98765 43210',
    isDefault: true,
  },
  {
    id: 'addr-2',
    name: 'Priya Sharma (Office)',
    pincode: '560103',
    addressLine: 'Tech Park, Tower B, Outer Ring Road, Bellandur',
    city: 'Bengaluru',
    state: 'Karnataka',
    phone: '+91 98765 43210',
    isDefault: false,
  },
];

export const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'FESTIVE300',
    discountAmount: 300,
    minSpend: 1999,
    description: 'Extra ₹300 off on festive collection',
  },
  {
    code: 'SIRI200',
    discountAmount: 200,
    minSpend: 1499,
    description: 'Grand Festive Sale special discount',
  },
  {
    code: 'FIRST200',
    discountAmount: 200,
    minSpend: 999,
    description: 'Flat ₹200 OFF on your 1st order',
  },
  {
    code: 'FREE49',
    discountAmount: 49,
    minSpend: 499,
    description: 'Free Express delivery waiver',
  },
];
