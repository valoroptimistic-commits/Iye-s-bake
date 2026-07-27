import { Instagram, Menu, X, MessageCircle } from 'lucide-react';
import { cn } from './lib/utils';
import { useEffect, useState } from 'react';

const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const FallbackImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [error, setError] = useState(false);
  
  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center bg-charcoal/5 text-charcoal/40 text-sm md:text-base font-medium border-2 border-dashed border-charcoal/10 p-4 text-center ${className}`}>
        <span>Upload your image:</span>
        <span className="font-bold text-charcoal/60 mt-1">{src}</span>
      </div>
    );
  }
  
  return <img src={src} alt={alt} className={className} onError={() => setError(true)} />;
};

import { motion, AnimatePresence } from 'motion/react';

const WHATSAPP_LINK = "https://wa.me/2349133470749";

function Button({ children, className, href, variant = 'primary' }: { children: React.ReactNode, className?: string, href: string, variant?: 'primary' | 'secondary' | 'outline' | 'white' }) {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 md:px-12 md:py-5 text-xs md:text-sm tracking-[0.2em] uppercase font-bold transition-all duration-500 rounded-full text-center";
  const variants = {
    primary: "bg-rose text-white hover:bg-charcoal hover:text-white shadow-xl hover:shadow-2xl hover:-translate-y-1",
    secondary: "bg-blush text-charcoal hover:bg-rose hover:text-white shadow-xl hover:-translate-y-1",
    outline: "border-2 border-rose text-rose hover:bg-rose hover:text-white",
    white: "bg-ivory text-rose hover:bg-charcoal hover:text-white shadow-xl hover:-translate-y-1"
  };
  
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn(baseStyles, variants[variant], className)}>
      {children}
    </a>
  );
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
  };

  const textReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const imageReveal = {
    hidden: { opacity: 0, scale: 1.05, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const slowStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25, delayChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-ivory selection:bg-rose/30 selection:text-charcoal overflow-x-hidden font-sans">
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-700",
        isScrolled ? "bg-ivory/95 backdrop-blur-xl py-4 shadow-sm" : "bg-transparent py-6 md:py-8"
      )}>
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#" className="font-serif text-2xl md:text-4xl font-bold tracking-tighter text-rose relative z-[60]">Iye's Bake.</a>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-12 text-xs tracking-[0.25em] uppercase font-bold text-charcoal/90">
            <a href="#story" className="hover:text-rose transition-colors duration-300">Our Story</a>
            <a href="#menu" className="hover:text-rose transition-colors duration-300">Menu</a>
            <a href="#gallery" className="hover:text-rose transition-colors duration-300">Gallery</a>
            <a href={WHATSAPP_LINK} className="px-6 py-3 bg-rose text-white rounded-full hover:bg-charcoal transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">Order Now</a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden relative z-[60] p-2 text-rose"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-ivory pt-24 px-6 pb-6 flex flex-col justify-between lg:hidden"
          >
            <div className="flex flex-col space-y-8 text-center mt-12">
              <a href="#story" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif text-charcoal">Our Story</a>
              <a href="#menu" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif text-charcoal">Menu</a>
              <a href="#gallery" onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-serif text-charcoal">Gallery</a>
            </div>
            <div className="flex flex-col items-center gap-6 pb-12">
              <Button href={WHATSAPP_LINK} className="w-full max-w-sm">Order Now</Button>
              <div className="flex items-center justify-center gap-4 text-charcoal/60">
                <a href="#" className="p-3 bg-charcoal/5 rounded-full hover:bg-charcoal/10 transition-colors"><Instagram size={24} /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 min-h-[90vh] flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-blush/30 rounded-full blur-[100px] md:blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] bg-rose/10 rounded-full blur-[80px] md:blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
        
        <div className="max-w-[90rem] mx-auto w-full grid lg:grid-cols-12 gap-12 md:gap-16 items-center relative z-10 mt-4 md:mt-8">
          <motion.div 
            initial="hidden" animate="visible" variants={staggerContainer}
            className="lg:col-span-7 space-y-6 md:space-y-10 order-2 lg:order-1 text-center md:text-left"
          >
            <motion.div variants={textReveal} className="inline-block px-4 py-1.5 md:px-5 md:py-2 rounded-full border border-rose/30 bg-rose/5">
              <p className="text-rose tracking-[0.2em] md:tracking-[0.3em] uppercase text-[10px] md:text-xs font-bold">The Baker Behind Iye's</p>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-[3.5rem] leading-[0.95] sm:text-7xl md:text-[7rem] lg:text-[8.5rem] font-serif md:leading-[0.9] text-charcoal font-black tracking-tighter">
              Handcrafted <br/>
              <span className="italic text-rose font-medium md:pr-8">elegance.</span>
            </motion.h1>
            <motion.p variants={textReveal} className="text-lg sm:text-xl md:text-2xl font-medium text-charcoal/70 max-w-lg mx-auto md:mx-0 leading-relaxed pt-2 md:pt-4">
              Elegant cakes and pastries, meticulously crafted to order in Kubwa, Abuja.
            </motion.p>
            <motion.div variants={textReveal} className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-6 md:pt-8 w-full sm:w-auto">
              <Button href={WHATSAPP_LINK} className="w-full sm:w-auto">Order Now</Button>
              <Button href="#gallery" variant="outline" className="w-full sm:w-auto">See My Work</Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial="hidden" animate="visible" variants={imageReveal}
            className="lg:col-span-5 w-full order-1 lg:order-2 relative"
          >
            <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl md:rounded-[2rem] shadow-2xl relative z-10">
              <FallbackImage 
                src="/hero.jpg" 
                alt="Beautiful custom cake by Iye's Bake" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 w-full h-full border-2 border-rose/20 rounded-3xl md:rounded-[2rem] z-0"></div>
          </motion.div>
        </div>
      </section>

      {/* Her Story Section */}
      <section id="story" className="py-24 md:py-48 px-6 md:px-12 bg-rose text-ivory relative overflow-hidden">
        <div className="max-w-[90rem] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-32 items-center relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={imageReveal}
            className="aspect-square md:aspect-[3/4] relative rounded-3xl md:rounded-[2rem] overflow-hidden shadow-2xl bg-black/10"
          >
            <FallbackImage 
              src="/story-baker.jpg" 
              alt="Iye at work" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={staggerContainer}
            className="space-y-8 md:space-y-12"
          >
            <motion.h2 variants={fadeUp} className="text-5xl md:text-8xl font-serif leading-[0.95] tracking-tighter">
              More than <br className="hidden md:block" /> baking. <br/>
              <span className="italic text-blush font-light">A signature.</span>
            </motion.h2>
            <motion.div variants={staggerContainer} className="space-y-6 md:space-y-8 text-lg md:text-xl font-light text-ivory/90 leading-relaxed max-w-xl">
              <motion.p variants={textReveal}>
                Four years ago, a passion for baking became a craft. Today, that craft has a name: <strong className="font-bold">Iye's Bake.</strong>
              </motion.p>
              <motion.p variants={textReveal}>
                Trained, meticulous, and endlessly creative, she brings a distinct eye for custom design and flavor to every order — from everyday indulgences to centerpiece celebration cakes.
              </motion.p>
              <motion.p variants={textReveal} className="text-xl md:text-2xl font-serif italic text-blush pt-2 md:pt-4">
                "No two creations are ever quite the same, because no two clients are either."
              </motion.p>
            </motion.div>
            <motion.div variants={textReveal} className="pt-4">
              <Button href={WHATSAPP_LINK} variant="white" className="w-full sm:w-auto">Meet The Baker</Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What She Bakes (Menu Grid) */}
      <section id="menu" className="py-24 md:py-48 px-6 md:px-12 bg-blush relative overflow-hidden">
        <div className="max-w-[90rem] mx-auto relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={staggerContainer}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6 border-b-2 border-charcoal/10 pb-8 md:pb-12"
          >
            <motion.h2 variants={fadeUp} className="text-6xl md:text-[8rem] font-serif leading-none tracking-tighter text-charcoal font-black">
              The <br/>Menu.
            </motion.h2>
            <motion.p variants={textReveal} className="max-w-md text-lg md:text-2xl font-medium text-charcoal/80 leading-relaxed pb-2 md:pb-3">
              A menu built on precision and flavor — every piece made to order.
            </motion.p>
          </motion.div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}
            className="grid sm:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-16 md:gap-y-24"
          >
            {[
              { title: "Signature Cakes", img: "/menu-cakes.jpg", desc: "Custom-designed celebration cakes, tailored to your theme, taste, and vision." },
              { title: "Pastries", img: "/menu-pastries.jpg", desc: "Delicate, handcrafted classics — buttery, layered, and made fresh." },
              { title: "Cupcakes", img: "/menu-cupcakes.jpg", desc: "Bite-sized indulgence, available in custom flavors and designs." },
              { title: "Small Chops", img: "/menu-smallchops.jpg", desc: "Perfect for events, parties, and everyday cravings." },
            ].map((item, idx) => (
              <motion.div key={idx} variants={fadeUp} className="group cursor-pointer">
                <div className="aspect-[4/3] md:aspect-[4/3] mb-6 md:mb-10 overflow-hidden rounded-2xl md:rounded-3xl shadow-xl bg-charcoal/5 relative">
                  <div className="absolute inset-0 bg-charcoal/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <FallbackImage src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-1000 ease-out relative z-0" />
                </div>
                <h3 className="text-3xl md:text-5xl font-serif mb-3 md:mb-5 text-charcoal font-bold tracking-tight group-hover:text-rose transition-colors duration-300">{item.title}</h3>
                <p className="text-charcoal/80 font-medium mb-6 md:mb-8 text-base md:text-xl max-w-md leading-relaxed">{item.desc}</p>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full sm:w-auto text-xs md:text-sm tracking-[0.2em] uppercase font-bold text-rose bg-ivory px-6 py-4 md:px-8 md:py-4 rounded-full shadow-md group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300">
                  Enquire <span className="ml-3">→</span>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Custom & Catering */}
      <section className="py-24 md:py-48 px-6 md:px-12 bg-charcoal text-ivory relative overflow-hidden">
        <div className="max-w-[90rem] mx-auto text-center space-y-12 md:space-y-16 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={staggerContainer}>
            <motion.p variants={textReveal} className="text-blush tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs md:text-sm font-bold mb-6 md:mb-8">Make It Special</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-6xl md:text-[7rem] font-serif max-w-5xl mx-auto leading-[1.1] md:leading-[0.95] tracking-tighter">
              Weddings. <br className="md:hidden" /><span className="italic text-blush font-light">Birthdays.</span> <br className="md:hidden" />Milestones.
            </motion.h2>
            <motion.p variants={textReveal} className="text-lg md:text-3xl font-light text-ivory/80 max-w-3xl mx-auto mt-8 md:mt-10 leading-relaxed">
              Whatever the occasion, Iye's Bake designs a piece that fits it perfectly.
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={slowStagger}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-[80rem] mx-auto py-8 md:py-16"
          >
            {[
              { img: "/catering-1.jpg", transform: "lg:-translate-y-12", display: "block" },
              { img: "/catering-2.jpg", transform: "lg:translate-y-12", display: "block" },
              { img: "/gallery-1.jpg", transform: "lg:-translate-y-12", display: "hidden md:block" },
              { img: "/gallery-2.jpg", transform: "lg:translate-y-12", display: "hidden md:block" }
            ].map((item, idx) => (
              <motion.div key={idx} variants={imageReveal} className={`aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-white/5 transform ${item.transform} ${item.display}`}>
                <FallbackImage src={item.img} alt="Catering" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={fadeUp} className="pt-8 md:pt-12">
            <Button href={WHATSAPP_LINK} variant="secondary" className="w-full sm:w-auto px-10 py-5 md:px-16 md:py-6 text-sm md:text-lg">Request a Custom Order</Button>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-24 md:py-48 px-6 md:px-12 bg-ivory">
        <div className="max-w-[90rem] mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={fadeUp} className="text-center mb-16 md:mb-24">
            <h2 className="text-5xl md:text-[8rem] font-serif text-charcoal font-black tracking-tighter">
              The <span className="italic text-rose font-light">Gallery</span>
            </h2>
          </motion.div>
          
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {[...Array(10)].map((_, i) => (
              <motion.div 
                key={i} 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={imageReveal}
                className="break-inside-avoid overflow-hidden rounded-xl md:rounded-2xl bg-charcoal/5 group shadow-sm md:shadow-lg"
              >
                <FallbackImage 
                  src={`/gallery-${i + 1}.jpg`} 
                  alt={`Gallery image ${i + 1}`} 
                  className="w-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-48 px-6 md:px-12 bg-gradient-to-b from-ivory to-blush/40 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={staggerContainer} className="text-center mb-16 md:mb-24">
            <motion.span variants={textReveal} className="text-rose tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs md:text-sm font-bold mb-4 md:mb-6 block">Client Love</motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-7xl font-serif text-charcoal tracking-tighter">Words from our clients</motion.h2>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-24">
            {[
              {
                quote: "The cake was even more beautiful in person than the pictures. Every detail was exactly what I asked for.",
                client: "Client, Kubwa"
              },
              {
                quote: "Not just a cake — a whole experience. The flavor matched the elegance perfectly.",
                client: "Client, Abuja"
              }
            ].map((testimonial, idx) => (
               <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={fadeUp} className="space-y-6 md:space-y-8 bg-white/60 backdrop-blur-lg p-8 md:p-12 rounded-2xl md:rounded-[2rem] shadow-xl border border-white">
                <div className="text-rose text-6xl md:text-8xl font-serif leading-none h-8 md:h-12 opacity-50">"</div>
                <p className="text-xl md:text-3xl font-serif leading-relaxed italic text-charcoal">
                  {testimonial.quote}
                </p>
                <p className="text-xs md:text-sm tracking-[0.2em] uppercase font-bold text-charcoal/60 pt-2 md:pt-4">— {testimonial.client}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-rose text-ivory py-20 md:py-32 px-6 md:px-12 rounded-t-[2rem] md:rounded-t-[3rem] -mt-6 md:-mt-10 relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        <div className="max-w-[90rem] mx-auto">
          <div className="grid md:grid-cols-12 gap-12 md:gap-8 mb-16 md:mb-24 text-center md:text-left">
            <div className="md:col-span-5 space-y-6 md:space-y-8">
              <span className="font-serif text-5xl md:text-7xl font-bold tracking-tighter block mb-4 md:mb-6">Iye's Bake.</span>
              <p className="font-light text-ivory/90 max-w-sm mx-auto md:mx-0 text-lg md:text-xl leading-relaxed">
                Along NNPC, Kubwa, Abuja
              </p>
            </div>
            
            <div className="md:col-span-3 space-y-4 md:space-y-6">
              <h4 className="text-xs md:text-sm tracking-[0.25em] uppercase font-bold mb-4 md:mb-8 text-charcoal/40">Explore</h4>
              <nav className="flex flex-col space-y-4 md:space-y-5 font-medium text-ivory text-lg md:text-xl">
                <a href="#story" className="hover:text-charcoal transition-colors">Our Story</a>
                <a href="#menu" className="hover:text-charcoal transition-colors">The Menu</a>
                <a href="#gallery" className="hover:text-charcoal transition-colors">Gallery</a>
              </nav>
            </div>
            
            <div className="md:col-span-4 space-y-4 md:space-y-6">
              <h4 className="text-xs md:text-sm tracking-[0.25em] uppercase font-bold mb-4 md:mb-8 text-charcoal/40">Connect</h4>
              <div className="flex flex-col items-center md:items-start space-y-4 md:space-y-6">
                <a 
                  href={WHATSAPP_LINK} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center font-medium text-lg md:text-xl hover:text-charcoal transition-colors"
                >
                  WhatsApp Order
                </a>
                <a 
                  href="#" 
                  className="inline-flex items-center font-medium text-lg md:text-xl hover:text-charcoal transition-colors"
                >
                  <Instagram className="w-5 h-5 md:w-6 md:h-6 mr-3 md:mr-4" />
                  Instagram
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 md:pt-12 border-t border-ivory/20 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm font-medium text-ivory/70 text-center md:text-left gap-4 md:gap-0">
            <p>© {new Date().getFullYear()} Iye's Bake. All rights reserved.</p>
            <p className="tracking-[0.2em] md:tracking-[0.3em] uppercase text-[10px] md:text-xs">Designed Elegantly</p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100]"
      >
        <motion.a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#20b858] transition-colors duration-300 relative group"
          aria-label="Order via WhatsApp"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div 
            className="absolute inset-0 rounded-full bg-[#25D366]/40 group-hover:bg-[#20b858]/40"
            animate={{ scale: [1, 1.6], opacity: [0.8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
          />
          <WhatsAppIcon size={28} className="relative z-10" />
        </motion.a>
      </motion.div>
    </div>
  );
}
