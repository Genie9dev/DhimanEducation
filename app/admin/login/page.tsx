"use client";

import { motion } from "framer-motion";
import { Lock, User, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { login } from "./actions";
import { useActionState } from "react";

const initialState = {
  error: "",
};

export default function AdminLogin() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      const result = await login(formData);
      if (result?.error) {
        return { error: result.error };
      }
      return prevState;
    },
    initialState
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card w-full max-w-md p-8 rounded-3xl shadow-xl border border-border"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-primary mb-2">Admin Portal</h1>
            <p className="text-foreground/60 text-sm">Sign in to access your dashboard, tests, and announcements.</p>
          </div>

          <form action={formAction} className="space-y-5">
            {state?.error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-3 rounded-lg flex items-center gap-2 text-sm">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <p>{state.error}</p>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground/80">Admin ID / Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-foreground/40" />
                </div>
                <input 
                  type="email" 
                  name="email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  placeholder="Enter your Email"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-foreground/80">Password</label>
                <a href="#" className="text-xs text-secondary hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-foreground/40" />
                </div>
                <input 
                  type="password" 
                  name="password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full mt-6" disabled={isPending}>
              {isPending ? "Signing In..." : (
                <>Sign In <ArrowRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-foreground/60">
              Don't have an account?{" "}
              <a href="#" className="text-secondary font-medium hover:underline">Contact Administration</a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
