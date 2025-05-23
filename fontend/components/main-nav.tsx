"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function MainNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/services",
      label: "Services",
      active: pathname === "/services",
    },
    {
      href: "/locations",
      label: "Locations",
      active: pathname === "/locations",
    },
    {
      href: "/booking",
      label: "Book Now",
      active: pathname === "/booking",
    },
    {
      href: "/about",
      label: "About Us",
      active: pathname === "/about",
    },
    {
      href: "/contact",
      label: "Contact",
      active: pathname === "/contact",
    },
  ]

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [mobileMenuOpen])

  return (
    <div className="flex justify-between items-center">
      <div className="hidden md:flex items-center gap-1 lg:gap-2">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "relative px-3 py-2 text-sm font-medium transition-all duration-300",
              route.active ? "text-forest-700" : "text-gray-700 hover:text-forest-600",
            )}
            onMouseEnter={() => setHoveredItem(route.href)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {route.label}
            <span
              className={cn(
                "absolute bottom-0 left-0 w-full h-0.5 bg-forest-500 transform origin-left transition-transform duration-300",
                route.active || hoveredItem === route.href ? "scale-x-100" : "scale-x-0",
              )}
            />
          </Link>
        ))}
      </div>

      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          className="relative z-50"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 transition-transform duration-300 rotate-90" />
          ) : (
            <Menu className="h-6 w-6 transition-transform duration-300" />
          )}
        </Button>

        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-white z-40 flex flex-col animate-fade-in">
            <div className="h-16" /> {/* Space for header */}
            <nav className="flex flex-col space-y-1 p-4">
              {routes.map((route, index) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-lg font-medium transition-colors p-3 rounded-md animate-slide-up",
                    route.active
                      ? "text-forest-700 bg-forest-50"
                      : "text-gray-700 hover:text-forest-600 hover:bg-gray-50",
                    `delay-${index * 100}`,
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {route.label}
                </Link>
              ))}

              <div
                className="mt-6 flex flex-col gap-2 animate-slide-up"
                style={{ animationDelay: `${routes.length * 50 + 50}ms` }}
              >
                <Button asChild variant="outline" className="w-full">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="w-full bg-forest-700">
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}
