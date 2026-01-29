'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Home, Plus, MapPin, CreditCard } from 'lucide-react'
import { getAllDevices, type Device } from '@/lib/device-data'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export default function Dashboard() {
  const [devices, setDevices] = useState<Device[]>(getAllDevices())
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)

  const roomsData = [
    {
      name: '客厅',
      devices: devices.filter(d => d.room === '客厅')
    },
    {
      name: '卧室',
      devices: devices.filter(d => d.room === '卧室')
    },
    {
      name: '厨房',
      devices: devices.filter(d => d.room === '厨房')
    },
  ]

  const toggleDevice = (deviceId: string) => {
    setDevices(prevDevices => 
      prevDevices.map(device => 
        device.id === deviceId 
          ? { ...device, status: !device.status }
          : device
      )
    )
  }

  const handlePayment = (amount: number) => {
    const paymentUrl = 'https://buy.stripe.com/test_fZu14ndgP6vF4cGe1aafS02'
    window.open(paymentUrl, '_blank')
    setIsPaymentDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Home className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">智能家居</h1>
                <p className="text-sm text-muted-foreground">控制中心</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                <span className="mr-1.5 h-2 w-2 rounded-full bg-success animate-pulse" />
                系统在线
              </Badge>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                添加设备
              </Button>
              <Button size="sm" className="gap-2" onClick={() => setIsPaymentDialogOpen(true)}>
                <CreditCard className="h-4 w-4" />
                支付
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex gap-6">
            <Link href="/" className="border-b-2 border-primary py-3 px-1 text-sm font-medium text-foreground">
              仪表板
            </Link>
            <Link href="/rooms" className="border-b-2 border-transparent py-3 px-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              房间视图
            </Link>
            <Link href="/analytics" className="border-b-2 border-transparent py-3 px-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              数据分析
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Devices by Room */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-foreground">设备状态</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {roomsData.map((room) => (
              <Card key={room.name} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <MapPin className="h-4 w-4 text-primary" />
                    {room.name}
                  </CardTitle>
                  <CardDescription>{room.devices.length} 个设备</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {room.devices.map((device) => {
                      const DeviceIcon = device.icon
                      return (
                        <div 
                          key={device.id} 
                          className="flex items-center justify-between p-3 rounded-lg bg-card hover:bg-muted/50 transition-colors border border-border group"
                        >
                          <Link 
                            href={`/device/${device.id}`}
                            className="flex items-center gap-3 flex-1"
                          >
                            <div className={`flex h-10 w-10 items-center justify-center rounded-lg transition-all ${device.status ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                              <DeviceIcon className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-medium text-sm text-foreground">{device.name}</p>
                              {device.info && (
                                <p className="text-xs text-muted-foreground">{device.info}</p>
                              )}
                            </div>
                          </Link>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <span className={`h-2 w-2 rounded-full transition-colors ${device.status ? 'bg-success' : 'bg-muted-foreground/40'}`} />
                              <span className="text-xs text-muted-foreground min-w-[32px]">
                                {device.status ? '开启' : '关闭'}
                              </span>
                            </div>
                            <Switch 
                              checked={device.status}
                              onCheckedChange={() => toggleDevice(device.id)}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>选择支付金额</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button 
              className="w-full justify-center py-6 text-lg"
              onClick={() => handlePayment(18)}
            >
              $18 美金
            </Button>
            <Button 
              className="w-full justify-center py-6 text-lg"
              onClick={() => handlePayment(48)}
            >
              $48 美金
            </Button>
            <Button 
              className="w-full justify-center py-6 text-lg"
              onClick={() => handlePayment(98)}
            >
              $98 美金
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
