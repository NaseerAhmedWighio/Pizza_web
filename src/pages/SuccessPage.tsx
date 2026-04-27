import { Link } from 'react-router-dom';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

export function SuccessPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 10, stiffness: 100 }}
        className="bg-green-100 p-8 rounded-full mb-8"
      >
        <CheckCircle2 className="w-16 h-16 text-green-600" />
      </motion.div>
      
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Order Received!</h1>
      <p className="text-neutral-500 mb-12 max-w-sm">
        Thank you for ordering from <span className="font-bold text-neutral-900">De Pizza Town</span>. Your fresh pizza is being prepared and will be at your doorstep in 30-45 minutes.
      </p>
      
      <div className="flex flex-wrap gap-4 justify-center">
        <Link 
          to="/menu" 
          className="bg-orange-600 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-orange-700 transition-colors flex items-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" />
          Order More
        </Link>
        <Link 
          to="/" 
          className="bg-white border border-neutral-200 text-neutral-900 px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-neutral-50 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
