'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Clock, MapPin, AlertCircle, Lightbulb } from 'lucide-react'
import { getDevice } from '@/lib/device-data'

export default function DeviceDetail() {
  const params = useParams()
  const deviceData = getDevice(params.id as string)
  
  const [isOn, setIsOn] = useState(deviceData?.status ?? false)
  const [brightness, setBrightness] = useState([deviceData?.brightness ?? 75])
  const [temperature, setTemperature] = useState(2)
  const [selectedColor, setSelectedColor] = useState(deviceData?.color ?? '#FFD700')

  useEffect(() => {
    if (deviceData) {
      setIsOn(deviceData.status)
      setBrightness([deviceData.brightness ?? 75])
      setSelectedColor(deviceData.color ?? '#FFD700')
    }
  }, [deviceData])

  if (!deviceData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-destructive" />
              <CardTitle>设备未找到</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">设备 ID {params.id} 不存在</p>
            <Link href="/">
              <Button className="w-full bg-transparent">返回首页</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const DeviceIcon = deviceData.icon
  const isLightDevice = deviceData.type === 'light'
  const deviceTypeLabel = {
    light: '智能灯光',
    ac: '空调',
    curtain: '智能窗帘',
    speaker: '智能音响',
    camera: '摄像头',
    heater: '热水器',
    plug: '智能插座'
  }[deviceData.type]

  const colors = [
    { name: '红色', value: '#FF4444' },
    { name: '橙色', value: '#FF8C00' },
    { name: '黄色', value: '#FFD700' },
    { name: '绿色', value: '#00CC66' },
    { name: '蓝色', value: '#4169E1' },
    { name: '紫色', value: '#9370DB' },
    { name: '白色', value: '#FFFFFF' },
  ]

  const temperatureLabels = ['冷白', '中性', '暖黄']

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-foreground">{deviceData.name}</h1>
              <p className="text-sm text-muted-foreground">{deviceTypeLabel}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Device Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${isOn ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  <DeviceIcon className="h-8 w-8" />
                </div>
                <div>
                  <CardTitle className="text-2xl mb-1">{deviceData.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5" />
                    {deviceData.room}
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                <span className="mr-1.5 h-2 w-2 rounded-full bg-success animate-pulse" />
                在线
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              最后活动: 2分钟前
            </div>
          </CardContent>
        </Card>

        {/* Power Control */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">电源控制</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">设备开关</p>
                <p className="text-sm text-muted-foreground">控制设备开启或关闭</p>
              </div>
              <Switch checked={isOn} onCheckedChange={setIsOn} />
            </div>
          </CardContent>
        </Card>

        {/* Brightness Control - Only for lights */}
        {isLightDevice && (
          <Card className={`mb-6 transition-opacity ${!isOn ? 'opacity-50' : ''}`}>
            <CardHeader>
              <CardTitle className="text-lg">亮度控制</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">亮度</span>
                  <span className="text-sm font-medium text-foreground">{brightness[0]}%</span>
                </div>
                <Slider 
                  value={brightness} 
                  onValueChange={setBrightness}
                  max={100}
                  step={1}
                  disabled={!isOn}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Color Temperature - Only for lights */}
        {isLightDevice && (
          <Card className={`mb-6 transition-opacity ${!isOn ? 'opacity-50' : ''}`}>
            <CardHeader>
              <CardTitle className="text-lg">色温控制</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  {temperatureLabels.map((label, index) => (
                    <button
                      key={label}
                      onClick={() => setTemperature(index)}
                      disabled={!isOn}
                      className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all font-medium text-sm
                        ${temperature === index 
                          ? 'border-primary bg-primary text-primary-foreground' 
                          : 'border-border bg-card text-foreground hover:border-primary/50'
                        }
                        ${!isOn ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Color Selection - Only for lights */}
        {isLightDevice && (
          <Card className={`mb-6 transition-opacity ${!isOn ? 'opacity-50' : ''}`}>
            <CardHeader>
              <CardTitle className="text-lg">颜色选择</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3 flex-wrap">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    disabled={!isOn}
                    className={`h-12 w-12 rounded-full transition-all ${
                      selectedColor === color.value 
                        ? 'ring-4 ring-primary ring-offset-2 ring-offset-background scale-110' 
                        : 'hover:scale-105'
                    } ${!isOn ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Timer Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">定时设置</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">每天22:30自动调暗</p>
                  <p className="text-sm text-muted-foreground">亮度降至30%</p>
                </div>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">日落后自动开启</p>
                  <p className="text-sm text-muted-foreground">根据当地日落时间</p>
                </div>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
