import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { orderService } from '../../services/orderService';
import LocationPickerMap from './LocationPickerMap';

export default function CheckoutModal({ isOpen, onClose, onOrderPlaced }) {
  const { cart, appliedCoupon, clearCart } = useCart();
  const { currentUser } = useAuth();

  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [customerAddress, setCustomerAddress] = useState(currentUser?.defaultAddress || '');
  const [coords, setCoords] = useState([18.5284, 73.8443]);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customerName || !customerPhone || !customerAddress) {
      alert('Please fill out all address details.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        customer: {
          name: customerName,
          phone: customerPhone,
          address: customerAddress,
          coordinates: { lat: coords[0], lng: coords[1] }
        },
        items: cart,
        couponCode: appliedCoupon,
        paymentMethod
      };

      const res = await orderService.createOrder(payload);
      if (res.success && res.order) {
        clearCart();
        onClose();
        onOrderPlaced(res.order);
        alert(`Order Placed Successfully! 🙏\n\nOrder ID: ${res.order.orderId}\nDelivering to: ${customerName}\nAmount: ₹${res.order.grandTotal.toFixed(2)}\n\nYour fresh meal is being prepared in our central kitchen!`);
      } else {
        alert(res.message || 'Failed to place order');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Failed to connect to the order server. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
      <div className="bg-surface-bright rounded-3xl shadow-2xl border border-outline-variant max-w-2xl w-full p-6 sm:p-8 transform transition-transform duration-300">

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-outline-variant/60 mb-6">
          <div>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">Fast Dispatch Checkout</span>
            <h3 className="text-xl font-bold text-on-surface">Confirm Delivery &amp; Address</h3>
          </div>
          <button
            className="w-8 h-8 rounded-full hover:bg-surface-container text-on-surface flex items-center justify-center transition-colors cursor-pointer"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">Customer Full Name</label>
              <input
                className="w-full bg-surface-container px-3.5 py-2.5 rounded-xl border border-outline-variant text-sm text-on-surface focus:outline-none focus:border-primary"
                placeholder="e.g. Anand Joshi"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">Mobile Number (For WhatsApp Updates)</label>
              <input
                className="w-full bg-surface-container px-3.5 py-2.5 rounded-xl border border-outline-variant text-sm text-on-surface focus:outline-none focus:border-primary"
                placeholder="10-digit mobile number"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface mb-1">Complete Street / Flat / Society Address</label>
            <input
              className="w-full bg-surface-container px-3.5 py-2.5 rounded-xl border border-outline-variant text-sm text-on-surface focus:outline-none focus:border-primary"
              placeholder="Flat No., Wing, Building name..."
              required
              value={customerAddress}
              onChange={(e) => setCustomerAddress(e.target.value)}
            />
          </div>

          {/* Interactive Leaflet Location Picker */}
          <LocationPickerMap coords={coords} onCoordsChange={setCoords} />

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-bold text-on-surface mb-2">Select Payment Mode</label>
            <div className="grid grid-cols-3 gap-3">
              <label
                onClick={() => setPaymentMethod('upi')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 cursor-pointer text-center transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-primary bg-primary/5'
                    : 'border-outline-variant bg-surface-container hover:border-secondary'
                }`}
              >
                <span className={`material-symbols-outlined text-[22px] ${paymentMethod === 'upi' ? 'text-primary' : 'text-on-surface'}`}>
                  qr_code_scanner
                </span>
                <span className={`text-xs font-bold mt-1 ${paymentMethod === 'upi' ? 'text-primary' : 'text-on-surface'}`}>
                  UPI / GPay / PhonePe
                </span>
              </label>

              <label
                onClick={() => setPaymentMethod('cod')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 cursor-pointer text-center transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-primary bg-primary/5'
                    : 'border-outline-variant bg-surface-container hover:border-secondary'
                }`}
              >
                <span className={`material-symbols-outlined text-[22px] ${paymentMethod === 'cod' ? 'text-primary' : 'text-on-surface'}`}>
                  payments
                </span>
                <span className={`text-xs font-bold mt-1 ${paymentMethod === 'cod' ? 'text-primary' : 'text-on-surface'}`}>
                  Cash on Delivery
                </span>
              </label>

              <label
                onClick={() => setPaymentMethod('card')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 cursor-pointer text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'border-primary bg-primary/5'
                    : 'border-outline-variant bg-surface-container hover:border-secondary'
                }`}
              >
                <span className={`material-symbols-outlined text-[22px] ${paymentMethod === 'card' ? 'text-primary' : 'text-on-surface'}`}>
                  credit_card
                </span>
                <span className={`text-xs font-bold mt-1 ${paymentMethod === 'card' ? 'text-primary' : 'text-on-surface'}`}>
                  Cards / NetBanking
                </span>
              </label>
            </div>
          </div>

          <div className="pt-4">
            <button
              className="w-full py-4 rounded-xl btn-primary font-bold text-base shadow-xl shadow-primary/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              <span>{loading ? 'Confirming Order...' : 'Confirm & Place Bhojan Order'}</span>
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
            </button>
            <p className="text-center text-[11px] text-outline mt-2">
              🛡️ 100% Safe Contactless Delivery • Pure Desi Ghee
            </p>
          </div>
        </form>

      </div>
    </div>
  );
}
