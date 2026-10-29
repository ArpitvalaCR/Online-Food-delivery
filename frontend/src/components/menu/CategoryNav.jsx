import React, { useRef } from 'react';

const CATEGORIES = [
  {
    name: 'All',
    label: 'All Dishes',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASD6TawcK-uwUN0LrS728UUUas_goEKbpm_nn9pAh3SsudJ6OCtQ2wtfDr03QpnzxXbxxmJ3Yr_XpfBXzJGj32kZSuQr1dwc-q8EIrqh8Sx6YWYya59DtXXbnq98uVfiTjWPIrjTTe_YSIVSk5BMk8yw86Yary7NLc2PXCB0snOBCEnJh5OhexvYO3BAn6EQpE5FSMGyNlbHkANvjEVl5LIcjVs__Di8Oq0g3Ht175'
  },
  {
    name: 'Royal Thalis',
    label: 'Royal Thalis',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-Lyfn7uAdJC5gm6PkqXmNYYxBcVb0r7vIn8fpe9Kmnd-ZmJs-EGchBAv3GMRAhG1KzP9F0FlP-pdSGStlpoNH1iHclxOMMaEiwJi8v9UU_FseGCan5g9zf_1ghPNVPlIQK9LW69oWR39nPq2OGcJkYjmGv-XeX1owuBLCAFq26LGSbpR2LCFzg6G_RMtqXaI3HMVwcRIVP0dCZIqxsCSWk4-b5awy2Ju1Thjc5M0-'
  },
  {
    name: 'Dal & Gravies',
    label: 'Dal & Gravies',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCeFFt5uOsasjc5HYqQJgSQhNc3mtlMYtllma5_SJhEGQj6D--a3E51wRGSmb50N50M6x2Z8vPDj7A0OjtR-V1mkwEhE_F0T1l2CzpDfNAvgLQhqOrmlBvQsKIve1IlocqudY5dem-rYKyj6CYkTKPD3v4VvbHaJc_fRL6sqauNfZc62dkPv4pxqFJMi6LVFRs9mL4uSLGCX-mwyJn398zXTjIjMaWbGhA0-OTyeuJQ'
  },
  {
    name: 'Paneer Delights',
    label: 'Paneer Delights',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBw06LuivcwKRMAy1pv0hqGOwVI8Bb3flwxZvfMmLw8KAV_G_T4A0geOl_9PnUImJxChwiiofy3e4qBPDbtauafQqJq49hbLya8mLmLO10ZY5a-KtnOapDmGmAHE71QZgIWoEvLErzbCsL89R-Pj3jskgHeNAxLla8KT6Oh4rs2h1Md-o8K3kNrzpkWOZgc3-r-I5YSF3_HuJ0c8oTBlzDUhPTeJoK9OnwHAnGgboKF'
  },
  {
    name: 'Tandoori & Breads',
    label: 'Tandoori Rotis',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFtLhPFA9oewmqof5iaQc4VQny2XUDFLyTyQ3wHhGszdE1J8cGyJ6RgEgEbf79ULakE6oRUonEaF7wxRoB18QfHN4Znt9TaIdFDl_K9YjjLDa5mbLpSFy6WxtlfCZALhIys685CuYLWvXCcRcDuAcvnbufKeMprqOXQohE896oCnlG_3H3Nkp7JbzDLbfTODAIsUx_SwNGcUbk098MTO7D9ZqugsIbWDWnA6cBx_W1'
  },
  {
    name: 'Dum Biryani',
    label: 'Dum Biryani',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4OCjTP9Z9sLqmSjUcmD-qykzhl7q5eLTr6gSM5fUMcUH5Mh41Oyz7itW0yqyT9vpm052vjsOBcK_fawvjUkhM8uB7kWqEwmNlab3pMXQk7Np3iWcw4GuhcGeGVDUV-Mkytg6TjVf9PRY92U0Oq9rTWepHBA4FwloBu2LLYbjCTEjtX5sazksR1izV_fXH-n3GZAPOoKjUubBdTkmlThZW_7crob2qSYpS2lVKCkz2'
  },
  {
    name: 'Desserts & Mithai',
    label: 'Desi Mithai',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKVdPDro8q5M1zpyh6J0cyPYoMC9zY0_S6NMAvH4ggvFNs3FawJgtlacztsMWuqoGYFmHZvNkdWtVaFvFxh0p6DPKPqkRX82CaJIunxU7axpIMO7PlAKcZQ9NybGVWBb1tYH1AwYdLfs1G-X1APjeVQMJKx48369VH0zokYgadS1zwvFdFdoNJxLHV1n2aC_hcMG6qlt7vKGgxSU9Zi5v6--DgNxlrKseXmD_naYCn'
  },
  {
    name: 'Beverages & Chaas',
    label: 'Masala Chaas',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApuEjj5uUa94MqaJIjOinzgSemFIj7RwXY4qakedwtGk4RmILoBX0sG5mu7IMSUxpa7Y8PqaVuTey6Hntp-NSqU53YohQ3Bs126k-VMjtdf4EkIZEFZ3haCU-VWP9IgvjPYG98Nr-Z3XHi_SRVPKgBxlH3bPX-UMApez8axYNlAANhZdYnNksAlLWNQyg1jfMKUoRbu5rlCXlD5Eh7Tzp_RgyD3ZVhKQ6zkw5ocG_1'
  },
  {
    name: 'Snacks',
    label: 'Snacks',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS8PjVSoYyQgJ3kT5jYQCbAZHECq3a0NrpS4sO_bGbQ6x1VoBQBM50Wy6_9wdAhTLmfUNvR--ctgEu0cILG_301OOvxUpKaEBjRlpb_OPssjeZ84Q4aY0VEsgWoel00jTlu6tQhP6-ipKIXBssNMpRVRkIkLlI8iJq_lwlhUZxXs5Usrxsp2bkybRKUEydSN9xMSUrw038fXHllxDZZsuAAQJSHT5jvMqaWa8N4NNXnyJZlE36EHkw4A'
  }
];

export default function CategoryNav({ activeCategory, onSelectCategory }) {
  const scrollRef = useRef(null);

  const scroll = (delta) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: delta, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-10 bg-[#FAF7F2] border-y border-[#EADBCE]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-bold text-[#D9531E] uppercase tracking-wider">Traditional Categories</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F1916]">Browse by Authentic Category</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="w-9 h-9 rounded-full bg-white hover:bg-[#F7EFE1] border border-[#E0D5CC] text-[#1F1916] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
              onClick={() => scroll(-300)}
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <button
              className="w-9 h-9 rounded-full bg-white hover:bg-[#F7EFE1] border border-[#E0D5CC] text-[#1F1916] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
              onClick={() => scroll(300)}
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Categories Horizontal Carousel */}
        <div ref={scrollRef} className="flex items-center gap-4 overflow-x-auto pb-2 scroll-smooth no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                className={`flex-none flex flex-col items-center gap-2.5 p-3.5 rounded-3xl bg-white w-[118px] sm:w-[124px] text-center transition-all cursor-pointer shadow-xs ${
                  isActive
                    ? 'border-2 border-[#9A1B2F] shadow-sm'
                    : 'border border-[#EADBCE] hover:border-[#D9531E]'
                }`}
                onClick={() => onSelectCategory(cat.name)}
              >
                <div className="w-[74px] h-[74px] rounded-full overflow-hidden p-0.5 border border-[#F0E6DE] bg-[#FAF7F2]">
                  <img
                    alt={cat.label}
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform"
                    src={cat.img}
                  />
                </div>
                <span className={`text-xs font-bold leading-tight ${isActive ? 'text-[#9A1B2F]' : 'text-[#2B231F]'}`}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
