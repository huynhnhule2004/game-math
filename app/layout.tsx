"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Monitor, Smartphone, AlertTriangle, X, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobile, setIsMobile] = useState(false);

  // Kiểm tra thiết bị di động
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768;
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileAgent = /android|iphone|ipod|ipad|mobile/i.test(userAgent);
      setIsMobile(isMobileDevice || isMobileAgent);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-pink-500/10 to-blue-500/10 rounded-full animate-pulse delay-1000"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-md mx-auto">
          {/* Glass card */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500">

            {/* Icon section */}
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mb-4 shadow-lg animate-pulse">
                  <AlertTriangle className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-xs font-bold text-yellow-900">!</span>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-white text-center mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
              Thông Báo Quan Trọng
            </h1>

            {/* Message */}
            <div className="space-y-4 mb-6">
              <p className="text-white/90 text-lg text-center leading-relaxed">
                Ứng dụng này được tối ưu hóa cho{" "}
                <span className="font-semibold text-blue-300">máy tính để bàn</span>
              </p>

              <div className="flex items-center justify-center gap-4 py-3">
                <div className="flex flex-col items-center gap-2">
                  <Smartphone className="w-8 h-8 text-red-400" />
                  <span className="text-red-300 text-sm font-medium">Di động</span>
                  <X className="w-4 h-4 text-red-400" />
                </div>

                <ArrowRight className="w-6 h-6 text-white/60 animate-pulse" />

                <div className="flex flex-col items-center gap-2">
                  <Monitor className="w-8 h-8 text-green-400" />
                  <span className="text-green-300 text-sm font-medium">Máy tính</span>
                  <div className="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                    <span className="text-xs text-green-900 font-bold">✓</span>
                  </div>
                </div>
              </div>

              <p className="text-white/80 text-center">
                Vui lòng truy cập bằng máy tính để có{" "}
                <span className="font-semibold text-emerald-300">trải nghiệm tốt nhất!</span>
              </p>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-3xl"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-b-3xl"></div>
          </div>

          {/* Additional info */}
          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Màn hình hiện tại: {window.innerWidth}px × {window.innerHeight}px
            </p>
          </div>
        </div>

        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>
      </div>
    );
  }
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
