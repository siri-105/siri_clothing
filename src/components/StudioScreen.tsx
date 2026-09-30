import React from 'react';
import { useApp } from '../context/AppContext';
import { ALL_PRODUCTS } from '../data/mockData';
import { generateInfiniteProducts } from '../utils/productGenerator';

export const StudioScreen: React.FC = () => {
  const { setSelectedProduct, setCurrentScreen } = useApp();

  const extraPool = generateInfiniteProducts(3, 10);

  const stories = [
    {
      id: 'look-1',
      title: 'Royal Chanderi Resham Edit',
      creator: 'Siri Styling Studio',
      likes: '4.8k',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBC4bYmeBxw7WocUoZiX4H8IwQinxeAIDECiGiYZ6w_DYMDVNSztb93_OLhGeS_pGzwT--k_9wHri0g0uQHbzMyMzAbNmr6ed989fSyS27e4xGTV_fgQ0WAQL5Xw_HcpV6j_M96BvldOk1kESgAv33TaoPKmIjXkTBWHlVH972-tCT8Y5htRLLVWAgxlbbs7MPuJAMr_GDsn_Dq9gE30zww3OsD3JthP_CkaIkSMiQRx4QLeqyu1J1-zw',
      product: ALL_PRODUCTS[0],
      tag: 'Trending Festivities',
    },
    {
      id: 'look-2',
      title: 'Minimalist Peach Foil Drapes',
      creator: 'Aura Curation',
      likes: '3.2k',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuChV7dJN_QZ58ek6h8lGmugEEhmA7aFbMBdbg1mIppnWzw8xmtPFh0ooq1qO4jwQArYhvDZOUKVwqFeUMKJuNiF7vP0VTvATJkjnjkIXWNK1Molg06L-aHbMW_9p_CXflUdXEQHHMiuSdAWfmOFAmcGnKoRPBFa6sjwOSa6j1t8KxcBzWLMonxJDhgcCbrtWbPV2u3f1CJHqm0gZ9DyP4Acs9rDgRewDnJW8B0Omcz6G16UJXwkiUCg2w',
      product: ALL_PRODUCTS[1],
      tag: 'Daywear Grace',
    },
    {
      id: 'look-3',
      title: 'Emerald Silk Anarkali Splendour',
      creator: 'Heritage Weaves',
      likes: '6.1k',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDiuOs_OphuVezM5xE-XiEbpkZwqCIbtXaGLVZVh90qHhof29_R2idRXHWdAColqpo1s3t10u-vyPkreBJ67Fsc-PlFtR1pUzi7L7ZkgLG6UwVUtYgO9ElMRvdb76mBeLBUYzYaepbqnPyygnvtjAuEfzozDUMaGcSdDLhskgWlarvzCBBQSfI7WTV-wfwl7OsB_WqvDB1y0NzILzsSGGcoDLFdhv0pXKdyc4s-rnyUtbWdHOuXIbD6HA',
      product: ALL_PRODUCTS[6] || ALL_PRODUCTS[0],
      tag: 'Wedding Season',
    },
    {
      id: 'look-4',
      title: 'Regal Velvet Dusk Poetry',
      creator: 'Royal Heritage Edit',
      likes: '5.4k',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAP8evGxUnjr979ZlqdCOWUNTv83548phnPw6yamcP8p-RGBtTrgI0X7PIdUGBw3Q1gALOfXMasFyEdb7Gl6INDAnTPWmrFVeWKeXdXcYv-980MdEhjCmR-x_JJPZzLeeqRQ2HRBs2NTRQnizfc1tW_22iuHjhuflrkq6TOqVuxl5M_0DsQETGxd3nKZJFvIhcxGS4uZdZXMj_jOhhNrS5Wnom32DXeLEzEsA8z1UtlU73cOFRUrNec1Q',
      product: ALL_PRODUCTS[4] || ALL_PRODUCTS[0],
      tag: 'Winter Soirée',
    },
    {
      id: 'look-5',
      title: 'Pastel Organza Summer Whisper',
      creator: 'Summer Luxe',
      likes: '3.9k',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuByJv2jwNq3kplU7_0hj-km_Poq1c3eX6d3mhLMH-cSX3ltVEgLSzCnQdtM78ks40kmhFBHPT3G8YVKpn5pAebHdhsur34OOnUPLFgI6stY35e4PuMD_XXUYoqytRrx5YaHGm-iATuPAwiJtfbFpaH7qCheSKMMyreZb6b2S0NbjwP2eY48nPL6QStBWM8eAKNx6HF4IPP9MRE7aE1QNW6QrdWf3neOwch-PnucwVepCRUkvd_V3tdTXA',
      product: ALL_PRODUCTS[5] || ALL_PRODUCTS[0],
      tag: 'Cocktail Fest',
    },
    {
      id: 'look-6',
      title: 'Bohemian Sunshine Maxi Edit',
      creator: 'Dressberry Studio',
      likes: '4.2k',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBRj7VHBui3uViy5YeWDY9DOr7ck6JOGUuLYnuYMsby6r0Kpv9odt1YOzh9UwczGjZAqpY47QEhQidowobf_F2F5dGzwHjTj5bS_48T9Hfkl1cxJc4ZQetVwf7vcbKCmUXSEkh2EZnTJKqDKwWQ3ASaYZquTImixLl95Da61Jn39ukuBN5u4xQ1Pcs2LYVltcY76B_nOxdCpoi3nUN0QuOwAkEXfKeP9Y4O0LHAcv8b3_Ikezhw5IQJrA',
      product: extraPool[0] || ALL_PRODUCTS[2],
      tag: 'Resort Glam',
    },
  ];

  return (
    <div className="w-full pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-slate-200 mb-6 gap-2">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-pink-600 text-[26px]">
            local_fire_department
          </span>
          <div>
            <h1 className="font-headline-sm text-xl sm:text-2xl text-slate-900 font-bold">
              Siri Studio
            </h1>
            <p className="text-xs text-slate-500">
              Celebrity style inspo, festive drape tutorials &amp; runway looks
            </p>
          </div>
        </div>
        <span className="text-xs bg-pink-100 text-pink-800 px-3 py-1 rounded-full font-bold uppercase self-start sm:self-auto">
          Updated Daily
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl border border-slate-200/80 transition-all duration-300"
          >
            <div className="relative aspect-[3/4] w-full bg-slate-100">
              <img
                alt={story.title}
                className="w-full h-full object-cover"
                src={story.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-bold shadow-sm">
                {story.tag}
              </div>

              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-semibold">
                <span className="material-symbols-outlined text-[16px] text-pink-500">
                  favorite
                </span>
                <span>{story.likes}</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-xs text-slate-300">{story.creator}</p>
                <h3 className="font-headline-sm text-lg font-bold leading-tight mt-0.5">
                  {story.title}
                </h3>

                {/* Tagged Product pill */}
                <div
                  className="mt-3 bg-white/95 backdrop-blur-md text-slate-900 rounded-xl p-3 flex items-center justify-between cursor-pointer active:scale-98 transition-all hover:bg-white shadow-md"
                  onClick={() => {
                    setSelectedProduct(story.product);
                    setCurrentScreen('pdp');
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      alt={story.product.name}
                      className="w-11 h-12 rounded-lg object-cover"
                      src={story.product.image}
                    />
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold truncate max-w-[150px] sm:max-w-[180px]">
                        {story.product.name}
                      </span>
                      <span className="text-xs text-pink-600 font-extrabold">
                        ₹{story.product.price.toLocaleString('en-IN')}{' '}
                        <span className="text-[10px] text-emerald-600 font-bold">
                          ({story.product.discountPercentage}% OFF)
                        </span>
                      </span>
                    </div>
                  </div>
                  <button className="px-3.5 py-1.5 rounded-lg bg-pink-600 text-white text-xs font-bold uppercase shadow-xs hover:bg-pink-700 transition-colors">
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
