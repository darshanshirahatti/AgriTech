"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, ArrowLeft, Mail, Phone, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/lib/api/client";
import { useAuth } from "@/lib/auth/AuthContext";

const phoneSchema = z.object({
  phone: z.string().regex(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number."),
  password: z.string().min(1, "Password is required"),
});

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [routingState, setRoutingState] = useState(false);

  const phoneForm = useForm({ resolver: zodResolver(phoneSchema), defaultValues: { phone: "", password: "" } });
  const emailForm = useForm({ resolver: zodResolver(emailSchema), defaultValues: { email: "", password: "" } });

  const handleAuthAndRouting = async (identifier: string, password: str) => {
    setIsSubmitting(true);
    setErrorMsg("");
    try {
      // 1. Authenticate
      const loginRes = await api.post("/auth/login", { identifier, password });
      login(loginRes.data.user);
      
      setRoutingState(true);
      
      // 2. Fetch Routing AI
      try {
        const aiRes = await api.post("/ai/route", { message: "I want to access my dashboard" });
        const { recommended_route, confidence } = aiRes.data;
        if (confidence > 0.70) {
          router.push(recommended_route);
        } else {
          // Fallback based on role
          router.push(`/${loginRes.data.user.role.toLowerCase()}/dashboard`);
        }
      } catch (aiErr) {
        // Fallback on AI failure
        router.push(`/${loginRes.data.user.role.toLowerCase()}/dashboard`);
      }
      
    } catch (err: any) {
      setIsSubmitting(false);
      if (err.response?.status === 401) {
        setErrorMsg("Invalid credentials. Please try again.");
      } else if (err.response?.status === 429) {
        setErrorMsg("Too many attempts. Please try again later.");
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
    }
  };

  const onPhoneSubmit = (data: any) => handleAuthAndRouting(`+91${data.phone}`, data.password);
  const onEmailSubmit = (data: any) => handleAuthAndRouting(data.email, data.password);

  return (
    <div className="min-h-screen flex bg-brand-background">
      <div className="hidden lg:flex lg:w-1/2 relative bg-brand-primary items-end justify-start p-12 overflow-hidden">
        <div className="absolute inset-0 bg-brand-primary opacity-90 z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center z-0 mix-blend-overlay"></div>
        <div className="relative z-20 max-w-lg">
          <Link href="/" className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white font-medium mb-12 hover:bg-white/30 transition">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-5xl font-extrabold text-white leading-tight mb-4">
            Your Farm. <br/><span className="text-brand-accent">Your Data.</span> <br/>Your Decisions.
          </h1>
          <p className="text-white/80 text-lg">Access intelligent insights and market data tailored for Indian agriculture.</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-brand-text mb-2">Welcome Back</h2>
            <p className="text-gray-500">Sign in to continue to your agriculture dashboard.</p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
              {errorMsg}
            </div>
          )}

          {routingState ? (
             <div className="flex flex-col items-center justify-center py-12 space-y-4">
               <Loader2 className="w-10 h-10 animate-spin text-brand-primary" />
               <p className="text-brand-primary font-medium">Preparing your personalized dashboard...</p>
             </div>
          ) : (
            <>
              <div className="flex p-1 bg-gray-100 rounded-xl mb-8">
                <button onClick={() => setLoginMethod("phone")} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${loginMethod === "phone" ? "bg-white text-brand-primary shadow-sm" : "text-gray-500 hover:text-gray-700"}`}><Phone className="w-4 h-4" /> Phone</button>
                <button onClick={() => setLoginMethod("email")} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${loginMethod === "email" ? "bg-white text-brand-primary shadow-sm" : "text-gray-500 hover:text-gray-700"}`}><Mail className="w-4 h-4" /> Email</button>
              </div>

              {loginMethod === "phone" ? (
                <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                    <div className="flex rounded-xl overflow-hidden border border-gray-300 focus-within:border-brand-primary focus-within:ring-1 focus-within:ring-brand-primary transition-all">
                      <span className="flex items-center px-4 bg-gray-50 border-r border-gray-300 text-gray-600 font-medium">+91</span>
                      <input type="tel" maxLength={10} {...phoneForm.register("phone")} className="flex-1 px-4 py-3 outline-none" placeholder="Enter 10-digit number" />
                    </div>
                    {phoneForm.formState.errors.phone && <p className="text-red-500 text-xs mt-2 font-medium">{phoneForm.formState.errors.phone.message?.toString()}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input type="password" {...phoneForm.register("password")} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all" placeholder="Enter password" />
                    {phoneForm.formState.errors.password && <p className="text-red-500 text-xs mt-2 font-medium">{phoneForm.formState.errors.password.message?.toString()}</p>}
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                      <input type="checkbox" className="rounded text-brand-primary focus:ring-brand-primary border-gray-300" />
                      Remember me
                    </label>
                    <Link href="/forgot-password" className="text-sm font-medium text-brand-primary hover:underline">Forgot Password?</Link>
                  </div>
                  
                  <button type="submit" disabled={isSubmitting} className="w-full bg-brand-primary text-white py-3.5 rounded-xl font-bold hover:bg-brand-secondary transition shadow-md shadow-brand-primary/20 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2">
                    {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Signing In...</> : "Sign In"}
                  </button>
                </form>
              ) : (
                <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input type="email" {...emailForm.register("email")} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all" placeholder="Enter your email" />
                    {emailForm.formState.errors.email && <p className="text-red-500 text-xs mt-2 font-medium">{emailForm.formState.errors.email.message?.toString()}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input type="password" {...emailForm.register("password")} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all" placeholder="Enter password" />
                    {emailForm.formState.errors.password && <p className="text-red-500 text-xs mt-2 font-medium">{emailForm.formState.errors.password.message?.toString()}</p>}
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
                      <input type="checkbox" className="rounded text-brand-primary focus:ring-brand-primary border-gray-300" />
                      Remember me
                    </label>
                    <Link href="/forgot-password" className="text-sm font-medium text-brand-primary hover:underline">Forgot Password?</Link>
                  </div>
                  
                  <button type="submit" disabled={isSubmitting} className="w-full bg-brand-primary text-white py-3.5 rounded-xl font-bold hover:bg-brand-secondary transition shadow-md shadow-brand-primary/20 mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2">
                    {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Signing In...</> : "Sign In"}
                  </button>
                </form>
              )}
            </>
          )}

          <p className="text-center mt-8 text-sm text-gray-600">
            Don&apos;t have an account? <Link href="/register" className="font-bold text-brand-primary hover:underline">Create Free Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
