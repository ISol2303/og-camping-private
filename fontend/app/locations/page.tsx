import Image from "next/image"
import Link from "next/link"
import { MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function LocationsPage() {
  const locations = [
    {
      id: "lakefront",
      name: "Lakefront Camping Area",
      description:
        "Prime camping spots with direct access to the lake. Perfect for water activities and fishing enthusiasts.",
      features: ["Lake access", "Fishing spots", "Boat launch nearby", "Scenic views"],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "forest-retreat",
      name: "Forest Retreat",
      description:
        "Secluded camping area surrounded by lush forest. Ideal for those seeking peace and tranquility in nature.",
      features: ["Shaded spots", "Wildlife viewing", "Hiking trails", "Natural privacy"],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "hilltop-vista",
      name: "Hilltop Vista",
      description: "Elevated camping area offering panoramic views of Tri An Lake and surrounding landscapes.",
      features: ["Panoramic views", "Sunrise/sunset viewing", "Breezy location", "Stargazing"],
      image: "/placeholder.svg?height=300&width=500",
    },
    {
      id: "family-grounds",
      name: "Family Camping Grounds",
      description: "Spacious camping area designed for families with convenient facilities and nearby activities.",
      features: ["Playground nearby", "Flat terrain", "Close to restrooms", "Group activities"],
      image: "/placeholder.svg?height=300&width=500",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Camping Locations</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover our carefully selected camping spots around Tri An Lake, each offering unique experiences and
          breathtaking views.
        </p>
      </div>

      <div className="mb-12">
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.2301271627304!2d107.0422121!3d11.0273889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174e6d5e61157b7%3A0x3c7f8fcd8d8f8c8c!2zSOG7kyBUcuG7iyBBbg!5e0!3m2!1sen!2s!4v1715089605159!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          ></iframe>
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 p-6 rounded-lg max-w-md text-center">
              <h2 className="text-2xl font-bold mb-2">Tri An Lake</h2>
              <p className="mb-4">
                Located in Dong Nai Province, approximately 70km from Ho Chi Minh City. A beautiful reservoir with
                diverse ecosystems and stunning landscapes.
              </p>
              <Button asChild>
                <Link href="https://maps.app.goo.gl/upPJeHLTNXyw2Myh6" target="_blank">
                  <MapPin className="mr-2 h-4 w-4" /> View on Google Maps
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {locations.map((location) => (
          <Card key={location.id} className="overflow-hidden">
            <div className="relative h-64 w-full">
              <Image src={location.image || "/placeholder.svg"} alt={location.name} fill className="object-cover" />
            </div>
            <CardHeader>
              <CardTitle>{location.name}</CardTitle>
              <CardDescription>{location.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="font-medium mb-2">Features:</h3>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                {location.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <span className="mr-2 text-emerald-500">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/booking?location=${location.id}`}>Book This Location</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 bg-emerald-50 p-8 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Need Help Choosing?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our camping experts can help you select the perfect location based on your preferences, group size, and
            desired activities.
          </p>
        </div>
        <div className="flex justify-center">
          <Button asChild size="lg">
            <Link href="/contact">Contact Our Team</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
