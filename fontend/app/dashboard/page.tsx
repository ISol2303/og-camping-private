"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarDays, ChevronRight, MapPin, Package, User } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  // Mock data for bookings
  const bookings = {
    upcoming: [
      {
        id: "B001",
        package: "Weekend Escape",
        location: "Lakefront Camping Area",
        date: new Date(2025, 5, 15),
        status: "confirmed",
        people: 2,
        price: "1,200,000₫",
      },
    ],
    past: [
      {
        id: "B002",
        package: "Family Adventure",
        location: "Forest Retreat",
        date: new Date(2025, 4, 5),
        status: "completed",
        people: 4,
        price: "2,500,000₫",
      },
      {
        id: "B003",
        package: "Lakeside Retreat",
        location: "Lakefront Camping Area",
        date: new Date(2025, 3, 20),
        status: "completed",
        people: 2,
        price: "1,800,000₫",
      },
    ],
    cancelled: [
      {
        id: "B004",
        package: "Group Expedition",
        location: "Hilltop Vista",
        date: new Date(2025, 2, 10),
        status: "cancelled",
        people: 6,
        price: "4,800,000₫",
      },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-700"
      case "completed":
        return "bg-blue-100 text-blue-700"
      case "cancelled":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <p className="text-gray-600">Manage your camping bookings and account</p>
        </div>
        <Button asChild>
          <Link href="/booking">Book New Trip</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Next Trip</CardTitle>
            <CardDescription>Your upcoming camping adventure</CardDescription>
          </CardHeader>
          <CardContent>
            {bookings.upcoming.length > 0 ? (
              <div>
                <div className="flex items-center gap-2 text-lg font-medium mb-1">
                  <Package className="h-5 w-5 text-emerald-600" />
                  <span>{bookings.upcoming[0].package}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <MapPin className="h-4 w-4" />
                  <span>{bookings.upcoming[0].location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CalendarDays className="h-4 w-4" />
                  <span>{format(bookings.upcoming[0].date, "MMMM d, yyyy")}</span>
                </div>
              </div>
            ) : (
              <div className="text-gray-500 py-2">No upcoming trips. Time to plan your next adventure!</div>
            )}
          </CardContent>
          <CardFooter>
            {bookings.upcoming.length > 0 && (
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link href={`/booking/${bookings.upcoming[0].id}`}>View Details</Link>
              </Button>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Account Info</CardTitle>
            <CardDescription>Your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span>Nguyen Van A</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>example@email.com</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+84 123 456 789</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" asChild className="w-full">
              <Link href="/profile">Edit Profile</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Quick Links</CardTitle>
            <CardDescription>Useful shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              <Link
                href="/services"
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <span>Browse Packages</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/locations"
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <span>Explore Locations</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
              >
                <span>Contact Support</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">My Bookings</h2>
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="upcoming">
            {bookings.upcoming.length > 0 ? (
              <div className="space-y-4">
                {bookings.upcoming.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-medium">{booking.package}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{booking.location}</span>
                          </div>
                          <div className="flex items-center gap-4 text-gray-600">
                            <div className="flex items-center gap-1">
                              <CalendarDays className="h-4 w-4" />
                              <span>{format(booking.date, "MMM d, yyyy")}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>
                                {booking.people} {booking.people === 1 ? "person" : "people"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                          <div className="text-lg font-bold text-emerald-600">{booking.price}</div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/booking/${booking.id}`}>View Details</Link>
                            </Button>
                            <Button variant="destructive" size="sm">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-500 mb-4">You don't have any upcoming bookings.</p>
                  <Button asChild>
                    <Link href="/booking">Book a Trip</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past">
            {bookings.past.length > 0 ? (
              <div className="space-y-4">
                {bookings.past.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-medium">{booking.package}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{booking.location}</span>
                          </div>
                          <div className="flex items-center gap-4 text-gray-600">
                            <div className="flex items-center gap-1">
                              <CalendarDays className="h-4 w-4" />
                              <span>{format(booking.date, "MMM d, yyyy")}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>
                                {booking.people} {booking.people === 1 ? "person" : "people"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                          <div className="text-lg font-bold text-emerald-600">{booking.price}</div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/booking/${booking.id}`}>View Details</Link>
                            </Button>
                            <Button variant="secondary" size="sm">
                              Book Again
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-500">You don't have any past bookings.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="cancelled">
            {bookings.cancelled.length > 0 ? (
              <div className="space-y-4">
                {bookings.cancelled.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-medium">{booking.package}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{booking.location}</span>
                          </div>
                          <div className="flex items-center gap-4 text-gray-600">
                            <div className="flex items-center gap-1">
                              <CalendarDays className="h-4 w-4" />
                              <span>{format(booking.date, "MMM d, yyyy")}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>
                                {booking.people} {booking.people === 1 ? "person" : "people"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                          <div className="text-lg font-bold text-emerald-600">{booking.price}</div>
                          <Button variant="outline" size="sm">
                            Book Again
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-500">You don't have any cancelled bookings.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Recommended Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Adventure Package",
              description: "Camping combined with exciting outdoor activities",
              price: "3,200,000₫",
              image: "/placeholder.svg?height=200&width=300",
            },
            {
              title: "Lakeside Retreat",
              description: "Premium camping spot right by the water with scenic views",
              price: "1,800,000₫",
              image: "/placeholder.svg?height=200&width=300",
            },
            {
              title: "Family Adventure",
              description: "Spacious setup for families with activities for all ages",
              price: "2,500,000₫",
              image: "/placeholder.svg?height=200&width=300",
            },
          ].map((pkg, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-40 bg-gray-200 relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${pkg.image}')` }}
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold mb-1">{pkg.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{pkg.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-emerald-600">{pkg.price}</span>
                  <Button size="sm" asChild>
                    <Link href={`/booking?package=${pkg.title.toLowerCase().replace(/\s+/g, "-")}`}>Book Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
