import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../lib/utils';
import { Package, Plus, Trash2, Edit, CheckCircle, Clock, Trash } from 'lucide-react';

export function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [pizzas, setPizzas] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'orders' | 'menu'>('orders');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [editingPizza, setEditingPizza] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'Best Pizza'
  });

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersRes, pizzasRes] = await Promise.all([
        fetch('/api/admin/orders'),
        fetch('/api/pizzas')
      ]);
      setOrders(await ordersRes.json());
      setPizzas(await pizzasRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (pizza: any = null) => {
    if (pizza) {
      setEditingPizza(pizza);
      setFormData({
        name: pizza.name,
        description: pizza.description,
        price: pizza.price.toString(),
        image: pizza.image,
        category: pizza.category || 'Best Pizza'
      });
    } else {
      setEditingPizza(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        image: '',
        category: 'Best Pizza'
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingPizza ? `/api/admin/pizzas/${editingPizza.id}` : '/api/admin/pizzas';
    const method = editingPizza ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price)
        })
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/admin/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const deletePizza = async (id: string) => {
    if (!confirm('Are you sure you want to delete this pizza?')) return;
    try {
      await fetch(`/api/admin/pizzas/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-sans">Loading...</div>;

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">Management Console</h1>
            <p className="text-neutral-500">Live system overview for De Pizza Town</p>
          </div>
          <div className="flex bg-white p-1 rounded-xl border border-neutral-200">
            <button 
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              Orders ({orders.length})
            </button>
            <button 
              onClick={() => setActiveTab('menu')}
              className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'menu' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              Menu ({pizzas.length})
            </button>
          </div>
        </div>
        
        {activeTab === 'menu' && (
          <div className="flex justify-end mb-6">
            <button 
              onClick={() => openModal()}
              className="bg-neutral-900 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-orange-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New Pizza
            </button>
          </div>
        )}

        {activeTab === 'orders' ? (
          <div className="grid grid-cols-1 gap-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-3xl border border-neutral-100 p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                        {order.status}
                      </span>
                      <span className="text-neutral-400 text-xs">{new Date(order.createdAt).toLocaleString()}</span>
                    </div>
                    <h2 className="text-xl font-bold uppercase tracking-tight">{order.customerName}</h2>
                    <p className="text-neutral-500 text-sm mb-4">{order.phone} • {order.address}</p>
                    
                    <div className="space-y-2 mt-4">
                      {order.items.map((item: any) => (
                        <div key={item.id} className="flex justify-between items-center text-sm border-b border-neutral-50 pb-2">
                          <span>{item.quantity}x {item.product.name}</span>
                          <span className="font-bold">{formatCurrency(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                    {order.notes && (
                      <div className="mt-4 p-3 bg-neutral-50 rounded-xl text-xs text-neutral-500 italic">
                        Note: {order.notes}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col justify-between items-end gap-4 min-w-[200px]">
                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1 block">Grand Total</span>
                      <span className="text-3xl font-black">{formatCurrency(order.totalAmount)}</span>
                    </div>
                    
                    {order.status === 'pending' && (
                      <button 
                        onClick={() => updateOrderStatus(order.id, 'completed')}
                        className="bg-neutral-900 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-orange-600 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Mark as Completed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {orders.length === 0 && <div className="text-center py-20 text-neutral-400 font-bold uppercase tracking-widest">No orders yet</div>}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-neutral-100 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-neutral-50 border-b border-neutral-100">
                <tr>
                  <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Pizza</th>
                  <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Description</th>
                  <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Price</th>
                  <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-neutral-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50">
                {pizzas.map((pizza) => (
                  <tr key={pizza.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <img src={pizza.image} className="w-12 h-12 rounded-xl object-cover border border-neutral-100" alt="" referrerPolicy="no-referrer" />
                        <div>
                          <p className="font-bold uppercase tracking-tight">{pizza.name}</p>
                          <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{pizza.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <p className="text-xs text-neutral-500 max-w-xs">{pizza.description}</p>
                    </td>
                    <td className="p-6 font-bold">{formatCurrency(pizza.price)}</td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => openModal(pizza)}
                          className="p-2 text-neutral-300 hover:text-blue-600 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => deletePizza(pizza.id)}
                          className="p-2 text-neutral-300 hover:text-red-600 transition-colors"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-neutral-100 bg-neutral-50">
              <h2 className="text-2xl font-black uppercase tracking-tighter">{editingPizza ? 'Edit Pizza' : 'Add New Pizza'}</h2>
              <p className="text-neutral-500 text-sm">Update your menu items on the fly.</p>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Pizza Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-orange-500 outline-none text-sm font-medium"
                    placeholder="e.g. Super Supreme"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-orange-500 outline-none text-sm font-medium"
                  >
                    <option value="Best Pizza">Best Pizza</option>
                    <option value="Ours Specials">Ours Specials</option>
                    <option value="Town Classics">Town Classics</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Description</label>
                <textarea 
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-orange-500 outline-none text-sm font-medium h-24 resize-none"
                  placeholder="Describe the ingredients..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Price (Rs)</label>
                  <input 
                    type="number" 
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-orange-500 outline-none text-sm font-medium"
                    placeholder="600"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Image URL</label>
                  <input 
                    type="text" 
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-orange-500 outline-none text-sm font-medium"
                    placeholder="Unsplash URL"
                  />
                </div>
              </div>
              <div className="pt-4 flex gap-4">
                <button 
                  type="submit"
                  className="flex-1 bg-neutral-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-orange-600 transition-colors shadow-lg shadow-neutral-900/10"
                >
                  {editingPizza ? 'Save Changes' : 'Create Item'}
                </button>
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 bg-neutral-100 text-neutral-500 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-neutral-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
