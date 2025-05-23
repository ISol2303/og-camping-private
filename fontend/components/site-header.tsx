"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Tent } from "lucide-react"

import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative overflow-hidden rounded-full p-1">
                <Tent className="h-6 w-6 text-forest-600 transition-transform duration-300 group-hover:scale-110" />
                <span className="absolute inset-0 rounded-full bg-forest-100 scale-0 transition-transform duration-300 group-hover:scale-100 -z-10"></span>
              </div>
              <span className="font-serif text-xl font-bold tracking-tight">
                <span className="text-forest-700">OG</span>
                <span className="text-forest-600">Camping</span>
              </span>
            </Link>
          </div>
          <MainNav />
          <div className="hidden md:flex items-center gap-4">
            <Button
              asChild
              variant="ghost"
              className="hover:bg-forest-50 hover:text-forest-700 transition-all duration-300"
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-forest-700 hover:bg-forest-800 text-white btn-luxury">
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
