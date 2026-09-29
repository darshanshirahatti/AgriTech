"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Leaf } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-brand-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-brand-primary p-2 rounded-lg group-hover:bg-brand-secondary transition-colors">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-brand-primary">
                KrishiConnect
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-brand-text hover:text-brand-primary font-medium transition-colors">Home</Link>
            <Link href="#features" className="text-brand-text hover:text-brand-primary font-medium transition-colors">Features</Link>
            <Link href="#solutions" className="text-brand-text hover:text-brand-primary font-medium transition-colors">Solutions</Link>
            <Link href="#market-prices" className="text-brand-text hover:text-brand-primary font-medium transition-colors">Market Prices</Link>
            <Link href="#crop-doctor" className="text-brand-text hover:text-brand-primary font-medium transition-colors">Crop Doctor</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="text-brand-primary font-semibold hover:text-brand-secondary transition-colors">Login</Link>
            <Link href="/register" className="bg-brand-primary text-white px-5 py-2 rounded-full font-medium hover:bg-brand-secondary transition-colors shadow-sm shadow-brand-primary/30">Get Started</Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-primary p-2 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-brand-primary/10"
        >
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link href="/" className="block px-3 py-2 text-brand-text hover:text-brand-primary font-medium" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="#features" className="block px-3 py-2 text-brand-text hover:text-brand-primary font-medium" onClick={() => setIsOpen(false)}>Features</Link>
            <Link href="#market-prices" className="block px-3 py-2 text-brand-text hover:text-brand-primary font-medium" onClick={() => setIsOpen(false)}>Market Prices</Link>
            <Link href="#crop-doctor" className="block px-3 py-2 text-brand-text hover:text-brand-primary font-medium" onClick={() => setIsOpen(false)}>Crop Doctor</Link>
            <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
              <Link href="/login" className="block text-center w-full text-brand-primary font-semibold py-2 border border-brand-primary rounded-lg" onClick={() => setIsOpen(false)}>Login</Link>
              <Link href="/register" className="block text-center w-full bg-brand-primary text-white font-medium py-2 rounded-lg" onClick={() => setIsOpen(false)}>Get Started</Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
