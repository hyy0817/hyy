import { Lightbulb, Wind, Camera, Speaker, Plug, ThermometerSun, LayoutGrid } from 'lucide-react'

export type DeviceType = 'light' | 'ac' | 'curtain' | 'speaker' | 'camera' | 'heater' | 'plug'

export interface Device {
  id: string
  name: string
  room: string
  type: DeviceType
  status: boolean
  icon: typeof Lightbulb
  info?: string
  brightness?: number
  temperature?: number
  color?: string
}

export const devices: Record<string, Device> = {
  '1': {
    id: '1',
    name: '主灯',
    room: '客厅',
    type: 'light',
    status: true,
    icon: Lightbulb,
    brightness: 80,
    color: '#FFD700'
  },
  '2': {
    id: '2',
    name: '空调',
    room: '客厅',
    type: 'ac',
    status: true,
    icon: Wind,
    temperature: 26,
    info: '制冷 26°C'
  },
  '3': {
    id: '3',
    name: '窗帘',
    room: '客厅',
    type: 'curtain',
    status: false,
    icon: LayoutGrid,
    info: '打开 50%'
  },
  '4': {
    id: '4',
    name: '音响',
    room: '客厅',
    type: 'speaker',
    status: false,
    icon: Speaker
  },
  '5': {
    id: '5',
    name: '床头灯',
    room: '卧室',
    type: 'light',
    status: false,
    icon: Lightbulb,
    brightness: 0
  },
  '6': {
    id: '6',
    name: '音响',
    room: '卧室',
    type: 'speaker',
    status: false,
    icon: Speaker
  },
  '7': {
    id: '7',
    name: '摄像头',
    room: '卧室',
    type: 'camera',
    status: true,
    icon: Camera,
    info: '录制中'
  },
  '8': {
    id: '8',
    name: '空调',
    room: '卧室',
    type: 'ac',
    status: false,
    icon: Wind,
    temperature: 24
  },
  '9': {
    id: '9',
    name: '照明',
    room: '厨房',
    type: 'light',
    status: true,
    icon: Lightbulb,
    brightness: 100
  },
  '10': {
    id: '10',
    name: '热水器',
    room: '厨房',
    type: 'heater',
    status: false,
    icon: ThermometerSun
  },
  '11': {
    id: '11',
    name: '智能插座',
    room: '厨房',
    type: 'plug',
    status: true,
    icon: Plug,
    info: '工作中'
  },
  '12': {
    id: '12',
    name: '照明',
    room: '浴室',
    type: 'light',
    status: false,
    icon: Lightbulb,
    brightness: 0
  },
  '13': {
    id: '13',
    name: '热水器',
    room: '浴室',
    type: 'heater',
    status: true,
    icon: ThermometerSun,
    info: '加热至 45°C',
    temperature: 45
  },
  '14': {
    id: '14',
    name: '排风扇',
    room: '浴室',
    type: 'ac',
    status: false,
    icon: Wind
  }
}

export function getDevice(id: string): Device | undefined {
  return devices[id]
}

export function getAllDevices(): Device[] {
  return Object.values(devices)
}

export function getDevicesByRoom(room: string): Device[] {
  return Object.values(devices).filter(device => device.room === room)
}
