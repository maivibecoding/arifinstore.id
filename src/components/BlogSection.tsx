"use client";

import React from "react";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/constants";
import { BookOpen, Clock, User, ArrowRight, Tag } from "lucide-react";

export default function BlogSection() {
  return (
    <section id="blog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            Artikel Edukasi & SEO Silo
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Pusat Informasi & <span className="text-gradient-neon">Panduan Top-Up</span>
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Pelajari cara aman isi saldo e-money, review produk digital Gemini Pro, Duolingo, dan Notion Plus
          </p>
        </div>
      </div>

      {/* Grid of 4 SEO Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            className="glass-panel p-5 rounded-3xl flex flex-col justify-between border border-white/10 hover:border-cyan-500/40 hover:shadow-xl transition-all group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="px-2 py-0.5 rounded-md font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                {post.title}
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                {post.summary}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {post.tags.slice(0, 2).map((t, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px] flex items-center gap-1">
                <User className="w-3 h-3 text-indigo-400" />
                {post.author}
              </span>
              <span className="text-cyan-400 font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                Baca <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
