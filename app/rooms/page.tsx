'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Home, Lightbulb, Wind, Camera, Speaker, Plug, ThermometerSun, LayoutGrid } from 'lucide-react'

export default function Rooms() {
  const [activeRoom, setActiveRoom] = useState('living-room')

  const rooms = {
    'living-room': {
      name: '客厅',
      devices: [
        { id: '1', name: '主灯', icon: Lightbulb, status: true, info: '亮度 80%' },
        { id: '2', name: '空调', icon: Wind, status: true, info: '制冷 26°C' },
        { id: '3', name: '窗帘', icon: LayoutGrid, status: false, info: '打开 50%' },
        { id: '4', name: '音响', icon: Speaker, status: false, info: '关闭' },
      ]
    },
    'bedroom': {
      name: '卧室',
      devices: [
        { id: '5', name: '床头灯', icon: Lightbulb, status: false, info: '关闭' },
        { id: '6', name: '音响', icon: Speaker, status: false, info: '关闭' },
        { id: '7', name: '摄像头', icon: Camera, status: true, info: '录制中' },
        { id: '8', name: '空调', icon: Wind, status: false, info: '关闭' },
      ]
    },
    'kitchen': {
      name: '厨房',
      devices: [
        { id: '9', name: '照明', icon: Lightbulb, status: true, info: '亮度 100%' },
        { id: '10', name: '热水器', icon: ThermometerSun, status: false, info: '关闭' },
        { id: '11', name: '智能插座', icon: Plug, status: true, info: '工作中' },
      ]
    },
    'bathroom': {
      name: '浴室',
      devices: [
        { id: '12', name: '照明', icon: Lightbulb, status: false, info: '关闭' },
        { id: '13', name: '热水器', icon: ThermometerSun, status: true, info: '加热至 45°C' },
        { id: '14', name: '排风扇', icon: Wind, status: false, info: '关闭' },
      ]
    }
  }

  const currentRoom = rooms[activeRoom as keyof typeof rooms]
  const onlineDevices = currentRoom.devices.filter(d => d.status).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Home className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">智能家居</h1>
              <p className="text-sm text-muted-foreground">控制中心</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex gap-6">
            <Link href="/" className="border-b-2 border-transparent py-3 px-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              仪表板
            </Link>
            <Link href="/rooms" className="border-b-2 border-primary py-3 px-1 text-sm font-medium text-foreground">
              房间视图
            </Link>
            <Link href="/analytics" className="border-b-2 border-transparent py-3 px-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              数据分析
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground">房间视图</h2>
          <p className="text-sm text-muted-foreground mt-1">按空间管理您的智能设备</p>
        </div>

        <Tabs value={activeRoom} onValueChange={setActiveRoom} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="living-room">客厅</TabsTrigger>
            <TabsTrigger value="bedroom">卧室</TabsTrigger>
            <TabsTrigger value="kitchen">厨房</TabsTrigger>
            <TabsTrigger value="bathroom">浴室</TabsTrigger>
          </TabsList>

          {Object.entries(rooms).map(([key, room]) => (
            <TabsContent key={key} value={key} className="space-y-6">
              {/* Room Overview */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">{room.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {room.devices.length} 个设备 · {onlineDevices} 个在线
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                      <span className="mr-1.5 h-2 w-2 rounded-full bg-primary" />
                      {Math.round((onlineDevices / room.devices.length) * 100)}% 在线率
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Visual Room Layout */}
                  <div className="relative aspect-[16/10] rounded-xl bg-gradient-to-br from-muted/40 via-muted/20 to-background border-2 border-border mb-6 overflow-hidden">
                    {/* Room label */}
                    <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border shadow-sm">
                      <p className="text-xs font-medium text-muted-foreground">{room.name}</p>
                    </div>

                    {/* Grid pattern background */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                      backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                      backgroundSize: '30px 30px'
                    }} />

                    {/* Device Icons positioned around the room */}
                    {room.devices.map((device, idx) => {
                      const Icon = device.icon
                      const positions = [
                        { top: '15%', left: '15%' },
                        { top: '15%', right: '15%' },
                        { bottom: '20%', left: '20%' },
                        { bottom: '20%', right: '20%' },
                      ]
                      const position = positions[idx] || positions[0]
                      
                      return (
                        <div 
                          key={device.id}
                          className="absolute group cursor-pointer"
                          style={position}
                        >
                          <Link href={`/device/${device.id}`}>
                            <div className={`relative flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 hover:scale-110 ${
                              device.status 
                                ? 'bg-primary/20 border-2 border-primary shadow-lg shadow-primary/20' 
                                : 'bg-card border-2 border-border shadow-md'
                            }`}>
                              <Icon className={`h-7 w-7 ${device.status ? 'text-primary' : 'text-muted-foreground'}`} />
                              {device.status && (
                                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-success border-2 border-background animate-pulse" />
                              )}
                            </div>
                            {/* Device name tooltip */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-card/95 backdrop-blur-sm border border-border rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                              <p className="text-xs font-medium text-foreground">{device.name}</p>
                              <p className="text-xs text-muted-foreground">{device.status ? '开启' : '关闭'}</p>
                            </div>
                          </Link>
                        </div>
                      )
                    })}

                    {/* Center room icon */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-card/30 backdrop-blur-sm border border-border/50">
                        <LayoutGrid className="h-12 w-12 text-muted-foreground/40" />
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2 mb-6">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      全部开启
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      全部关闭
                    </Button>
                  </div>

                  {/* Device List */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground mb-3">{room.name}设备列表</h3>
                    {room.devices.map((device) => {
                      const Icon = device.icon
                      return (
                        <Link
                          key={device.id}
                          href={`/device/${device.id}`}
                          className="block"
                        >
                          <Card className="transition-all hover:shadow-md hover:border-primary/50">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 flex-1">
                                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                                    device.status 
                                      ? 'bg-primary/10 text-primary' 
                                      : 'bg-muted text-muted-foreground'
                                  }`}>
                                    <Icon className="h-6 w-6" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <p className="font-semibold text-foreground">{device.name}</p>
                                      <span className={`h-2 w-2 rounded-full ${
                                        device.status ? 'bg-success' : 'bg-muted-foreground/40'
                                      }`} />
                                    </div>
                                    <p className="text-sm text-muted-foreground">{device.info}</p>
                                  </div>
                                </div>
                                <Badge variant={device.status ? 'default' : 'secondary'}>
                                  {device.status ? '开启' : '关闭'}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  )
}
