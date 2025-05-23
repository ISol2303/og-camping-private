"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { vi } from "date-fns/locale"
import { CalendarIcon, Check, MapPin } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export default function CreatePackagePage() {
  const [date, setDate] = useState<Date>()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [totalPrice, setTotalPrice] = useState(0)

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1)
    window.scrollTo(0, 0)
  }

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1)
    window.scrollTo(0, 0)
  }

  const toggleItem = (id: string, price: number) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        setTotalPrice(totalPrice - price)
        return prev.filter((item) => item !== id)
      } else {
        setTotalPrice(totalPrice + price)
        return [...prev, id]
      }
    })
  }

  return (
    <>
      <section className="bg-muted py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Tạo gói dịch vụ cắm trại</h1>
            <p className="text-muted-foreground mb-8">
              Tùy chỉnh trải nghiệm cắm trại theo nhu cầu của bạn. Chọn địa điểm, thiết bị và dịch vụ bổ sung để có
              chuyến đi hoàn hảo.
            </p>

            <div className="flex justify-center mb-12">
              <div className="relative w-full max-w-lg">
                <ol className="flex items-center w-full">
                  {["Thông tin cơ bản", "Chọn thiết bị", "Dịch vụ bổ sung", "Xác nhận"].map((step, index) => (
                    <li key={index} className={cn("flex items-center relative", index < 3 && "w-full")}>
                      <div
                        className={cn(
                          "flex items-center justify-center w-10 h-10 rounded-full shrink-0 z-10",
                          currentStep > index + 1
                            ? "bg-primary text-white"
                            : currentStep === index + 1
                              ? "bg-primary/20 text-primary border-2 border-primary"
                              : "bg-muted-foreground/20 text-muted-foreground",
                        )}
                      >
                        {currentStep > index + 1 ? <Check className="w-5 h-5" /> : <span>{index + 1}</span>}
                      </div>
                      {index < 3 && <div className={cn("w-full bg-gray-200 h-0.5 dark:bg-gray-700")}></div>}
                    </li>
                  ))}
                </ol>
                <div className="hidden sm:flex justify-between mt-2 w-full px-5">
                  {["Thông tin cơ bản", "Chọn thiết bị", "Dịch vụ bổ sung", "Xác nhận"].map((step, index) => (
                    <div
                      key={index}
                      className="text-xs font-medium text-center"
                      style={{
                        width: index === 0 || index === 3 ? "80px" : "100px",
                        marginLeft: index === 0 ? "-10px" : index === 3 ? "-30px" : "0",
                      }}
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {currentStep === 1 && (
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin cơ bản</CardTitle>
                    <CardDescription>Cho chúng tôi biết thêm về chuyến đi của bạn</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="people">Số người tham gia</Label>
                      <Select defaultValue="2">
                        <SelectTrigger id="people">
                          <SelectValue placeholder="Chọn số người" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 người</SelectItem>
                          <SelectItem value="2">2 người</SelectItem>
                          <SelectItem value="3">3 người</SelectItem>
                          <SelectItem value="4">4 người</SelectItem>
                          <SelectItem value="5">5 người</SelectItem>
                          <SelectItem value="6">6 người</SelectItem>
                          <SelectItem value="7+">7+ người</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date">Ngày bắt đầu</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP", { locale: vi }) : "Chọn ngày"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Thời gian (ngày)</Label>
                      <div className="pt-2">
                        <Slider defaultValue={[2]} max={7} step={1} className="mb-2" />
                        <div className="flex items-center justify-between">
                          <span className="text-sm">1</span>
                          <span className="text-sm">2</span>
                          <span className="text-sm">3</span>
                          <span className="text-sm">4</span>
                          <span className="text-sm">5</span>
                          <span className="text-sm">6</span>
                          <span className="text-sm">7+</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Loại hình cắm trại</Label>
                      <RadioGroup defaultValue="standard">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard">Cắm trại tiêu chuẩn</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="glamping" id="glamping" />
                          <Label htmlFor="glamping">Glamping (cắm trại cao cấp)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="adventure" id="adventure" />
                          <Label htmlFor="adventure">Cắm trại phiêu lưu</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label>Địa điểm</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        {[
                          {
                            id: "ho-tri-an",
                            name: "Hồ Trị An",
                            location: "Đồng Nai",
                            image: "/placeholder.svg?height=200&width=300",
                          },
                          {
                            id: "da-lat",
                            name: "Đà Lạt",
                            location: "Lâm Đồng",
                            image: "/placeholder.svg?height=200&width=300",
                          },
                          {
                            id: "vung-tau",
                            name: "Bà Rịa - Vũng Tàu",
                            location: "Vũng Tàu",
                            image: "/placeholder.svg?height=200&width=300",
                          },
                          {
                            id: "other",
                            name: "Địa điểm khác",
                            location: "Tùy chọn",
                            image: "/placeholder.svg?height=200&width=300",
                          },
                        ].map((location) => (
                          <div key={location.id} className="relative">
                            <input
                              type="radio"
                              name="location"
                              id={location.id}
                              className="peer sr-only"
                              defaultChecked={location.id === "ho-tri-an"}
                            />
                            <label
                              htmlFor={location.id}
                              className="block cursor-pointer rounded-lg border-2 border-muted bg-popover p-2 hover:border-primary peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary"
                            >
                              <div className="relative h-32 w-full overflow-hidden rounded-md">
                                <Image
                                  src={location.image || "/placeholder.svg"}
                                  alt={location.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="mt-2">
                                <h3 className="font-medium">{location.name}</h3>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <MapPin className="mr-1 h-3 w-3" />
                                  {location.location}
                                </div>
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleNextStep}>Tiếp theo</Button>
                  </CardFooter>
                </Card>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Chọn thiết bị cắm trại</CardTitle>
                    <CardDescription>Chọn thiết bị cần thiết cho chuyến đi của bạn</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="tents" className="w-full">
                      <TabsList className="grid w-full grid-cols-4 mb-8">
                        <TabsTrigger value="tents">Lều & Túi ngủ</TabsTrigger>
                        <TabsTrigger value="cooking">Bếp dã ngoại</TabsTrigger>
                        <TabsTrigger value="lighting">Đèn & Điện</TabsTrigger>
                        <TabsTrigger value="other">Khác</TabsTrigger>
                      </TabsList>

                      <TabsContent value="tents" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            {
                              id: "tent-2",
                              name: "Lều 2 người",
                              price: 200000,
                              image: "/placeholder.svg?height=200&width=300",
                            },
                            {
                              id: "tent-4",
                              name: "Lều 4 người",
                              price: 350000,
                              image: "/placeholder.svg?height=200&width=300",
                            },
                            {
                              id: "tent-6",
                              name: "Lều 6 người",
                              price: 500000,
                              image: "/placeholder.svg?height=200&width=300",
                            },
                            {
                              id: "sleeping-bag",
                              name: "Túi ngủ tiêu chuẩn",
                              price: 80000,
                              image: "/placeholder.svg?height=200&width=300",
                            },
                            {
                              id: "sleeping-bag-premium",
                              name: "Túi ngủ cao cấp",
                              price: 100000,
                              image: "/placeholder.svg?height=200&width=300",
                            },
                            {
                              id: "sleeping-pad",
                              name: "Đệm cắm trại",
                              price: 50000,
                              image: "/placeholder.svg?height=200&width=300",
                            },
                          ].map((item) => (
                            <div key={item.id} className="relative">
                              <div
                                className={cn(
                                  "flex items-center space-x-4 rounded-lg border p-4 cursor-pointer",
                                  selectedItems.includes(item.id) && "border-primary bg-primary/5",
                                )}
                                onClick={() => toggleItem(item.id, item.price)}
                              >
                                <div className="relative h-20 w-20 overflow-hidden rounded-md shrink-0">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-medium">{item.name}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {new Intl.NumberFormat("vi-VN").format(item.price)}đ/ngày
                                  </p>
                                </div>
                                <Checkbox
                                  checked={selectedItems.includes(item.id)}
                                  onCheckedChange={() => toggleItem(item.id, item.price)}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="cooking" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            {
                              id: "stove",
                              name: "Bếp gas mini",
                              price: 150000,
                              image: "/placeholder.svg?height=200&width=300",
                            },
                            {
                              id: "cookware",
                              name: "Bộ nồi dã ngoại",
                              price: 120000,
                              image: "/placeholder.svg?height=200&width=300",
                            },
                            {
                              id: "grill",
                              name: "Bếp nướng than",
                              price: 180000,
                              image: "/placeholder.svg?height=200&width=300",
                            },
                            {
                              id: "cooler",
                              name: "Thùng giữ lạnh",
                              price: 100000,
                              image: "/placeholder.svg?height=200&width=300",
                            },
                          ].map((item) => (
                            <div key={item.id} className="relative">
                              <div
                                className={cn(
                                  "flex items-center space-x-4 rounded-lg border p-4 cursor-pointer",
                                  selectedItems.includes(item.id) && "border-primary bg-primary/5",
                                )}
                                onClick={() => toggleItem(item.id, item.price)}
                              >
                                <div className="relative h-20 w-20 overflow-hidden rounded-md shrink-0">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-medium">{item.name}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {new Intl.NumberFormat("vi-VN").format(item.price)}đ/ngày
                                  </p>
                                </div>
                                <Checkbox
                                  checked={selectedItems.includes(item.id)}
                                  onCheckedChange={() => toggleItem(item.id, item.price)}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      {/* Other tabs would follow the same pattern */}
                    </Tabs>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevStep}>
                      Quay lại
                    </Button>
                    <Button onClick={handleNextStep}>Tiếp theo</Button>
                  </CardFooter>
                </Card>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Dịch vụ bổ sung</CardTitle>
                    <CardDescription>Chọn các dịch vụ bổ sung để nâng cao trải nghiệm cắm trại của bạn</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      {[
                        {
                          id: "guide",
                          name: "Hướng dẫn viên",
                          description: "Hướng dẫn viên chuyên nghiệp đồng hành cùng bạn",
                          price: 500000,
                        },
                        {
                          id: "food",
                          name: "Gói thực phẩm",
                          description: "Thực phẩm đã chuẩn bị sẵn cho chuyến đi",
                          price: 300000,
                        },
                        {
                          id: "transport",
                          name: "Dịch vụ vận chuyển",
                          description: "Đưa đón từ trung tâm thành phố đến địa điểm cắm trại",
                          price: 400000,
                        },
                        {
                          id: "photography",
                          name: "Dịch vụ chụp ảnh",
                          description: "Nhiếp ảnh gia chuyên nghiệp ghi lại khoảnh khắc của bạn",
                          price: 800000,
                        },
                        {
                          id: "activities",
                          name: "Hoạt động ngoài trời",
                          description: "Các hoạt động như chèo thuyền, leo núi, câu cá...",
                          price: 350000,
                        },
                      ].map((service) => (
                        <div key={service.id} className="relative">
                          <div
                            className={cn(
                              "flex items-center space-x-4 rounded-lg border p-4 cursor-pointer",
                              selectedItems.includes(service.id) && "border-primary bg-primary/5",
                            )}
                            onClick={() => toggleItem(service.id, service.price)}
                          >
                            <div className="flex-1">
                              <h3 className="font-medium">{service.name}</h3>
                              <p className="text-sm text-muted-foreground">{service.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{new Intl.NumberFormat("vi-VN").format(service.price)}đ</p>
                              <Checkbox
                                checked={selectedItems.includes(service.id)}
                                onCheckedChange={() => toggleItem(service.id, service.price)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Ghi chú đặc biệt</Label>
                      <Input id="notes" placeholder="Nhập yêu cầu đặc biệt của bạn..." />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handlePrevStep}>
                      Quay lại
                    </Button>
                    <Button onClick={handleNextStep}>Tiếp theo</Button>
                  </CardFooter>
                </Card>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Xác nhận gói dịch vụ</CardTitle>
                    <CardDescription>Kiểm tra lại thông tin gói dịch vụ của bạn</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Thông tin cơ bản</h3>
                      </div>
                      <div className="bg-muted p-4 rounded-lg space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Số người:</span>
                          <span>2 người</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Ngày bắt đầu:</span>
                          <span>{date ? format(date, "dd/MM/yyyy", { locale: vi }) : "Chưa chọn"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Thời gian:</span>
                          <span>2 ngày</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Loại hình:</span>
                          <span>Cắm trại tiêu chuẩn</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Địa điểm:</span>
                          <span>Hồ Trị An, Đồng Nai</span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Thiết bị đã chọn</h3>
                      </div>
                      <div className="space-y-2">
                        {selectedItems.length > 0 ? (
                          selectedItems.map((id) => {
                            const allItems = [
                              { id: "tent-2", name: "Lều 2 người", price: 200000 },
                              { id: "tent-4", name: "Lều 4 người", price: 350000 },
                              { id: "sleeping-bag", name: "Túi ngủ tiêu chuẩn", price: 80000 },
                              { id: "stove", name: "Bếp gas mini", price: 150000 },
                              { id: "guide", name: "Hướng dẫn viên", price: 500000 },
                              { id: "food", name: "Gói thực phẩm", price: 300000 },
                            ]
                            const item = allItems.find((item) => item.id === id)

                            if (!item) return null

                            return (
                              <div key={id} className="flex justify-between py-2 border-b">
                                <span>{item.name}</span>
                                <span>{new Intl.NumberFormat("vi-VN").format(item.price)}đ</span>
                              </div>
                            )
                          })
                        ) : (
                          <p className="text-muted-foreground text-center py-2">Chưa có thiết bị nào được chọn</p>
                        )}
                      </div>
                    </div>

                    <Separator />

                    <div className="bg-muted p-4 rounded-lg space-y-2">
                      <div className="flex justify-between font-medium">
                        <span>Tổng cộng:</span>
                        <span className="text-lg">{new Intl.NumberFormat("vi-VN").format(totalPrice)}đ</span>
                      </div>
                      <p className="text-xs text-muted-foreground text-right">*Giá đã bao gồm thuế và phí dịch vụ</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact">Thông tin liên hệ</Label>
                      <Input id="contact" placeholder="Số điện thoại hoặc email của bạn" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-4">
                    <Button className="w-full" size="lg">
                      Đặt gói dịch vụ
                    </Button>
                    <Button variant="outline" onClick={handlePrevStep} className="w-full">
                      Quay lại
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
