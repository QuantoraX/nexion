import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import galleryImage1 from "../assets/galleryImage1.png";
import galleryImage2 from "../assets/galleryImage2.png";
import galleryImage3 from "../assets/galleryImage3.png";

export function CallToAction() {
  return (
    <section className="py-36 px-4 md:px-16 lg:px-24 xl:px-32 w-full flex flex-col items-center justify-center text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <div className="relative w-full md:max-w-150 h-50 md:h-55 mb-12 flex justify-center items-center overflow-hidden md:overflow-visible group/cta-images select-none">
          <img src={galleryImage1} alt="Luxury Space 1" className="absolute w-50 md:w-62.75 h-25 md:h-34.75 object-cover rounded-[10px] transition-all duration-500 ease-out z-0 origin-bottom-right -rotate-12 -translate-x-28.75 translate-y-4 group-hover/cta-images:-translate-x-38.75 group-hover/cta-images:rotate-[-16deg] group-hover/cta-images:translate-y-2" />
          <img src={galleryImage3} alt="Luxury Space 3" className="absolute w-50 md:w-62.75 h-25 md:h-34.75 object-cover rounded-[10px] transition-all duration-500 ease-out z-0 origin-bottom-left rotate-12 translate-x-28.75 translate-y-4 group-hover/cta-images:translate-x-38.75 group-hover/cta-images:rotate-16 group-hover/cta-images:translate-y-2" />
          <img src={galleryImage2} alt="Luxury Space 2" className="absolute w-50 md:w-62.75 h-25 md:h-34.75 object-cover rounded-[10px] transition-all duration-500 ease-out z-10 -translate-y-2.5 group-hover/cta-images:-translate-y-5.5 group-hover/cta-images:scale-105" />
        </div>

        <motion.h2 className="text-3xl md:text-[40px] text-zinc-800 tracking-tight max-w-130 mb-3"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 240, damping: 70, mass: 1 }}
        >
          Ready to scale your next digital product?
        </motion.h2>

        <motion.p className="text-zinc-500 text-sm max-w-100 mb-7"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring", stiffness: 320, damping: 70, mass: 1 }}
        >
          We engineer robust web applications, responsive custom software, and scalable SaaS solutions.
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://wa.me/94762871658"
            target="_blank"
            rel="noreferrer"
            className="no-underline block"
          >
            <motion.div className="bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm px-6 py-3.5 rounded-xl transition-all duration-200 flex items-center gap-2.5 font-semibold cursor-pointer shadow-lg shadow-emerald-900/20 hover:scale-105 active:scale-95"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.887-9.885 9.887m0-18.375C6.27 3.41 1.41 8.27 1.41 14.28c0 2.07.59 4.09 1.71 5.85L1.5 22.5l2.45-1.6c1.7 1 3.68 1.53 5.67 1.53h.01c6.01 0 10.87-4.86 10.87-10.87 0-2.9-.13-5.63-2.25-7.75A10.8 10.8 0 0012.05 3.41z" />
              </svg>
              <span>Contact WhatsApp with Us</span>
            </motion.div>
          </a>

          <Link to="/contact" className="no-underline block">
            <motion.div className="bg-black hover:bg-zinc-900 text-white text-sm px-6 py-3.5 rounded-xl transition-all duration-200 flex items-center gap-2 group cursor-pointer"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }}
            >
              <span>Let's Talk Project</span>
              <MoveRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}
