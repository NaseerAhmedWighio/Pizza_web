import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Pizza, Loader2 } from 'lucide-react';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('admin_token', data.token);
        navigate('/admin');
      } else {
        setError('Invalid credentials. Hint: admin@depizzatown.com / admin123');
      }
    } catch (err) {
      setError('Connection failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-neutral-50">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="bg-orange-600 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-orange-600/20">
            <Pizza className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Admin Portal</h1>
          <p className="text-neutral-500 text-sm mt-1">Manage De Pizza Town's operations</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white p-8 rounded-[2rem] border border-neutral-100 shadow-sm space-y-6">
          {error && <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg mb-4">{error}</div>}
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Email Address</label>
            <input 
              required
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all"
              placeholder="admin@depizzatown.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Password</label>
            <input 
              required
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-600 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-neutral-900 hover:bg-orange-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Lock className="w-4 h-4" /> Sign In</>}
          </button>
        </form>
      </div>
    </div>
  );
}
