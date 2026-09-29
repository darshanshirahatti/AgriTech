"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Camera, CloudSun, TrendingUp, CalendarDays, BarChart3, BookOpen, Leaf, Sprout, ArrowRight, ShieldCheck, Smartphone, Mic, Globe2 } from "lucide-react";

const features = [
  { icon: <Camera className="w-6 h-6" />, title: "AI Crop Doctor", description: "Upload a crop image and get AI-powered disease and health insights." },
  { icon: <CloudSun className="w-6 h-6" />, title: "Weather Intelligence", description: "Get weather conditions and farming-relevant alerts." },
  { icon: <TrendingUp className="w-6 h-6" />, title: "Market Prices", description: "Track crop prices and make better selling decisions." },
  { icon: <CalendarDays className="w-6 h-6" />, title: "Crop Planning", description: "Plan crops, monitor activities and manage important farming dates." },
  { icon: <BarChart3 className="w-6 h-6" />, title: "Farm Analytics", description: "Understand your farm performance with simple analytics." },
  { icon: <BookOpen className="w-6 h-6" />, title: "Agricultural Knowledge", description: "Access practical farming information in an easy-to-understand format." }
];

const marketData = [
  { crop: "Tomato", market: "Davanagere", price: "₹2,450/q", change: "+4.2%", isPositive: true },
  { crop: "Onion", market: "Hubballi", price: "₹2,100/q", change: "-1.3%", isPositive: false },
  { crop: "Maize", market: "Dharwad", price: "₹2,250/q", change: "+2.1%", isPositive: true },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-background pt-16 pb-24 lg:pt-32 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-text leading-tight mb-6">
                Smart Farming Starts With <span className="text-brand-primary">Better Decisions.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
                AI-powered tools, crop insights, weather intelligence and market information — all designed to help farmers make smarter decisions and grow with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register" className="bg-brand-primary text-white px-8 py-4 rounded-xl font-semibold text-center hover:bg-brand-secondary transition-colors shadow-lg shadow-brand-primary/30 flex items-center justify-center gap-2">
                  Get Started Free <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#features" className="bg-white text-brand-text border border-gray-200 px-8 py-4 rounded-xl font-semibold text-center hover:bg-gray-50 transition-colors">
                  Explore Features
                </Link>
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              {/* Abstract Representation of dashboard */}
              <div className="bg-white rounded-3xl p-6 shadow-2xl border border-brand-primary/10 relative z-20 mx-auto max-w-md">
                <div className="flex items-center justify-between mb-6 border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-brand-background p-3 rounded-full">
                      <Sprout className="w-6 h-6 text-brand-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Current Crop</p>
                      <p className="font-bold text-brand-text">Tomato (Hybrid)</p>
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Healthy
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1 font-medium">Crop Health</p>
                    <p className="text-2xl font-bold text-brand-primary">92%</p>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <p className="text-xs text-gray-500 mb-1 font-medium">Weather</p>
                    <p className="text-2xl font-bold text-blue-600">28°C</p>
                  </div>
                </div>
                
                <div className="bg-brand-primary rounded-2xl p-5 text-white shadow-inner">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-brand-background/80 text-sm mb-1">Expected Yield</p>
                      <p className="text-3xl font-bold">+14%</p>
                    </div>
                    <TrendingUp className="w-10 h-10 text-brand-accent opacity-80" />
                  </div>
                </div>
              </div>
              
              {/* Decorative background circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-secondary/10 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-brand-primary text-white border-y border-brand-primary">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-brand-accent font-semibold tracking-wider uppercase text-sm mb-8">Built for the Future of Indian Agriculture</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[ 
              { num: "10,000+", label: "Farmers Supported" },
              { num: "25+", label: "Crop Categories" },
              { num: "50+", label: "Agricultural Insights" },
              { num: "24/7", label: "Digital Assistance" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-bold mb-2">{stat.num}</span>
                <span className="text-white/80 font-medium text-sm md:text-base">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-4">Everything You Need to Farm Smarter</h2>
            <p className="text-gray-600 text-lg">Powerful tools designed specifically for the needs of modern Indian farmers.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div whileHover={{ y: -5 }} key={idx} className="bg-brand-background rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                <div className="bg-white w-14 h-14 rounded-2xl shadow-sm flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-text mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6 line-clamp-2">{feature.description}</p>
                <Link href="#" className="text-brand-primary font-semibold flex items-center gap-2 group-hover:text-brand-secondary">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Crop Doctor Section */}
      <section id="crop-doctor" className="py-24 bg-brand-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary font-semibold text-sm mb-6">
                <Camera className="w-4 h-4" /> AI Diagnostics Preview
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-6">Know What&apos;s Happening With Your Crop</h2>
              <p className="text-gray-600 text-lg mb-8">
                Take a photo of your crop and let our AI assistant help identify possible crop health issues in seconds. Early detection saves yields.
              </p>
              <button className="bg-brand-text text-white px-8 py-4 rounded-xl font-semibold hover:bg-black transition-colors shadow-lg">
                Try Crop Doctor
              </button>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="border-2 border-dashed border-brand-primary/30 rounded-2xl p-8 text-center bg-brand-background/50 mb-6">
                <Camera className="w-12 h-12 text-brand-primary/50 mx-auto mb-4" />
                <p className="font-medium text-brand-text mb-2">Upload Crop Image</p>
                <p className="text-sm text-gray-500 mb-4">Drag & Drop Image or Click</p>
                <button className="bg-white border border-gray-200 text-brand-text px-6 py-2 rounded-lg font-medium shadow-sm">
                  Choose Image
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <p className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-4">Sample Result</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <span className="text-gray-600">Crop:</span>
                    <span className="font-semibold text-brand-text">Tomato</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                    <span className="text-gray-600">Possible Issue:</span>
                    <span className="font-semibold text-red-600">Leaf Disease</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Confidence:</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="bg-brand-primary h-full w-[94%]"></div>
                      </div>
                      <span className="font-bold text-brand-primary">94%</span>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 mt-4 text-center">
                  *This is a UI demonstration. Actual diagnostic AI requires backend integration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weather & Markets Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Weather */}
            <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-100">
              <h3 className="text-2xl font-bold text-brand-text mb-6 flex items-center gap-3">
                <CloudSun className="w-6 h-6 text-blue-500" /> Plan Your Farm Around the Weather
              </h3>
              
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-lg font-medium text-gray-600">Today</p>
                    <h4 className="text-5xl font-bold text-brand-text mt-1">28°C</h4>
                    <p className="text-blue-600 font-medium mt-2">Partly Cloudy</p>
                  </div>
                  <CloudSun className="w-16 h-16 text-blue-400" />
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center pt-6 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Humidity</p>
                    <p className="font-semibold">72%</p>
                  </div>
                  <div className="border-x border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Rain Prob.</p>
                    <p className="font-semibold text-blue-600">35%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Wind</p>
                    <p className="font-semibold">12 km/h</p>
                  </div>
                </div>
              </div>
              <button className="w-full bg-white border-2 border-blue-100 text-blue-600 font-semibold py-3 rounded-xl hover:bg-blue-50 transition-colors">
                View Detailed Weather
              </button>
            </div>

            {/* Markets */}
            <div id="market-prices" className="bg-brand-background rounded-3xl p-8 border border-brand-primary/10">
              <h3 className="text-2xl font-bold text-brand-text mb-6 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-brand-primary" /> Know the Market Before You Sell
              </h3>
              
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-6">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="py-4 px-4 text-sm font-semibold text-gray-600">Crop</th>
                      <th className="py-4 px-4 text-sm font-semibold text-gray-600">Market</th>
                      <th className="py-4 px-4 text-sm font-semibold text-gray-600">Price</th>
                      <th className="py-4 px-4 text-sm font-semibold text-gray-600">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketData.map((data, i) => (
                      <tr key={i} className="border-b border-gray-50 last:border-0">
                        <td className="py-4 px-4 font-medium">{data.crop}</td>
                        <td className="py-4 px-4 text-gray-600">{data.market}</td>
                        <td className="py-4 px-4 font-bold">{data.price}</td>
                        <td className={`py-4 px-4 font-semibold ${data.isPositive ? 'text-brand-primary' : 'text-red-500'}`}>
                          {data.change}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="bg-gray-50 p-2 text-center text-xs text-gray-400 border-t border-gray-100">
                  Sample Data. API connection required for live prices.
                </div>
              </div>
              <button className="w-full bg-brand-primary text-white font-semibold py-3 rounded-xl hover:bg-brand-secondary transition-colors shadow-md shadow-brand-primary/20">
                View All Market Prices
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-brand-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-16">How KrishiConnect Works</h2>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-brand-primary/20 z-0"></div>
            
            {[
              { num: "01", title: "Create Your Profile" },
              { num: "02", title: "Add Your Crops" },
              { num: "03", title: "Get Smart Insights" },
              { num: "04", title: "Make Better Decisions" }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 bg-white border-4 border-brand-background rounded-full shadow-lg flex items-center justify-center text-2xl font-bold text-brand-primary mb-6">
                  {step.num}
                </div>
                <h4 className="text-xl font-bold text-brand-text">{step.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Farmer Friendly */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <ShieldCheck className="w-16 h-16 text-brand-accent mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-6">Technology That Speaks Your Language</h2>
          <div className="flex justify-center gap-6 mb-8 text-2xl font-bold text-gray-300">
            <span className="text-brand-primary">English</span>
            <span>ಕನ್ನಡ</span>
            <span>हिन्दी</span>
          </div>
          <p className="text-xl text-gray-600 mb-12">
            Designed to make digital agriculture simple, accessible and useful for farmers everywhere.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl font-medium text-gray-700 flex flex-col items-center gap-2"><Mic className="w-5 h-5" /> Voice Ready</div>
            <div className="bg-gray-50 p-4 rounded-xl font-medium text-gray-700 flex flex-col items-center gap-2"><Globe2 className="w-5 h-5" /> Local Languages</div>
            <div className="bg-gray-50 p-4 rounded-xl font-medium text-gray-700 flex flex-col items-center gap-2"><Smartphone className="w-5 h-5" /> Mobile Friendly</div>
            <div className="bg-gray-50 p-4 rounded-xl font-medium text-gray-700 flex flex-col items-center gap-2"><CloudSun className="w-5 h-5" /> Offline Sync</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-brand-primary text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Farm Smarter?</h2>
          <p className="text-xl text-brand-background/90 mb-10">
            Create your free account and start exploring smarter tools for your farm today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-brand-accent text-[#172017] px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-colors shadow-lg">
              Create Free Account
            </Link>
            <Link href="#features" className="bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors">
              Explore Platform
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
