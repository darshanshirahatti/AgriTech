import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111811] text-white/90 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-brand-primary p-2 rounded-lg">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                KrishiConnect
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Technology for smarter and more sustainable agriculture. Empowering farmers with data-driven insights.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand-accent transition-colors font-medium">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-brand-accent transition-colors font-medium">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-brand-accent transition-colors font-medium">Instagram</a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Platform</h3>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="#features" className="hover:text-brand-secondary transition-colors">Features</Link></li>
              <li><Link href="#crop-doctor" className="hover:text-brand-secondary transition-colors">Crop Doctor</Link></li>
              <li><Link href="#weather" className="hover:text-brand-secondary transition-colors">Weather</Link></li>
              <li><Link href="#market-prices" className="hover:text-brand-secondary transition-colors">Market Prices</Link></li>
              <li><Link href="#crop-planning" className="hover:text-brand-secondary transition-colors">Crop Planning</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Company</h3>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/about" className="hover:text-brand-secondary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-brand-secondary transition-colors">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-brand-secondary transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-brand-secondary transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Legal</h3>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/privacy" className="hover:text-brand-secondary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-brand-secondary transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-brand-secondary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          <p>© 2026 KrishiConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
