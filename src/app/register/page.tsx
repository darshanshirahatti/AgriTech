"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf, ArrowLeft, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/lib/api/client";

const registerSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  phone: z.string().regex(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  role: z.enum(["FARMER", "BUYER", "EXPERT"]),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function Register() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", phone: "", email: "", password: "", confirmPassword: "", role: "FARMER" }
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      await api.post("/auth/register", {
        full_name: data.fullName,
        email: data.email || null,
        phone: `+91${data.phone}`,
        password: data.password,
        role: data.role
      });
      
      setSuccessMsg("Account created successfully. Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
      if (err.response?.status === 400) {
        setErrorMsg(err.response.data.detail || "Registration failed. Email or phone might already be in use.");
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-background py-12 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        
        <div className="bg-brand-primary p-8 text-center relative">
          <Link href="/login" className="absolute top-8 left-8 text-white/80 hover:text-white flex items-center gap-1 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <div className="inline-flex bg-white/20 p-3 rounded-2xl mb-4 backdrop-blur-sm">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Create Your Account</h2>
          <p className="text-brand-background/80 mt-2">Join thousands of farmers making smarter decisions.</p>
        </div>

        <div className="p-8 sm:p-10">
          {errorMsg && <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">{errorMsg}</div>}
          {successMsg && <div className="mb-6 p-3 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-100">{successMsg}</div>}

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" {...form.register("fullName")} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-primary outline-none" placeholder="e.g. Ramesh Kumar" />
                {form.formState.errors.fullName && <p className="text-red-500 text-xs mt-1">{form.formState.errors.fullName.message?.toString()}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                <div className="flex rounded-xl overflow-hidden border border-gray-300 focus-within:border-brand-primary">
                  <span className="flex items-center px-4 bg-gray-50 border-r border-gray-300 text-gray-600 font-medium">+91</span>
                  <input type="tel" maxLength={10} {...form.register("phone")} className="flex-1 px-4 py-3 outline-none" placeholder="10-digit number" />
                </div>
                {form.formState.errors.phone && <p className="text-red-500 text-xs mt-1">{form.formState.errors.phone.message?.toString()}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
                <input type="email" {...form.register("email")} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-primary outline-none" placeholder="email@example.com" />
                {form.formState.errors.email && <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message?.toString()}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                <select {...form.register("role")} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-primary outline-none bg-white">
                  <option value="FARMER">Farmer</option>
                  <option value="BUYER">Buyer</option>
                  <option value="EXPERT">Expert</option>
                </select>
                {form.formState.errors.role && <p className="text-red-500 text-xs mt-1">{form.formState.errors.role.message?.toString()}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input type="password" {...form.register("password")} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-primary outline-none" placeholder="Create password" />
                {form.formState.errors.password && <p className="text-red-500 text-xs mt-1">{form.formState.errors.password.message?.toString()}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input type="password" {...form.register("confirmPassword")} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-primary outline-none" placeholder="Confirm password" />
                {form.formState.errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{form.formState.errors.confirmPassword.message?.toString()}</p>}
              </div>
            </div>

            <button type="submit" disabled={isSubmitting || !!successMsg} className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-secondary transition shadow-lg shadow-brand-primary/20 mt-6 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
              {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Creating Account...</> : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-8 text-gray-600">
            Already have an account? <Link href="/login" className="font-bold text-brand-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
