/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { SuccessPage } from './pages/SuccessPage';
import { AdminLogin } from './pages/AdminLogin';
import { useSettingsStore } from './store/useSettingsStore';
import { useEffect } from 'react';

function Footer() {
  const { settings, fetchSettings } = useSettingsStore();

  useEffect(() => {
    if (!settings) fetchSettings();
  }, []);

  const siteName = settings?.siteName || 'De Pizza Town';
  const tagline = settings?.tagline || '"The taste of the century at your life"';
  const description = settings?.description || 'Authentic taste, Karachi soul. Serving high-quality pizzas with premium ingredients since 2016.';
  const address = settings?.address || 'Block-B, North Nazimabad Town, Karachi, Pakistan';
  const phone1 = settings?.phone1 || '+92 306 0022771';
  const phone2 = settings?.phone2 || '+92 333 1399804';
  const shopTiming = settings?.shopTiming || '3 PM – 3 AM';
  const facebook = settings?.facebook || 'https://facebook.com/depizzatown';
  const instagram = settings?.instagram || 'https://instagram.com/depizzatown9';
  const tiktok = settings?.tiktok || 'https://tiktok.com/@depizzatown9';

  return (
    <footer className="bg-neutral-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="text-2xl font-bold mb-2 uppercase tracking-tighter">{siteName}</h3>
          <p className="text-orange-500 font-medium italic mb-4 text-xs uppercase tracking-widest">{tagline}</p>
          <p className="text-neutral-400 text-sm leading-relaxed">{description}</p>
          <div className="flex gap-4 mt-6">
            <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors bg-white/5 p-2 rounded-lg">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors bg-white/5 p-2 rounded-lg">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.012 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.012 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.105.415 1.227.055 1.265.07 1.648.07 4.85s-.015 3.585-.07 4.85c-.055 1.17-.249 1.805-.415 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.05.36-1.227.415-1.265.055-1.648.07-4.85.07s-3.585-.015-4.85-.07c-1.17-.055-1.805-.249-2.227-.415-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.36-1.05-.415-1.227-.055-1.265-.07-1.648-.07-4.85s.015-3.585.07-4.85c.055-1.17.249-1.805.415-2.227.217-.562.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.05-.36 1.227-.415 1.265-.055 1.648-.07 4.85-.07zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href={tiktok} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors bg-white/5 p-2 rounded-lg">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 448 512"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/></svg>
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-orange-500 uppercase tracking-widest text-[10px]">Contact Us</h4>
          <p className="text-neutral-400 text-sm">{address}</p>
          <p className="text-neutral-200 text-sm mt-4 font-mono">{phone1}</p>
          {phone2 && <p className="text-neutral-200 text-sm font-mono">{phone2}</p>}
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-orange-500 uppercase tracking-widest text-[10px]">Timing</h4>
          <p className="text-neutral-400 text-sm mb-1 uppercase tracking-tighter">Open Everyday</p>
          <p className="text-3xl font-black text-white">{shopTiming}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-neutral-800 mt-12 pt-8 text-center text-neutral-500 text-[10px] uppercase tracking-[0.2em] font-medium">
        © {new Date().getFullYear()} {siteName}. All rights reserved.
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
