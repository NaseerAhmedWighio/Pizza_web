import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Pizza } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

export function Navbar() {
  const { items } = useCartStore();
  const location = useLocation();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-orange-600 p-1.5 rounded-lg">
            <Pizza className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight uppercase">De Pizza Town</span>
        </Link>

        {!isAdmin && (
          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-wider">
            <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link>
            <Link to="/menu" className="hover:text-orange-600 transition-colors">Menu</Link>
          </div>
        )}

        <div className="flex items-center gap-4">
          {!isAdmin && (
            <Link to="/cart" className="relative p-2 hover:bg-neutral-50 rounded-full transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>
          )}
          
          <Link 
            to={isAdmin ? "/admin" : "/admin/login"} 
            className="p-2 hover:bg-neutral-50 rounded-full transition-colors"
          >
            <User className="w-6 h-6 text-neutral-500" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
