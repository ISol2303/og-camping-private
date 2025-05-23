"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Coffee, Compass, Flame, ShieldCheck, Tent, Utensils, ArrowRight, Package } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"

export default function ServicesPage() {
  // Initialize animations when component mounts
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal")

    const revealOnScroll = () => {
      const windowHeight = window.innerHeight
      const revealPoint = 150

      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top

        if (elementTop < windowHeight - revealPoint) {
          element.classList.add("active")
        }
      })
    }

    window.addEventListener("scroll", revealOnScroll)
    revealOnScroll() // Initial check

    return () => {
      window.removeEventListener("scroll", revealOnScroll)
    }
  }, [])

  const services = [
    {
      title: "Gói Classic",
      description: "Gói cắm trại cơ bản với đầy đủ thiết bị cần thiết",
      price: "420.000₫",
      image: "/images/classic-package.png",
      features: [
        { icon: <Tent className="h-4 w-4" />, text: "Lều, nệm, túi ngủ, gối" },
        { icon: <Utensils className="h-4 w-4" />, text: "Bàn ghế cắm trại" },
        { icon: <Flame className="h-4 w-4" />, text: "Bếp gas mini + gas" },
        { icon: <ShieldCheck className="h-4 w-4" />, text: "Hỗ trợ viên" },
      ],
    },
    {
      title: "Gói Full A",
      description: "Gói cắm trại cao cấp với bữa tối và bữa sáng đặc biệt",
      price: "750.000₫",
      image: "/images/full-a-package.png",
      features: [
        { icon: <Tent className="h-4 w-4" />, text: "Lều Decathlon cao cấp" },
        { icon: <Utensils className="h-4 w-4" />, text: "Bữa tối đặc biệt" },
        { icon: <Coffee className="h-4 w-4" />, text: "Bữa sáng với cà phê Mokapot" },
        { icon: <Package className="h-4 w-4" />, text: "Tặng 1L rượu Đồng Nai" },
      ],
    },
    {
      title: "Gói Full A+",
      description: "Gói cắm trại cao cấp nhất với check-in sớm và nhiều tiện ích",
      price: "850.000₫",
      image: "/images/full-a-plus-package.png",
      features: [
        { icon: <Tent className="h-4 w-4" />, text: "Lều Decathlon cao cấp với quạt điện" },
        { icon: <Coffee className="h-4 w-4" />, text: "Check-in sớm với cơm chiên OG" },
        { icon: <Utensils className="h-4 w-4" />, text: "Bữa tối đặc biệt" },
        { icon: <ShieldCheck className="h-4 w-4" />, text: "Thêm khăn giấy và kem chống muỗi" },
      ],
    },
    {
      title: "Thuê SUP",
      description: "Thuê thuyền SUP để khám phá Hồ Trị An",
      price: "200.000₫",
      image: "/placeholder.svg?height=300&width=500",
      features: [
        { icon: <Compass className="h-4 w-4" />, text: "Thuyền SUP chất lượng cao" },
        { icon: <ShieldCheck className="h-4 w-4" />, text: "Áo phao an toàn" },
        { icon: <Utensils className="h-4 w-4" />, text: "Tay chèo" },
        { icon: <Coffee className="h-4 w-4" />, text: "Dành cho 2-3 người" },
      ],
    },
    {
      title: "Board Game",
      description: "Các trò chơi board game miễn phí tại khu cắm trại",
      price: "Miễn phí",
      image: "/placeholder.svg?height=300&width=500",
      features: [
        { icon: <Package className="h-4 w-4" />, text: "Ma sói (OG quản trò)" },
        { icon: <Package className="h-4 w-4" />, text: "UNO" },
        { icon: <Package className="h-4 w-4" />, text: "Drink game (uống say)" },
        { icon: <ShieldCheck className="h-4 w-4" />, text: "Hướng dẫn luật chơi" },
      ],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16 reveal">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 gradient-text">Dịch Vụ Cắm Trại</h1>
        <div className="w-24 h-1 bg-forest-500 mx-auto mb-6"></div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          OGCamping cung cấp nhiều dịch vụ cắm trại cao cấp tại Hồ Trị An, từ các gói cắm trại đến hoạt động giải trí
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="reveal hover-lift" style={{ animationDelay: `${index * 100}ms` }}>
            <Card className="overflow-hidden h-full luxury-card group">
              <div className="h-56 bg-gray-200 relative overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  width={500}
                  height={300}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-serif font-bold text-white">{service.title}</h3>
                  <div className="text-forest-300 font-bold">{service.price}</div>
                </div>
              </div>
              <CardHeader>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm">
                      <span className="mr-2 text-forest-500 flex-shrink-0">{feature.icon}</span> {feature.text}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-forest-700 hover:bg-forest-800 btn-luxury group">
                  <Link
                    href={`/booking?package=${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex items-center justify-center"
                  >
                    Đặt Ngay
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      <div className="mt-20 bg-gray-50 p-10 rounded-xl texture-paper reveal">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold mb-4">Lịch Trình Cắm Trại</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trải nghiệm cắm trại 2 ngày 1 đêm tại OGCamping với lịch trình đầy đủ các hoạt động thú vị
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/images/schedule.png"
              alt="Lịch trình cắm trại"
              width={600}
              height={600}
              className="w-full object-contain"
            />
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-forest-700">Ngày 1</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-forest-600">15:00:</span>
                  <span>Check-in (Full A+ check-in lúc 13:00)</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-forest-600">16:30:</span>
                  <span>Chèo SUP ngắm hoàng hôn</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-forest-600">18:30:</span>
                  <span>Tiệc tùng</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-forest-600">21:00:</span>
                  <span>Đốt lửa chill chill</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-forest-600">22:30:</span>
                  <span>Nghỉ ngơi</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-3 text-forest-700">Ngày 2</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-forest-600">6:00:</span>
                  <span>Chèo SUP ngắm bình minh</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-forest-600">8:00:</span>
                  <span>Ăn sáng & ngồi cà phê</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-forest-600">9:00:</span>
                  <span>Chill tự do</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2 text-forest-600">10:00-12:00:</span>
                  <span>Check-out</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 bg-forest-50 p-8 rounded-xl text-center reveal">
        <h2 className="text-3xl font-display font-bold mb-4">Thông Tin Thêm</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Để biết thêm chi tiết về các gói dịch vụ và đặt chỗ, vui lòng liên hệ với chúng tôi hoặc xem trang chi tiết
          gói dịch vụ
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-forest-700 hover:bg-forest-800 btn-luxury group">
            <Link href="/packages" className="flex items-center">
              Xem Chi Tiết Gói Dịch Vụ
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-forest-600 text-forest-700 hover:bg-forest-50">
            <Link href="/contact">Liên Hệ Chúng Tôi</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
