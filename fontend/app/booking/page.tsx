"use client"

import Link from "next/link"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { CalendarIcon, CheckCircle2, Info, ArrowRight, ArrowLeft } from "lucide-react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function BookingPage() {
  const searchParams = useSearchParams()
  const preselectedPackage = searchParams.get("package")

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
  from: undefined,
  to: undefined,
})

const displayText = dateRange?.from
  ? dateRange.to
    ? `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`
    : `${format(dateRange.from, "MMM d, yyyy")} - Select return date`
  : "Select your camping dates"

  const [step, setStep] = useState(1)
  const [selectedPackage, setSelectedPackage] = useState(preselectedPackage || "")
  const [bookingDetails, setBookingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    numPeople: "2",
    specialRequests: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    // Initialize animations
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
  }, [step])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    setBookingDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNextStep = () => {
    setStep((prev) => prev + 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handlePrevStep = () => {
    setStep((prev) => prev - 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset form or redirect to confirmation page
      setTimeout(() => {
        // In a real app, you would redirect to a confirmation page
        window.scrollTo({ top: 0, behavior: "smooth" })
      }, 2000)
    }, 1500)
  }
  
const packages = [
  { id: "classic", name: "Gói Classic", price: 420000 },
  { id: "full-a", name: "Gói Full A", price: 750000 },
  { id: "full-a-plus", name: "Gói Full A+", price: 850000 },
  { id: "thue-sup", name: "Thuê SUP", price: 200000 },
]
const selectedPackageData = packages.find((pkg) => pkg.id === selectedPackage)
const selectedPrice = selectedPackageData?.price || 0
const totalPrice = selectedPrice * parseInt(bookingDetails.numPeople || "1")


  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 reveal">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 gradient-text">
            Book Your Camping Experience
          </h1>
          <div className="w-24 h-1 bg-forest-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            Complete the form below to reserve your perfect camping getaway at Tri An Lake
          </p>
        </div>

        <div className="mb-10 reveal">
          <div className="flex justify-between items-center">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center relative">
                <div
                  className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center text-white font-medium mb-3 transition-all duration-500",
                    step === stepNumber
                      ? "bg-forest-600 scale-110 shadow-md"
                      : step > stepNumber
                        ? "bg-forest-400"
                        : "bg-gray-300",
                  )}
                >
                  {step > stepNumber ? (
                    <CheckCircle2 className="h-6 w-6 animate-fade-in" />
                  ) : (
                    <span className={step === stepNumber ? "animate-pulse-slow" : ""}>{stepNumber}</span>
                  )}
                </div>
                <span
                  className={cn(
                    "text-sm transition-colors duration-300",
                    step === stepNumber ? "text-forest-600 font-medium" : "text-gray-500",
                  )}
                >
                  {stepNumber === 1 ? "Package" : stepNumber === 2 ? "Details" : "Confirmation"}
                </span>

                {stepNumber < 3 && (
                  <div className="absolute top-7 left-[calc(100%+0.5rem)] w-[calc(100%-2rem)] h-0.5 bg-gray-200 -z-10">
                    <div
                      className="h-full bg-forest-500 transition-all duration-700"
                      style={{ width: step > stepNumber ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {isSuccess ? (
          <Card className="border-none shadow-luxury animate-fade-in">
            <CardContent className="pt-6 p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-forest-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-forest-600" />
              </div>
              <h2 className="text-2xl font-serif font-bold mb-4">Booking Confirmed!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for your booking. We have sent a confirmation email with all the details. Our team will
                contact you shortly to finalize your camping experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link href="/dashboard">View My Bookings</Link>
                </Button>
                <Button asChild className="bg-forest-700">
                  <Link href="/">Return to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-none shadow-luxury overflow-hidden reveal">
            <CardHeader className="bg-forest-50 border-b border-forest-100">
              <CardTitle className="font-serif text-2xl">
                {step === 1 ? "Select Your Package & DateRange" : step === 2 ? "Enter Your Details" : "Confirm Your Booking"}
              </CardTitle>
              <CardDescription>
                {step === 1
                  ? "Choose a camping package and your preferred dateRange"
                  : step === 2
                    ? "Provide your contact information"
                    : "Review your booking details before confirming"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-8 animate-fade-in">
                    <div className="space-y-4">
                      <Label htmlFor="package" className="text-lg font-medium">
                        Select Package
                      </Label>
                      <RadioGroup
                        defaultValue={selectedPackage}
                        onValueChange={(value) => setSelectedPackage(value)}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        {[
                          { id: "classic", name: "Gói Classic", price: "420.000₫" },
                          { id: "full-a", name: "Gói Full A", price: "750.000₫" },
                          { id: "full-a-plus", name: "Gói Full A+", price: "850.000₫" },
                          { id: "thue-sup", name: "Thuê SUP", price: "200.000₫" },
                        ].map((pkg, index) => (
                          <div
                            key={pkg.id}
                            className={cn(
                              "flex items-start space-x-2 p-4 rounded-lg border-2 transition-all duration-300 hover-lift",
                              selectedPackage === pkg.id
                                ? "border-forest-500 bg-forest-50"
                                : "border-gray-200 hover:border-forest-200",
                            )}
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            <RadioGroupItem value={pkg.id} id={pkg.id} className="mt-1" />
                            <Label htmlFor={pkg.id} className="flex flex-col cursor-pointer w-full">
                              <span className="font-medium text-lg">{pkg.name}</span>
                              <span className="text-forest-600 font-bold">{pkg.price}</span>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-lg font-medium">Select Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal h-14 text-lg hover:bg-forest-50 hover:border-forest-200 transition-all duration-300",
                                !dateRange?.from && "text-muted-foreground",
                                dateRange?.from && "border-forest-200",
                              )}
                            >
                              <CalendarIcon className="mr-3 h-5 w-5 text-forest-500" />
                              {displayText}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="range"
                            selected={dateRange}
                            onSelect={setDateRange}
                            numberOfMonths={2}
                            initialFocus
                            disabled={(date) => date < new Date()}
                            className="rounded-md border border-forest-100"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-base">
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={bookingDetails.firstName}
                          onChange={handleInputChange}
                          className="h-12 border-gray-300 focus:border-forest-500 focus:ring-forest-500 transition-all duration-300"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-base">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={bookingDetails.lastName}
                          onChange={handleInputChange}
                          className="h-12 border-gray-300 focus:border-forest-500 focus:ring-forest-500 transition-all duration-300"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-base">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={bookingDetails.email}
                          onChange={handleInputChange}
                          className="h-12 border-gray-300 focus:border-forest-500 focus:ring-forest-500 transition-all duration-300"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-base">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={bookingDetails.phone}
                          onChange={handleInputChange}
                          className="h-12 border-gray-300 focus:border-forest-500 focus:ring-forest-500 transition-all duration-300"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="numPeople" className="text-base">
                        Number of People
                      </Label>
                      <Select
                        name="numPeople"
                        value={bookingDetails.numPeople}
                        onValueChange={(value) => setBookingDetails((prev) => ({ ...prev, numPeople: value }))}
                      >
                        <SelectTrigger className="h-12 border-gray-300 focus:border-forest-500 focus:ring-forest-500 transition-all duration-300">
                          <SelectValue placeholder="Select number of people" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "person" : "people"}
                            </SelectItem>
                          ))}
                          <SelectItem value="more">More than 10</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialRequests" className="text-base">
                        Special Requests
                      </Label>
                      <Textarea
                        id="specialRequests"
                        name="specialRequests"
                        placeholder="Any special requirements or requests..."
                        value={bookingDetails.specialRequests}
                        onChange={handleInputChange}
                        rows={4}
                        className="border-gray-300 focus:border-forest-500 focus:ring-forest-500 transition-all duration-300"
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-8 animate-fade-in">
                    <div className="bg-forest-50 p-6 rounded-lg border border-forest-100">
                      <h3 className="font-serif text-xl font-bold mb-6 text-forest-800">Booking Summary</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-forest-100">
                          <span className="text-gray-600 font-medium">Package:</span>
                          <span className="font-bold text-lg">
                            {selectedPackage
                              .split("-")
                              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                              .join(" ")}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-forest-100">
                          <span className="text-gray-600 font-medium">Dates:</span>
                          <span className="font-bold">
                            {dateRange?.from
                              ? dateRange.to
                                ? `${format(dateRange.from, "MMM d, yyyy")} - ${format(dateRange.to, "MMM d, yyyy")}`
                                : `${format(dateRange.from, "MMM d, yyyy")} - ...`
                              : "Not selected"}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-forest-100">
                          <span className="text-gray-600 font-medium">Number of People:</span>
                          <span className="font-bold">{bookingDetails.numPeople}</span>
                        </div>
                       <div className="flex justify-between items-center pb-2 border-b border-forest-100">
                        <span className="text-gray-600 font-medium">Package Price:</span>
                        <span className="font-bold">{selectedPrice.toLocaleString("vi-VN")}₫</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-forest-100">
                            <span className="text-gray-600 font-medium">Total:</span>
                            <span className="font-bold text-forest-600">{totalPrice.toLocaleString("vi-VN")}₫</span>
                          </div>
                        <div className="pt-2">
                          <div className="flex justify-between items-center pb-2">
                            <span className="text-gray-600 font-medium">Name:</span>
                            <span className="font-bold">
                              {bookingDetails.firstName} {bookingDetails.lastName}
                            </span>
                          </div>
                          <div className="flex justify-between items-center pb-2">
                            <span className="text-gray-600 font-medium">Email:</span>
                            <span className="font-bold">{bookingDetails.email}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">Phone:</span>
                            <span className="font-bold">{bookingDetails.phone}</span>
                          </div>
                        </div>
                        {bookingDetails.specialRequests && (
                          <div className="pt-2 border-t border-forest-100 mt-2">
                            <span className="text-gray-600 font-medium block mb-2">Special Requests:</span>
                            <p className="text-sm bg-white p-3 rounded border border-forest-50">
                              {bookingDetails.specialRequests}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-3 bg-blue-50 p-5 rounded-lg border border-blue-100">
                      <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-700">
                        <p className="font-medium mb-1">Payment Information</p>
                        <p>
                          You will receive payment instructions after your booking is confirmed. We accept bank
                          transfers and cash payments upon arrival.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
            <CardFooter className="flex justify-between p-6 md:p-8 bg-gray-50 border-t">
              {step > 1 ? (
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  className="border-forest-200 hover:bg-forest-50 hover:text-forest-700 transition-all duration-300"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <div></div>
              )}
              {step < 3 ? (
                <Button
                  onClick={handleNextStep}
                  disabled={step === 1 && (!selectedPackage || !dateRange)}
                  className="bg-forest-700 hover:bg-forest-800 btn-luxury group"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-forest-700 hover:bg-forest-800 btn-luxury"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
