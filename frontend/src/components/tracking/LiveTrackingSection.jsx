import React, { useState, useEffect } from 'react';
import LeafletTrackingMap from './LeafletTrackingMap';
import { orderService } from '../../services/orderService';

export default function LiveTrackingSection({ activeOrder }) {
  const [stage, setStage] = useState(activeOrder?.trackingStage || 3);
  const [orderData, setOrderData] = useState(activeOrder);

  useEffect(() => {
    if (activeOrder) {
      setOrderData(activeOrder);
      setStage(activeOrder.trackingStage || 3);
    }
  }, [activeOrder]);

  const handleStageChange = async (newStage) => {
    setStage(newStage);
    if (orderData?.orderId) {
      try {
        const res = await orderService.updateOrderStage(orderData.orderId, newStage);
        if (res.success && res.order) {
          setOrderData(res.order);
        }
      } catch (err) {
        console.warn('Could not sync stage with backend:', err);
      }
    }
  };

  const getEta = () => {
    if (stage === 1) return '28 mins';
    if (stage === 2) return '20 mins';
    if (stage === 3) return '14 mins';
    return 'Arrived!';
  };

  const orderId = orderData?.orderId || '#PB-84920';
  const itemCount = orderData?.items ? orderData.items.reduce((sum, i) => sum + i.qty, 0) : 2;

  return (
    <section className="w-full py-14 bg-[#FDFBF7] border-t border-[#EADBCE]" id="tracking-section">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D7F5DD] text-[#1C6B38] font-bold text-xs mb-2 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#1C6B38]"></span>
              <span>LIVE GPS FLEET SYSTEM (INTERACTIVE SIMULATION)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F1916]">Live Order Delivery Tracker</h2>
            <p className="text-xs sm:text-sm text-[#6E625D] mt-1">
              Directly tracking your freshly prepared meal from our central kitchen to your doorstep.
            </p>
          </div>

          {/* Simulated Stage Controller */}
          <div className="flex items-center gap-1.5 bg-[#EFE6DD] p-1.5 rounded-full border border-[#DFD3C6] shadow-xs">
            <span className="text-[11px] font-bold text-[#8E7F78] px-2.5">Simulate Stage:</span>
            {[1, 2, 3, 4].map((s) => {
              const labels = { 1: '1. Prep', 2: '2. Ready', 3: '3. On Route', 4: '4. Delivered' };
              const isSelected = stage === s;
              return (
                <button
                  key={s}
                  onClick={() => handleStageChange(s)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#821425] text-white shadow-xs'
                      : 'text-[#4A3F3A] hover:bg-white/60'
                  }`}
                >
                  {labels[s]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tracking Card with Map */}
        <div className="bg-white rounded-3xl border border-[#E0D5CC] shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">

          {/* Left Details */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#F0E6DE] bg-white">
            <div>
              {/* Order Info */}
              <div className="flex items-start justify-between pb-6 border-b border-[#F0E6DE]">
                <div>
                  <span className="text-xs uppercase font-bold text-[#8E7F78] tracking-wider">Active Order</span>
                  <h3 className="text-xl font-extrabold text-[#9A1B2F] font-mono tracking-tight mt-0.5">
                    {orderId}
                  </h3>
                  <span className="text-xs text-[#6E625D]">
                    {itemCount} {itemCount === 1 ? 'Dish' : 'Dishes'} • Authentic Rasoi
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#D9531E] uppercase tracking-wider">Estimated Arrival</span>
                  <div className="text-2xl font-black text-[#1F1916] flex items-center justify-end gap-1 mt-0.5">
                    <span>{getEta()}</span>
                  </div>
                  <span className="text-[11px] text-[#1C6B38] font-bold flex items-center justify-end gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1C6B38]"></span> On Schedule
                  </span>
                </div>
              </div>

              {/* 4 Stages Timeline */}
              <div className="py-6 border-b border-[#F0E6DE]">
                <span className="text-xs font-bold text-[#5E524D] uppercase tracking-wider block mb-4">
                  Rasoi to Ghar Progress
                </span>
                <div className="relative flex flex-col gap-4">

                  {/* Stage 1 */}
                  <div className={`flex items-center gap-3.5 ${stage < 1 ? 'opacity-40' : ''}`}>
                    <div className="w-8 h-8 rounded-full bg-[#1C6B38] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#1F1916]">Order Received &amp; Verified</h4>
                      <p className="text-[11px] text-[#8E7F78]">Kitchen ticket printed in Central Rasoi</p>
                    </div>
                  </div>

                  {/* Stage 2 */}
                  <div className={`flex items-center gap-3.5 ${stage < 2 ? 'opacity-40' : ''}`}>
                    <div className="w-8 h-8 rounded-full bg-[#1C6B38] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                      <span className="material-symbols-outlined text-[16px]">soup_kitchen</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#1F1916]">Preparing in Desi Ghee</h4>
                      <p className="text-[11px] text-[#8E7F78]">Kadhai simmering &amp; hot tawa rotis on flame</p>
                    </div>
                  </div>

                  {/* Stage 3 */}
                  <div className={`flex items-center gap-3.5 ${stage < 3 ? 'opacity-40' : ''}`}>
                    <div className="w-8 h-8 rounded-full bg-[#9A1B2F] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs ring-4 ring-[#9A1B2F]/20">
                      <span className="material-symbols-outlined text-[16px]">two_wheeler</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#9A1B2F]">Out for Delivery via Electric Bike</h4>
                      <p className="text-[11px] text-[#5E524D] font-medium">Ramesh is on route towards your delivery address</p>
                    </div>
                  </div>

                  {/* Stage 4 */}
                  <div className={`flex items-center gap-3.5 ${stage < 4 ? 'opacity-40' : ''}`}>
                    <div className="w-8 h-8 rounded-full bg-[#F0E6DE] text-[#8E7F78] flex items-center justify-center font-bold text-xs shrink-0">
                      <span className="material-symbols-outlined text-[16px]">home_pin</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#5E524D]">Delivered at Doorstep</h4>
                      <p className="text-[11px] text-[#8E7F78]">Tamper-proof insulated bag arrival</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Delivery Partner */}
              <div className="pt-6">
                <div className="p-4 rounded-2xl bg-[#FAF4ED] border border-[#EADBCE] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        alt="Rider"
                        className="w-12 h-12 rounded-full object-cover border-2 border-[#D9531E]"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCk8qi-Hy36THEu65hG2usaNnsLKv-o19sljZAVfHSYdtve7CeIUIPIsj061q_MafDeFTDSTgr3NzoGLeSi8kyVuAS3fOqxnaiPbaNNuP-H-apMI-4j624eXnVoPOT7L0CUfbciX3DHv0Olgvif57LTQBc0sqS-l7bzKc4ymvsi7kBSMLQj2SYTzP3wojnMKiyLzR4JhDcd9QraZRIb2nbGwlx0EMKKsVizr3C6q3mN"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#1C6B38] rounded-full border-2 border-white"></span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-sm text-[#1F1916]">Ramesh Kumar</h4>
                        <span className="text-[11px] bg-[#FDE8E0] text-[#D9531E] font-bold px-1.5 py-0.2 rounded">4.9 ★</span>
                      </div>
                      <p className="text-xs text-[#6E625D]">Hero Electric Bike (MH 12 PB 4920)</p>
                      <span className="text-[10px] text-[#1C6B38] font-bold">Vaccinated • Thermal Bag Checked</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      className="w-9 h-9 rounded-full bg-white hover:bg-[#F7EFE1] text-[#9A1B2F] border border-[#E0D5CC] flex items-center justify-center transition-all shadow-xs cursor-pointer"
                      onClick={() => alert('Calling delivery partner Ramesh Kumar (+91 98230 45678)...')}
                      title="Call Delivery Partner"
                    >
                      <span className="material-symbols-outlined text-[18px]">call</span>
                    </button>
                    <button
                      className="w-9 h-9 rounded-full bg-white hover:bg-[#F7EFE1] text-[#9A1B2F] border border-[#E0D5CC] flex items-center justify-center transition-all shadow-xs cursor-pointer"
                      onClick={() => alert('Messaging delivery partner: Please ring the bell once upon arrival.')}
                      title="Message Delivery Partner"
                    >
                      <span className="material-symbols-outlined text-[18px]">chat</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Pins summary */}
            <div className="mt-6 pt-4 border-t border-[#F0E6DE] text-[11px] text-[#8E7F78] flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#D9531E]">storefront</span> Kitchen: Central Rasoi Hub
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#9A1B2F]">pin_drop</span> Delivery: Your Address
              </span>
            </div>
          </div>

          {/* Right Map */}
          <LeafletTrackingMap activeStage={stage} onStageChange={handleStageChange} />

        </div>
      </div>
    </section>
  );
}
