"use client";

import React from "react";
import { BLOG_POSTS } from "@/lib/constants";
import { BookOpen, Clock, User, ArrowRight, Tag } from "lucide-react";

export default function BlogSection() {
  return (
    <section id="blog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 scroll-mt-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#35508d] bg-blue-100 border border-blue-200 mb-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#0066cc]" />
            Artikel Edukasi & Panduan
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Pusat Informasi & <span className="text-[#0066cc]">Panduan Top-Up</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Pelajari cara aman isi saldo e-money, review produk digital Gemini Pro, Duolingo, dan Notion Plus
          </p>
        </div>
      </div>

      {/* Grid of 4 SEO Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-[#0066cc] transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="px-2 py-0.5 rounded-md font-bold text-[#0066cc] bg-blue-50 border border-blue-100">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {post.readTime}
                </span>
              </div>

              <h3 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#0066cc] transition-colors leading-snug">
                {post.title}
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                {post.summary}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {post.tags.slice(0, 2).map((t, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded"
                  >
                    <Tag className="w-2.5 h-2.5" />
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px] flex items-center gap-1">
                <User className="w-3 h-3 text-[#35508d]" />
                {post.author}
              </span>
              <span className="text-[#0066cc] font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                Baca <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
