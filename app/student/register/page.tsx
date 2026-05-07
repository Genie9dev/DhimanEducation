"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Key, Lock, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { registerStudent } from "./actions";
import Link from "next/link";

const initialState = { error: "", success: false, studentName: "" };

export default function StudentRegisterPage() {
  const [state, formAction, isPending] = useActionState(registerStudent, initialState);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card w-full max-w-md p-8 rounded-3xl shadow-xl border border-border"
        >
          {state.success ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold text-primary mb-2">Welcome, {state.studentName}!</h1>
              <p className="text-foreground/60 mb-6">Your account has been created successfully. You can now log in to access your dashboard.</p>
              <Button asChild className="w-full">
                <Link href="/student/login">Go to Login <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Key className="h-7 w-7 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-primary mb-2">Create Your Account</h1>
                <p className="text-foreground/60 text-sm">Enter the Registration Code provided by Dhiman Education to get started.</p>
              </div>

              <form action={formAction} className="space-y-5">
                {state.error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-3 rounded-lg flex items-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4 shrink-0" /> {state.error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground/80">Registration Code</label>
                  <input
                    type="text"
                    name="code"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background font-mono tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="DE-XXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground/80">Choose a Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
                    <input
                      type="password"
                      name="password"
                      required
                      minLength={6}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Minimum 6 characters"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground/80">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
                    <input
                      type="password"
                      name="confirm_password"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Repeat your password"
                    />
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full mt-2" disabled={isPending}>
                  {isPending ? "Creating Account..." : <>Create Account <ArrowRight className="ml-2 h-4 w-4" /></>}
                </Button>
              </form>

              <p className="text-center text-sm text-foreground/60 mt-6">
                Already have an account?{" "}
                <Link href="/student/login" className="text-secondary font-medium hover:underline">Sign In</Link>
              </p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
