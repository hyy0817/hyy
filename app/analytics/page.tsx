'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Home, TrendingDown, Activity, Zap, Lightbulb, Wind, Plug } from 'lucide-react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

export default function Analytics() {
  const energyData = [
    { day: '周一', energy: 3.5 },
    { day: '周二', energy: 2.8 },
    { day: '周三', energy: 3.2 },
    { day: '周四', energy: 2.9 },
    { day: '周五', energy: 3.1 },
    { day: '周六', energy: 4.2 },
    { day: '周日', energy: 3.8 },
  ]

  const deviceUsage = [
    { name: '客厅主灯', hours: 8.2, icon: Lightbulb, color: 'bg-chart-1' },
    { name: '卧室空调', hours: 6.5, icon: Wind, color: 'bg-chart-2' },
    { name: '智能插座', hours: 4.3, icon: Plug, color: 'bg-chart-3' },
    { name: '厨房照明', hours: 3.8, icon: Lightbulb, color: 'bg-chart-4' },
    { name: '音响系统', hours: 2.1, icon: Activity, color: 'bg-chart-5' },
  ]



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
            <Link href="/rooms" className="border-b-2 border-transparent py-3 px-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              房间视图
            </Link>
            <Link href="/analytics" className="border-b-2 border-primary py-3 px-1 text-sm font-medium text-foreground">
              数据分析
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground">数据分析</h2>
          <p className="text-sm text-muted-foreground mt-1">查看能耗统计和设备使用情况</p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>今日能耗</CardDescription>
              <CardTitle className="text-3xl">3.2 kWh</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm">
                <TrendingDown className="h-4 w-4 text-success" />
                <span className="text-success font-medium">↓ 15%</span>
                <span className="text-muted-foreground">较昨日</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>设备在线率</CardDescription>
              <CardTitle className="text-3xl">98%</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm">
                <Activity className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">14/14 设备在线</span>
              </div>
            </CardContent>
          </Card>


        </div>

        {/* Energy Trend Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>能耗趋势 (7天)</CardTitle>
            <CardDescription>每日电量消耗统计</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                energy: {
                  label: '能耗 (kWh)',
                  color: 'hsl(var(--chart-1))',
                },
              }}
              className="h-[300px] w-full"
            >
              <AreaChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="day" 
                  className="text-xs"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  className="text-xs"
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  label={{ value: 'kWh', angle: -90, position: 'insideLeft' }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="energy"
                  stroke="hsl(var(--chart-1))"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Device Usage Ranking */}
          <Card>
            <CardHeader>
              <CardTitle>设备使用排名</CardTitle>
              <CardDescription>每日平均使用时长</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deviceUsage.map((device, index) => {
                  const Icon = device.icon
                  const maxHours = Math.max(...deviceUsage.map(d => d.hours))
                  const percentage = (device.hours / maxHours) * 100
                  
                  return (
                    <div key={device.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${device.color} text-white`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-foreground">{device.name}</p>
                            <p className="text-xs text-muted-foreground">{device.hours} 小时/天</p>
                          </div>
                        </div>
                        <Badge variant="secondary">#{index + 1}</Badge>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div 
                          className={`h-full ${device.color} transition-all`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
