"use client"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { CalendarDays, MapPin, Tent, Users, ChevronDown, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    setIsLoaded(true)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const parallaxStyle = {
    transform: `translateY(${scrollY * 0.5}px)`,
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
         <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/background.jpg?height=1080&width=1920')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            
          }}
        />

        {/* Animated leaves */}
        <div className="leaves-container absolute inset-0 z-20 overflow-hidden pointer-events-none" />

        <div className="container relative z-20">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Badge className="mb-4 bg-primary/20 text-light hover:bg-primary/30 border-none">
              Dịch vụ cắm trại hàng đầu Việt Nam
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Khám phá thiên nhiên cùng OG Camping</h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Cung cấp dịch vụ cho thuê lều, túi ngủ, bếp dã ngoại và tổ chức tour cắm trại chuyên nghiệp
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-md">
                <Link href="/services">Khám phá dịch vụ</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-md bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                <Link href="/create-package">Tạo gói dịch vụ</Link>
              </Button>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
            <Button
              variant="ghost"
              size="icon"
              className="text-white rounded-full bg-white/10 hover:bg-white/20 border border-white/20"
              onClick={() => {
                window.scrollTo({
                  top: heroRef.current?.offsetHeight || 0,
                  behavior: "smooth",
                })
              }}
            >
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white texture-paper">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 gradient-text">
              Why Choose OGCamping Private?
            </h2>
            <div className="w-24 h-1 bg-forest-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide an exceptional camping experience with premium amenities and personalized service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Tent className="w-10 h-10 text-forest-600" />,
                title: "Premium Equipment",
                description:
                  "High-quality tents, sleeping bags, and camping gear for a comfortable outdoor experience.",
              },
              {
                icon: <MapPin className="w-10 h-10 text-forest-600" />,
                title: "Prime Locations",
                description: "Carefully selected camping spots with breathtaking views of Tri An Lake.",
              },
              {
                icon: <Users className="w-10 h-10 text-forest-600" />,
                title: "Expert Support",
                description: "Dedicated staff to assist with setup, activities, and ensure your safety.",
              },
              {
                icon: <CalendarDays className="w-10 h-10 text-forest-600" />,
                title: "Easy Booking",
                description: "Simple online reservation system with flexible scheduling options.",
              },
            ].map((feature, index) => (
              <div key={index} className="reveal hover-lift" style={{ animationDelay: `${index * 100}ms` }}>
                <Card className="border-none shadow-lg h-full luxury-card overflow-hidden group">
                  <CardContent className="pt-6 p-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full bg-forest-100 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl font-serif font-semibold mb-3">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Packages with Animation */}
      <section className="py-20 bg-gray-50 texture-wood relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 gradient-text">Popular Camping Packages</h2>
            <div className="w-24 h-1 bg-forest-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
              Choose from our most loved camping experiences at Tri An Lake
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Gói Classic",
                price: "420.000₫",
                description: "Gói cắm trại cơ bản với đầy đủ thiết bị cần thiết",
                image: "/images/classic-package.png",
                features: ["Lều, nệm, túi ngủ, gối", "Bàn ghế cắm trại", "Bếp gas mini + gas", "Hỗ trợ viên"],
              },
              {
                title: "Gói Full A",
                price: "750.000₫",
                description: "Gói cao cấp với bữa tối và bữa sáng đặc biệt",
                image: "/images/full-a-package.png",
                features: [
                  "Lều Decathlon cao cấp",
                  "Bữa tối đặc biệt",
                  "Tặng 1L rượu Đồng Nai",
                  "Bữa sáng với cà phê Mokapot",
                ],
              },
              {
                title: "Gói Full A+",
                price: "850.000₫",
                description: "Gói cao cấp nhất với check-in sớm và nhiều tiện ích",
                image: "/images/full-a-plus-package.png",
                features: [
                  "Quạt điện trong lều",
                  "Check-in sớm 1h",
                  "Bữa tối đặc biệt",
                  "Thêm khăn giấy và kem chống muỗi",
                ],
              },
            ].map((pkg, index) => (
              <div key={index} className="reveal hover-lift" style={{ animationDelay: `${index * 150}ms` }}>
                <Card className="overflow-hidden border-none shadow-luxury h-full group">
                  <div className="h-56 bg-gray-200 relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url('${pkg.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-serif font-bold text-white">{pkg.title}</h3>
                      <div className="text-forest-300 font-bold">{pkg.price}</div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4">{pkg.description}</p>
                    <ul className="mb-6 space-y-2">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                          <span className="mr-2 text-forest-500">✓</span> {feature}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full bg-forest-700 hover:bg-forest-800 btn-luxury">
                      <Link href={`/booking?package=${pkg.title.toLowerCase().replace(/\s+/g, "-")}`}>
                        Book This Package
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 reveal">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-forest-600 text-forest-700 hover:bg-forest-50 group"
            >
              <Link href="/services" className="flex items-center">
                View All Packages
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials with Animation */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 reveal">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 gradient-text">What Our Campers Say</h2>
            <div className="w-24 h-1 bg-forest-500 mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Nguyen Van A",
                quote:
                  "The camping experience was amazing! The staff was helpful and the equipment was top-notch. Will definitely come back.",
                image: "/placeholder.svg?height=80&width=80",
              },
              {
                name: "Tran Thi B",
                quote:
                  "Our family had a wonderful time at Tri An Lake. The kids loved the activities and we enjoyed the beautiful scenery.",
                image: "/placeholder.svg?height=80&width=80",
              },
              {
                name: "Le Van C",
                quote:
                  "The booking process was simple and the camping site exceeded our expectations. Highly recommend for a weekend getaway!",
                image: "/placeholder.svg?height=80&width=80",
              },
            ].map((testimonial, index) => (
              <div key={index} className="reveal hover-lift" style={{ animationDelay: `${index * 150}ms` }}>
                <Card className="border-none shadow-lg luxury-card h-full">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-6 border-2 border-forest-200 shadow-md">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="mb-4 text-forest-600">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-xl">
                            ★
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-600 italic mb-6 text-lg">"{testimonial.quote}"</p>
                      <p className="font-serif font-semibold text-lg">{testimonial.name}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Campfire Animation */}
      <section className="py-24 bg-gradient-to-br from-forest-800 via-forest-700 to-forest-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/textures/forest-pattern.png')] bg-repeat"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="reveal">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
              Ready for Your Camping Adventure?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Book your perfect camping experience at Tri An Lake today and create memories that will last a lifetime.
            </p>

            <div className="campfire mb-10">
              <div className="flame"></div>
            </div>

            <Button
              asChild
              size="lg"
              className="text-lg bg-white text-forest-800 hover:bg-forest-100 hover:text-forest-900 btn-luxury group"
            >
              <Link href="/booking" className="flex items-center">
                Book Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
