"use client";

import Link from "next/link";
import { ArrowLeft, KeyRound } from "lucide-react";
import { useState } from "react";

export default function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-brand-background flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center">
        
        <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <KeyRound className="w-8 h-8 text-brand-primary" />
        </div>

        {!submitted ? (
          <>
            <h2 className="text-2xl font-bold text-brand-text mb-2">Reset Your Password</h2>
            <p className="text-gray-500 mb-8">Enter your email or mobile number and we'll send you a link to reset your password.</p>
            
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6 text-left">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email or Mobile Number</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none"
                  placeholder="Enter details"
                />
              </div>
              
              <button type="submit" className="w-full bg-brand-primary text-white py-3.5 rounded-xl font-bold hover:bg-brand-secondary transition shadow-md shadow-brand-primary/20">
                Send Reset Link / OTP
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-brand-text mb-2">Check Your Device</h2>
            <p className="text-gray-500 mb-8">We've sent a password reset OTP/link. Please follow the instructions to reset your password.</p>
            <button onClick={() => setSubmitted(false)} className="w-full bg-white border-2 border-brand-primary text-brand-primary py-3.5 rounded-xl font-bold hover:bg-brand-background transition">
              Try Another Number/Email
            </button>
          </>
        )}

        <div className="mt-8 pt-6 border-t border-gray-100">
          <Link href="/login" className="inline-flex items-center gap-2 text-brand-primary font-medium hover:underline">
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
