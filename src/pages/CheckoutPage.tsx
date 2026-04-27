import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { formatCurrency } from '../lib/utils';
import { motion } from 'motion/react';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  if (items.length === 0) {
    navigate('/menu');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          phone: formData.phone,
          address: formData.address,
          notes: formData.notes,
          items: items,
          totalAmount: getTotal()
        })
      });

      if (response.ok) {
        clearCart();
        navigate('/success');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-24 max-w-6xl mx-auto px-6 font-sans">
      <Link to="/cart" className="inline-flex items-center gap-2 text-neutral-500 hover:text-orange-600 mb-8 transition-colors uppercase tracking-widest text-xs font-bold">
        <ArrowLeft className="w-4 h-4" />
        Back to cart
      </Link>

      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-1">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-8">Delivery Details</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Phone Number</label>
                <input 
                  required
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all"
                  placeholder="+92 300 1234567"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Delivery Address</label>
              <textarea 
                required
                rows={3}
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all resize-none"
                placeholder="House #, Street #, Block-B, North Nazimabad..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Order Notes (Optional)</label>
              <textarea 
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all resize-none"
                placeholder="Extra spicy, ring the bell, etc."
              />
            </div>

            <button 
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 shadow-xl shadow-orange-900/10 mt-8"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm & Place Order'}
            </button>
          </form>
        </div>

        <div className="w-full lg:w-[380px]">
          <div className="bg-white rounded-[2rem] border border-neutral-100 p-8 sticky top-24 shadow-sm">
            <h2 className="font-bold uppercase tracking-tight text-xl mb-6">Summary</h2>
            <div className="space-y-4 mb-8">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-neutral-500">{item.quantity}x {item.name}</span>
                  <span className="font-bold">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-neutral-50 pt-6 flex justify-between items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Total</span>
              <span className="text-2xl font-black">{formatCurrency(getTotal())}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
