'use client';

import React from "react";
import Background from "@/components/Background";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      <div className="fixed inset-0 z-0">
        <Background />
      </div>

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-white/10 leading-none select-none">
            425
          </h1>
          <div className="relative -mt-12 md:-mt-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Comming soon
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-lg md:text-xl mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist yet, You are a bit too early.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
          >
            Go Back
          </button>
          {/* <button
            onClick={() => router.('/')}
            className="px-6 py-3 border border-gray-600 text-white font-semibold rounded-lg hover:border-gray-400 hover:bg-white/5 transition-all duration-200"
          >
            Go Home
          </button> */}
        </div>

        {/* Animated Elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
          <div className="w-96 h-96 border border-gray-800/50 rounded-full animate-pulse" />
          <div className="absolute top-8 left-8 w-80 h-80 border border-gray-700/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-16 left-16 w-64 h-64 border border-gray-600/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }} />
      </div>
    </div>
  );
}
