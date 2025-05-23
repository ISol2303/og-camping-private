import Image from "next/image"
"use client"
import Link from "next/link"
import { Award, Clock, Heart, MapPin, Shield, Users } from "lucide-react"
import FallbackImage from "@/components/FallbackImage"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-emerald-600" />,
      title: "Passion for Nature",
      description: "We're dedicated to sharing our love for the outdoors and helping others connect with nature.",
    },
    {
      icon: <Shield className="h-8 w-8 text-emerald-600" />,
      title: "Safety First",
      description:
        "Your safety is our priority. We maintain high standards for all equipment and provide proper guidance.",
    },
    {
      icon: <Users className="h-8 w-8 text-emerald-600" />,
      title: "Customer Satisfaction",
      description: "We go above and beyond to ensure every camper has a memorable and enjoyable experience.",
    },
    {
      icon: <Award className="h-8 w-8 text-emerald-600" />,
      title: "Quality Service",
      description: "From premium equipment to expert staff, we're committed to providing the highest quality service.",
    },
  ]

  const team = [
    {
      name: "Nguyen Van A",
      role: "Founder & CEO",
      bio: "Outdoor enthusiast with over 15 years of camping experience. Founded OGCamping to share his passion for nature.",
      image: "/placeholder.svg",
    },
    {
      name: "Tran Thi B",
      role: "Operations Manager",
      bio: "Ensures smooth operation of all camping services. Expert in logistics and customer satisfaction.",
      image: "/placeholder.svg",
    },
    {
      name: "Le Van C",
      role: "Head Guide",
      bio: "Certified wilderness guide with extensive knowledge of Tri An Lake area and outdoor activities.",
      image: "/placeholder.svg",
    },
    {
      name: "Pham Thi D",
      role: "Customer Relations",
      bio: "Dedicated to providing exceptional service and ensuring all customer needs are met.",
      image: "/placeholder.svg",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About OGCamping Private</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Providing premium camping experiences at Tri An Lake since 2020
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            OGCamping Private was founded with a simple mission: to make the beauty of Tri An Lake accessible to
            everyone through high-quality camping experiences.
          </p>
          <p className="text-gray-600 mb-4">
            What started as a small operation with just a few tents has grown into a comprehensive camping service that
            has helped thousands of people connect with nature and create lasting memories.
          </p>
          <p className="text-gray-600 mb-6">
            Our team of outdoor enthusiasts is passionate about providing exceptional service, from premium equipment to
            expert guidance, ensuring that every camping trip is safe, comfortable, and unforgettable.
          </p>
          <div className="flex items-center gap-4">
            <Clock className="h-5 w-5 text-emerald-600" />
            <span>Established in 2020</span>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <MapPin className="h-5 w-5 text-emerald-600" />
            <span>Headquartered in Ho Chi Minh City, Vietnam</span>
          </div>
        </div>
        <div className="relative h-[400px] rounded-xl overflow-hidden">
          <FallbackImage
            src="/placeholder.svg"
            alt="OGCamping team at Tri An Lake"
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = "/placeholder.svg"
            }}
          />
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-4 relative">
                <FallbackImage
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg"
                  }}
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-emerald-600 font-medium mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-emerald-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Join Us for Your Next Adventure</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Experience the beauty of Tri An Lake with our premium camping services. We're committed to providing you with
          an unforgettable outdoor experience.
        </p>
        <Button asChild size="lg">
          <Link href="/booking">Book Your Camping Trip</Link>
        </Button>
      </div>
    </div>
  )
}
