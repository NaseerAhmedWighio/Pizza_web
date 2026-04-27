import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Info } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { formatCurrency } from '../lib/utils';

export function MenuPage() {
  const [pizzas, setPizzas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetch('/api/pizzas')
      .then(res => res.json())
      .then(data => {
        setPizzas(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const categories = ["Best Pizza", "Our Specials", "Town Classics"];

  return (
    <div className="py-24 max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">Our Menu</h1>
        <p className="text-neutral-500 max-w-lg">Hand-stretched dough, slowly fermented for 48 hours. Baked in a stone oven at 450°C for that perfect leopard-spotted crust.</p>
      </div>

      {categories.map((category) => {
        const categoryPizzas = pizzas.filter(p => p.category === category);
        if (categoryPizzas.length === 0) return null;

        return (
          <div key={category} className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-3xl font-black uppercase tracking-tight text-neutral-900 shrink-0">{category}</h2>
              <div className="h-px w-full bg-neutral-100"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryPizzas.map((pizza, index) => (
                <motion.div 
                  key={pizza.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white rounded-[2rem] overflow-hidden border border-neutral-100 hover:border-orange-200 transition-all hover:shadow-2xl hover:shadow-orange-900/5 flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={pizza.image} 
                      alt={pizza.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full font-bold text-sm shadow-xl">
                      {formatCurrency(pizza.price)}
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-xl font-black mb-3 group-hover:text-orange-600 transition-colors uppercase tracking-tight leading-tight">{pizza.name}</h3>
                    <p className="text-neutral-500 text-sm mb-8 line-clamp-3 leading-relaxed flex-1">
                      {pizza.description}
                    </p>
                    
                    <button 
                      onClick={() => addItem(pizza)}
                      className="w-full bg-neutral-900 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all group/btn uppercase tracking-widest text-[10px]"
                    >
                      <Plus className="w-4 h-4 group-hover/btn:rotate-90 transition-transform" />
                      Add to tray
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
