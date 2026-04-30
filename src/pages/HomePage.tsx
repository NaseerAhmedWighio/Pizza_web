import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, ArrowRight, Truck, ShieldCheck, Clock, Pizza } from 'lucide-react';
import { useSettingsStore } from '../store/useSettingsStore';
import { useEffect } from 'react';

export function HomePage() {
  const { settings, fetchSettings } = useSettingsStore();

  useEffect(() => {
    if (!settings) fetchSettings();
  }, []);

  const siteName = settings?.siteName || 'De Pizza Town';
  const tagline = settings?.tagline || 'The taste of the century at your life';
  const description = settings?.description || 'Authentic taste, Karachi soul. Serving high-quality pizzas with premium ingredients since 2016.';
  const address = settings?.address || 'Block-B, North Nazimabad Town, Karachi, Pakistan';
  const shopTiming = settings?.shopTiming || '3 PM – 3 AM';
  const phone1 = settings?.phone1 || '+92 306 0022771';
  const phone2 = settings?.phone2 || '+92 333 1399804';
  const locationUrl = settings?.locationUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14470.97059885408!2d67.0426!3d24.9458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33f114c000001%3A0xc3c5d6f83424683c!2sNorth%20Nazimabad%20Town!5e0!3m2!1sen!2spk!4v1714150000000!5m2!1sen!2spk';
  const whatsapp = settings?.whatsapp || '923060022771';

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=2000"
            alt={siteName + " Hero"}
            className="w-full h-full object-cover opacity-40 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-12 sm:py-16 md:py-20 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <span className="h-px w-8 sm:w-12 bg-orange-600"></span>
              <span className="text-orange-500 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em]">Since 2016 • Karachi</span>
            </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.85] tracking-tighter uppercase mb-6 sm:mb-8">
                The Taste <br />
                <span className="text-orange-500 italic">Of The</span> <br />
                Century
              </h1>
              <p className="text-orange-500 font-black uppercase tracking-[0.25em] sm:tracking-[0.4em] text-[9px] sm:text-[10px] mb-6 sm:mb-8">"{tagline}"</p>

              <p className="text-neutral-300 text-base sm:text-lg mb-8 sm:mb-10 max-w-md leading-relaxed">
                Experience the sourdough pizzas that have redefined Karachi's food scene. Authentic recipes, premium ingredients, and 100% pure taste.
              </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 items-start sm:items-center">
              <Link
                to="/menu"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold uppercase tracking-widest text-xs sm:text-sm flex items-center justify-center gap-3 transition-all group shadow-2xl shadow-orange-950/40 w-full sm:w-auto"
              >
                Explore Menu
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              <div className="flex items-center gap-3 sm:gap-0 sm:-space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-neutral-900 bg-neutral-800 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="" />
                  </div>
                ))}
                <div className="pl-3 sm:pl-6 flex flex-col justify-center">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
                    <span className="text-white text-xs font-bold">4.6/5</span>
                  </div>
                  <span className="text-neutral-500 text-[10px] uppercase font-bold tracking-tighter">from 43+ reviews</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Badge */}
        <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 lg:bottom-12 lg:right-12 hidden md:block">
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-4 sm:p-6 rounded-2xl sm:rounded-[2.5rem] flex items-center gap-4 sm:gap-6">
            <div className="bg-orange-500 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl sm:rounded-3xl flex items-center justify-center rotate-12 shadow-lg shadow-orange-500/20">
              <Pizza className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <p className="text-white font-black text-base sm:text-xl uppercase tracking-tighter">Live Baking</p>
              <p className="text-neutral-400 text-[10px] sm:text-xs">Stone Oven Fresh 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
            {[
              { icon: Truck, title: "Fast Delivery", desc: `Express delivery across all North Nazimabad blocks.` },
              { icon: ShieldCheck, title: "100% Halal", desc: "Premium certified meat and fresh daily vegetables." },
              { icon: Clock, title: "Midnight Hub", desc: "The only place serving high-quality pizza until 3 AM." },
              { icon: Star, title: "Dine-in / Drive-thru", desc: "Enjoy our ambiance or pick up from your car." }
            ].map((feature, i) => (
              <div key={i} className="space-y-3 sm:space-y-4 group">
                <div className="bg-orange-50 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-black text-base sm:text-lg uppercase tracking-tight">{feature.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section / Story */}
      <section className="py-16 sm:py-20 md:py-24 bg-neutral-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-12 sm:gap-16 items-center">
            <div className="flex-1 w-full">
              <span className="text-orange-600 font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[10px] mb-3 sm:mb-4 block">The Legacy</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6 sm:mb-8 leading-[0.9]">Crafting Joy <br /><span className="text-orange-500">Since 2016</span></h2>
              <div className="space-y-4 sm:space-y-6">
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-medium">
                  What started as a small dream in North Nazimabad has grown into a local legend. At {siteName}, we don't just bake pizzas; we craft experiences. Every sourdough crust is fermented for 48 hours to ensure a light, airy, and flavorful base.
                </p>
                <div className="grid grid-cols-2 gap-6 sm:gap-8 pt-4">
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-neutral-900 block mb-1">4.6+</span>
                    <span className="text-neutral-500 uppercase tracking-widest text-[10px] font-bold">Google Rating</span>
                  </div>
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-neutral-900 block mb-1">10k+</span>
                    <span className="text-neutral-500 uppercase tracking-widest text-[10px] font-bold">Pizzas Baked</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
                <Link to="/menu" className="bg-neutral-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-orange-600 transition-all w-full sm:w-auto text-center">Explore Story</Link>
                <span className="text-neutral-400 text-xs italic">"{tagline}"</span>
              </div>
            </div>

            <div className="flex-1 w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] rounded-2xl sm:rounded-3xl lg:rounded-[3rem] overflow-hidden border border-neutral-200 shadow-2xl relative group">
              <img
                src="https://images.unsplash.com/photo-1593504049359-74330189a355?auto=format&fit=crop&q=80&w=1000"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Kitchen Action"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent flex items-end p-6 sm:p-8 md:p-12">
                <div className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/20">
                  <p className="text-white font-bold uppercase tracking-widest text-xs mb-1">Hand-Crafted Mastery</p>
                  <p className="text-white/60 text-[10px]">Every pizza is prepared with love by our local artisans.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Specials Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-neutral-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
            <div className="max-w-xl">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter mb-4 sm:mb-6">Our <span className="text-orange-500 font-serif italic lowercase tracking-normal">Specials</span></h2>
              <p className="text-neutral-400 text-sm sm:text-base">Exclusive recipes created by our master chefs, blending international techniques with Karachi's vibrant flavor profile.</p>
            </div>
            <Link to="/menu" className="bg-white text-neutral-950 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-orange-500 hover:text-white transition-all w-full sm:w-auto text-center">
              View All Specials
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { name: "Super Supreme", price: "Rs 599", img: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&q=80&w=800", tag: "Most Popular" },
              { name: "Afghani Mayo Garlic", price: "Rs 599", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800", tag: "Chef's Choice" },
              { name: "Creamy Tikka", price: "Rs 599", img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&q=80&w=800", tag: "Fusion King" }
            ].map((special, i) => (
              <div key={i} className="group relative rounded-2xl sm:rounded-[2.5rem] overflow-hidden bg-neutral-900 border border-neutral-800">
                <div className="h-64 sm:h-72 md:h-80 overflow-hidden">
                  <img src={special.img} alt={special.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80" />
                </div>
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                  <span className="bg-orange-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">{special.tag}</span>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">{special.name}</h3>
                    <span className="text-orange-500 font-bold text-sm sm:text-base">{special.price}</span>
                  </div>
                  <Link to="/menu" className="w-full block text-center border border-neutral-700 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:border-orange-500 hover:text-orange-500 transition-all">Add to tray</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Love */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <span className="text-orange-600 font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[10px] mb-3 sm:mb-4 block">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter">Customer <span className="text-orange-500 font-serif italic lowercase tracking-normal">Love</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { name: "Ahmed Khan", text: "The Afghani Feast is a game changer. Best fusion pizza in Karachi!", role: "Google Local Guide" },
              { name: "Sara Malik", text: "Quality is consistent every time. Late night delivery is a lifesaver.", role: "Regular Customer" },
              { name: "Bilal Sheikh", text: "Authentic sourdough crust at such affordable prices. Amazing stuff.", role: "Food Blogger" }
            ].map((review, i) => (
              <div key={i} className="bg-neutral-50 p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-[2.5rem] border border-neutral-100 hover:border-orange-200 transition-colors group">
                <div className="flex gap-1 mb-4 sm:mb-6">
                  {[1,2,3,4,5].map(j => <Star key={j} className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 fill-orange-500" />)}
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 italic">"{review.text}"</p>
                <div>
                  <h4 className="font-bold uppercase tracking-tight text-sm sm:text-base">{review.name}</h4>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">{review.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map & Location Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-neutral-50 rounded-2xl sm:rounded-3xl lg:rounded-[3rem] p-6 sm:p-10 md:p-16 lg:p-20 overflow-hidden border border-neutral-100 flex flex-col lg:flex-row gap-12 sm:gap-16 lg:gap-20 items-center">
            <div className="flex-1 space-y-6 sm:space-y-8 w-full">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-3 sm:mb-4">Find Us</h2>
                <p className="text-neutral-500 text-sm sm:text-base">Visit us in North Nazimabad for the hottest oven-fresh experience.</p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex gap-4 sm:gap-6">
                  <div className="bg-white w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                    <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-tight text-sm sm:text-base">Main Outlet</h4>
                    <p className="text-neutral-500 text-xs sm:text-sm">{address}</p>
                  </div>
                </div>
                <div className="flex gap-4 sm:gap-6">
                  <div className="bg-white w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase tracking-tight text-sm sm:text-base">Serving Hours</h4>
                    <p className="text-neutral-500 text-xs sm:text-sm">{shopTiming} (Mon - Sun)</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href={`tel:${phone1}`}
                  className="bg-neutral-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold uppercase tracking-widest text-xs inline-flex items-center justify-center gap-3 w-full sm:w-auto"
                >
                  Call Now to Order
                </a>
              </div>
            </div>

            <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl sm:rounded-2xl lg:rounded-[2.5rem] overflow-hidden border border-neutral-200 shadow-2xl shadow-neutral-900/10">
              <iframe
                src={locationUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-[60] bg-green-500 text-white p-3 sm:p-4 rounded-full shadow-2xl shadow-green-500/40 hover:scale-110 transition-transform flex items-center gap-2 group"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-[200px] transition-all duration-500 whitespace-nowrap text-xs sm:text-sm font-bold uppercase tracking-widest hidden sm:inline">Chat with us</span>
        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.938 3.659 1.434 5.626 1.434h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
}
