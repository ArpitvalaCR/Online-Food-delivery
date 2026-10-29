import React, { useState, useEffect } from 'react';
import CategoryNav from '../components/menu/CategoryNav';
import DishCard from '../components/menu/DishCard';
import OffersBento from '../components/menu/OffersBento';
import CustomizerModal from '../components/menu/CustomizerModal';
import LiveTrackingSection from '../components/tracking/LiveTrackingSection';
import { dishService } from '../services/dishService';

export default function Home({ searchQuery, customizerDish, setCustomizerDish, activeOrder }) {
  const [dishes, setDishes] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const loadDishes = async () => {
    setLoading(true);
    try {
      const res = await dishService.getDishes();
      if (res.success && res.dishes) {
        setDishes(res.dishes);
      }
    } catch (err) {
      console.error('Error loading dishes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDishes();
  }, []);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Location services are not supported by your browser. Please enter your address manually.');
      return;
    }
    setDeliveryAddress('Detecting your location...');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          if (data && data.display_name) {
            const shortAddr = [
              data.address?.road || data.address?.suburb,
              data.address?.city || data.address?.town || data.address?.county
            ].filter(Boolean).join(', ');
            setDeliveryAddress(shortAddr || data.display_name.split(',').slice(0, 2).join(', '));
          } else {
            setDeliveryAddress(`Pin: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          }
        } catch (e) {
          setDeliveryAddress(`Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`);
        }
      },
      (err) => {
        setDeliveryAddress('');
        if (err.code === 1) {
          alert('Location permission was denied. Please type your delivery address manually.');
        } else {
          alert('Unable to retrieve your location. Please type your delivery address manually.');
        }
      },
      { timeout: 8000 }
    );
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter dishes by category and search
  const filteredDishes = dishes.filter((d) => {
    const matchesCat = activeCategory === 'All' || d.category.toLowerCase() === activeCategory.toLowerCase();
    const q = searchQuery ? searchQuery.toLowerCase().trim() : '';
    const matchesQuery = !q || d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q) || d.category.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <main className="w-full pt-20 sm:pt-24 bg-[#FDFBF7] min-h-screen">

      {/* HERO SECTION */}
      <section className="relative w-full pt-4 pb-14 overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Hero Column */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6ECE4] border border-[#E8D6CA] w-fit">
                <span className="text-[#3E7B4C] font-bold text-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#3E7B4C]"></span> 100% PURE VEGETARIAN
                </span>
                <span className="text-[#B5A59B] text-xs">•</span>
                <span className="text-[#964627] font-bold text-xs uppercase tracking-wider">Authentic Royal Kitchen</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#1F1916] tracking-tight leading-[1.14]">
                Ghar Jaisa Swad, <br />
                Pahunchaye <span className="text-[#9A1B2F] font-royal italic font-normal">Padmavati</span> <br />
                <span className="text-[#9A1B2F] font-royal italic font-normal">Bhojnalaya</span>
              </h1>

              <p className="text-base sm:text-lg text-[#6E625D] max-w-xl font-normal leading-relaxed">
                Prepared with pure Gir cow desi ghee, hand-ground masalas, and mother’s affection. Relish authentic royal thalis, slow-cooked dal makhani, and sizzling tandoori rotis steaming hot in 30 minutes.
              </p>

              {/* Address Search Bar */}
              <div className="bg-white p-2 rounded-2xl sm:rounded-full shadow-sm border border-[#E6DCD2] flex flex-col sm:flex-row items-center gap-2 max-w-xl">
                <div className="flex items-center gap-2 flex-1 w-full px-3 py-1.5">
                  <span className="material-symbols-outlined text-[#D9531E] text-[24px]">location_on</span>
                  <input
                    className="w-full bg-transparent text-sm text-[#1F1916] placeholder:text-[#8E7F78] focus:outline-none"
                    placeholder="Enter your delivery address or area..."
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                  />
                  <button
                    className="p-1.5 rounded-lg hover:bg-[#F7EFE1] text-[#D9531E] flex items-center gap-1 text-xs font-bold cursor-pointer"
                    onClick={handleDetectLocation}
                    title="Detect Current Location"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[18px]">my_location</span>
                    <span className="hidden md:inline">Locate</span>
                  </button>
                </div>
                <button
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#9A1B2F] hover:bg-[#821425] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  onClick={scrollToMenu}
                >
                  <span>Order Now</span>
                  <span className="material-symbols-outlined text-[18px]">restaurant_menu</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs font-semibold text-[#6E625D]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#D9531E] text-[18px]">verified</span>
                  <span>100% Desi Ghee</span>
                </div>
                <span className="text-[#8E7F78]/40">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#D9531E] text-[18px]">local_fire_department</span>
                  <span>Kadhai Fresh in 30 Mins</span>
                </div>
                <span className="text-[#8E7F78]/40">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#D9531E] text-[18px]">star</span>
                  <span className="text-[#1F1916] font-bold">4.9 / 5</span>
                  <span>(24,000+ Parivaars)</span>
                </div>
              </div>
            </div>

            {/* Right Hero Spotlight Card (Maharaja Thali) */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-white p-3 rounded-[32px] shadow-xl border border-[#F0E6DE] overflow-hidden">
                <div className="relative h-[440px] rounded-[24px] overflow-hidden group">
                  <img
                    alt="Authentic Maharaja Special Indian Thali"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuASD6TawcK-uwUN0LrS728UUUas_goEKbpm_nn9pAh3SsudJ6OCtQ2wtfDr03QpnzxXbxxmJ3Yr_XpfBXzJGj32kZSuQr1dwc-q8EIrqh8Sx6YWYya59DtXXbnq98uVfiTjWPIrjTTe_YSIVSk5BMk8yw86Yary7NLc2PXCB0snOBCEnJh5OhexvYO3BAn6EQpE5FSMGyNlbHkANvjEVl5LIcjVs__Di8Oq0g3Ht175"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm flex items-center gap-2 border border-[#E8D9CD]">
                    <span className="veg-badge"></span>
                    <span className="text-xs font-bold text-[#1F1916]">Royal Kitchen Special</span>
                  </div>

                  <div className="absolute top-4 right-4 bg-[#9A1B2F] text-white font-bold text-xs px-3.5 py-1.5 rounded-full shadow-md">
                    FLAT ₹75 OFF on First Thali
                  </div>

                  {/* Bottom Dish Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#F0E6DE] flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-[#1F1916]">Maharaja Special Thali</h3>
                        <span className="text-xs bg-[#FDE8E0] text-[#D9531E] font-bold px-2 py-0.5 rounded">Chef's Pride</span>
                      </div>
                      <p className="text-xs text-[#6E625D] mt-0.5">Paneer Lababdar, Dal Makhani, 4 Butter Rotis, Rice &amp; Sweet</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-lg font-extrabold text-[#9A1B2F]">₹280</span>
                        <span className="text-xs line-through text-[#8E7F78]">₹350</span>
                      </div>
                    </div>
                    <button
                      className="px-4 py-2.5 bg-[#9A1B2F] hover:bg-[#821425] text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md transition-transform active:scale-95 cursor-pointer"
                      onClick={() => {
                        const maharaja = dishes.find((d) => d.id === 'dish-1') || {
                          id: 'dish-1',
                          name: 'Maharaja Special Thali',
                          price: 280,
                          category: 'Royal Thalis',
                          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASD6TawcK-uwUN0LrS728UUUas_goEKbpm_nn9pAh3SsudJ6OCtQ2wtfDr03QpnzxXbxxmJ3Yr_XpfBXzJGj32kZSuQr1dwc-q8EIrqh8Sx6YWYya59DtXXbnq98uVfiTjWPIrjTTe_YSIVSk5BMk8yw86Yary7NLc2PXCB0snOBCEnJh5OhexvYO3BAn6EQpE5FSMGyNlbHkANvjEVl5LIcjVs__Di8Oq0g3Ht175',
                          description: 'Paneer Lababdar, Dal Makhani, 4 Butter Tawa Rotis, Jeera Basmati Rice, Gulab Jamun, Roasted Papad, Pickle & Fresh Salad.'
                        };
                        setCustomizerDish(maharaja);
                      }}
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                      <span>Add Thali</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CATEGORIES BAR */}
      <CategoryNav activeCategory={activeCategory} onSelectCategory={setActiveCategory} />

      {/* OFFERS BENTO GRID */}
      <OffersBento />

      {/* AUTHENTIC DELICACIES MENU */}
      <section className="w-full py-14 bg-[#FAF7F2] border-t border-[#EADBCE]" id="menu-section">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-[#D9531E] uppercase tracking-wider">Traditional Specialties</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F1916]">Popular Authentic Dishes</h2>
              <p className="text-xs sm:text-sm text-[#6E625D] mt-1">Cooked with love in brass &amp; earthen kadhais using generational recipes.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#1C6B38] bg-[#D3F5DD] px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#1C6B38]"></span> 100% Shuddh Shakahari Certified
              </span>
            </div>
          </div>

          {/* Dishes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.length === 0 ? (
              <div className="col-span-full text-center py-12 text-on-surface-variant">
                <span className="material-symbols-outlined text-[48px] text-outline">search_off</span>
                <h4 className="font-bold text-base mt-2">No authentic dishes found</h4>
                <p className="text-xs">Try selecting another category or clear your search.</p>
              </div>
            ) : (
              filteredDishes.map((dish) => (
                <DishCard
                  key={dish.id || dish._id}
                  dish={dish}
                  onCustomize={(d) => setCustomizerDish(d)}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* LIVE TRACKING MAP SECTION */}
      <LiveTrackingSection activeOrder={activeOrder} />

      {/* THE PADMAVATI PROMISE (HERITAGE PILLARS) */}
      <section className="w-full py-16 bg-surface-container border-t border-outline-variant/50" id="promise-section">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">Generational Tradition</span>
            <h2 className="text-3xl font-extrabold text-on-surface mt-1">Our Culinary Heritage Promise</h2>
            <p className="text-sm text-on-surface-variant mt-2">Every bite honors the sacred tradition of Indian hospitality ("Atithi Devo Bhava" - Guest is God). Pure, authentic, and crafted without compromises.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-surface-bright border border-outline-variant/60 shadow-sm flex flex-col gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">oil_barrel</span>
              </div>
              <h3 className="font-bold text-base text-on-surface">100% Gir Cow Desi Ghee</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">We strictly use pure A2 bilona desi ghee in our dals, rotis, and gravies. Zero palm oil or vanaspati ever enters our kitchen.</p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-bright border border-outline-variant/60 shadow-sm flex flex-col gap-3">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">soup_kitchen</span>
              </div>
              <h3 className="font-bold text-base text-on-surface">Stone-Pounded Masalas</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">Whole spices ground daily in traditional sil-batta and stone mills preserve volatile essential oils and unmistakable authentic aroma.</p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-bright border border-outline-variant/60 shadow-sm flex flex-col gap-3">
              <div className="w-12 h-12 rounded-2xl bg-tertiary/10 text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">eco</span>
              </div>
              <h3 className="font-bold text-base text-on-surface">Zero Soda, MSG, or Colors</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">No artificial preservatives, baking soda, chemical tenderizers, or food colors. Light on the stomach and nourishing for all ages.</p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-bright border border-outline-variant/60 shadow-sm flex flex-col gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#6b4900]/10 text-[#6b4900] flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">takeout_dining</span>
              </div>
              <h3 className="font-bold text-base text-on-surface">Thermal Insulated Packaging</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">Delivered in eco-friendly, food-grade spill-proof earthen compartments and insulated thermal jackets that retain tandoori heat.</p>
            </div>
          </div>
        </div>
      </section>

      {/* DISH CUSTOMIZATION MODAL */}
      <CustomizerModal dish={customizerDish} onClose={() => setCustomizerDish(null)} />

    </main>
  );
}
