import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { formatCurrency } from '../lib/utils';
import { motion } from 'motion/react';

export function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-neutral-100 p-8 rounded-full mb-6">
          <ShoppingBag className="w-12 h-12 text-neutral-400" />
        </div>
        <h2 className="text-3xl font-bold mb-2 uppercase tracking-tight">Your cart is empty</h2>
        <p className="text-neutral-500 mb-8 max-w-xs">Looks like you haven't added any pizzas to your tray yet.</p>
        <Link 
          to="/menu" 
          className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-orange-700 transition-colors"
        >
          View Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="py-24 max-w-4xl mx-auto px-6">
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-12 text-center">Your Order</h1>
      
      <div className="bg-white rounded-[2rem] border border-neutral-100 overflow-hidden shadow-sm">
        <div className="p-8 space-y-8">
          {items.map((item) => (
            <motion.div 
              layout
              key={item.id} 
              className="flex items-center gap-6 pb-8 border-b border-neutral-50 last:border-0 last:pb-0 font-sans"
            >
              <img 
                src={item.image} 
                className="w-24 h-24 object-cover rounded-2xl" 
                alt={item.name}
                referrerPolicy="no-referrer"
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg uppercase tracking-tight mb-1">{item.name}</h3>
                <p className="text-orange-600 font-bold text-sm mb-4">{formatCurrency(item.price)}</p>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-neutral-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-neutral-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-neutral-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="text-right font-bold text-lg">
                {formatCurrency(item.price * item.quantity)}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="bg-neutral-50 p-8 border-t border-neutral-100">
          <div className="flex justify-between items-center mb-8">
            <span className="text-neutral-500 uppercase tracking-widest text-xs font-bold">Total Amount</span>
            <span className="text-3xl font-black text-neutral-900">{formatCurrency(getTotal())}</span>
          </div>
          <Link 
            to="/checkout" 
            className="block w-full bg-orange-600 hover:bg-orange-700 text-white text-center py-5 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all shadow-xl shadow-orange-900/10 flex items-center justify-center gap-2"
          >
            Proceed to Checkout
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
