"use client"

import type React from "react"

import { useState } from "react"
import { Mail, MapPin, MessageSquare, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      subject: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, this would send the contact form data to the server
    alert("Your message has been sent! We'll get back to you soon.")
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Have questions or need assistance? We're here to help you plan your perfect camping experience.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="mr-2 h-5 w-5 text-emerald-600" />
              Phone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>+84 123 456 789</p>
            <p className="text-sm text-gray-500 mt-1">Available 8:00 AM - 8:00 PM</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="mr-2 h-5 w-5 text-emerald-600" />
              Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>info@ogcamping.com</p>
            <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-emerald-600" />
              Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Hồ Trị An, Đồng Nai, Việt Nam</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Card>
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={formData.subject} onValueChange={handleSelectChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="booking">Booking Information</SelectItem>
                      <SelectItem value="support">Customer Support</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full mt-6">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  question: "What should I bring for camping?",
                  answer:
                    "While we provide all essential camping equipment, we recommend bringing personal items like clothing, toiletries, insect repellent, sunscreen, and any personal medications. A detailed packing list will be provided after booking.",
                },
                {
                  question: "Is it safe to camp at Tri An Lake?",
                  answer:
                    "Yes, our camping areas are carefully selected for safety. Our staff is trained in first aid and emergency procedures, and we maintain regular security patrols throughout our camping sites.",
                },
                {
                  question: "Can I cancel or reschedule my booking?",
                  answer:
                    "Yes, you can cancel or reschedule up to 48 hours before your booking date for a full refund. Changes made within 48 hours may be subject to a fee. Please contact us directly for assistance.",
                },
                {
                  question: "Are there bathroom facilities available?",
                  answer:
                    "Yes, all our camping areas have access to clean bathroom facilities with toilets and showers. The specific amenities vary by location and package type.",
                },
                {
                  question: "Do you offer transportation to the camping site?",
                  answer:
                    "We can arrange transportation from Ho Chi Minh City to Tri An Lake for an additional fee. Please mention this in your booking or contact us directly to arrange.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600 text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Our Office Hours</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span>9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span>10:00 AM - 4:00 PM</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-emerald-200">
              <p className="text-sm text-emerald-700">
                <strong>Note:</strong> Our camping staff is available 24/7 for guests currently at our camping sites.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">Find Us</h2>
        <div className="h-[400px] bg-gray-200 rounded-lg relative overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d250529.6540662122!2d107.157099!3d11.148648!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174f2dd1d948841%3A0x4f846dec3ff32d4d!2zVHLhu4sgQW4gTGFrZQ!5e0!3m2!1sen!2sus!4v1746722230365!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          ></iframe>
        </div>
      </div>
    </div>
  )
}
