
import { Machine, Alarm, User } from './types';

export const INITIAL_MACHINES: Machine[] = [
  {
    id: 'm4',
    name: 'UV扫描式平板喷墨机',
    model: 'MJ-UV-Flat',
    status: 'running',
    speed: 25.60,
    width: '2500x1300mm',
    outputHourly: 150,
    totalArea: 5610,
    image: 'https://s21.ax1x.com/2025/11/20/pZFm6nf.png',
    temperature: 35,
    humidity: 40,
    voltage: 220,
    openRate: 60,
    params: [
      { name: '电流', value: 30, unit: 'A' },
      { name: '电压', value: 220, unit: 'V' },
      { name: '墨路压力', value: -3.0, unit: 'kPa' },
      { name: '负压系统', value: '波动', unit: '' }
    ],
    workOrders: [
      { id: 'WO-2025-033', product: '亚克力板', quantity: 500, status: 'pending' },
      { id: 'WO-2025-032', product: '手机外壳', quantity: 2000, status: 'completed' }
    ],
    maintenanceLog: [
      { id: 'MR-401', date: '2025-11-17', type: '紧急维修', technician: '周工', description: '检查负压泵异常波动', status: 'pending' },
      { id: 'MR-402', date: '2025-10-05', type: '更换配件', technician: '吴工', description: '更换X轴光栅尺', status: 'completed' }
    ]
  },
  {
    id: 'm1',
    name: '数码标签机',
    model: 'MJ-L1000',
    status: 'debugging',
    speed: 0,
    width: '330mm',
    outputHourly: 0,
    totalArea: 15420,
    image: 'https://s21.ax1x.com/2025/11/20/pZFmsjP.png',
    temperature: 42,
    humidity: 55,
    voltage: 220,
    openRate: 92,
    params: [
      { name: '电流', value: 45, unit: 'A' },
      { name: '电压', value: 220, unit: 'V' },
      { name: '墨路压力', value: -3.5, unit: 'kPa' },
      { name: 'UV功率', value: 0, unit: '%' }
    ],
    workOrders: [
      { id: 'WO-2025-001', product: '食品标签', quantity: 50000, status: 'processing' },
      { id: 'WO-2025-002', product: '饮料标贴', quantity: 30000, status: 'pending' }
    ],
    maintenanceLog: [
      { id: 'MR-101', date: '2025-10-15', type: '常规保养', technician: '张工', description: '更换UV灯管，清洁喷头', status: 'completed' },
      { id: 'MR-102', date: '2025-09-10', type: '故障维修', technician: '李工', description: '修复输纸带偏差', status: 'completed' }
    ]
  },
  {
    id: 'm2',
    name: '陶瓷通过式喷墨机D8',
    model: 'MJ-C-D8',
    status: 'debugging',
    speed: 0,
    width: '800mm',
    outputHourly: 0,
    totalArea: 28900,
    image: 'https://s21.ax1x.com/2025/11/20/pZFmwhd.jpg',
    temperature: 45,
    humidity: 60,
    voltage: 380,
    openRate: 88,
    params: [
      { name: '电流', value: 60, unit: 'A' },
      { name: '电压', value: 380, unit: 'V' },
      { name: '墨路压力', value: -4.2, unit: 'kPa' },
      { name: '清洗状态', value: '调试', unit: '' }
    ],
    workOrders: [
      { id: 'WO-2025-015', product: '地砖 800x800', quantity: 2000, status: 'processing' },
      { id: 'WO-2025-014', product: '墙砖 400x800', quantity: 5000, status: 'completed' }
    ],
    maintenanceLog: [
      { id: 'MR-201', date: '2025-11-01', type: '系统升级', technician: '王工', description: '控制软件版本升级至v3.5', status: 'completed' },
      { id: 'MR-202', date: '2025-08-20', type: '季度保养', technician: '赵工', description: '墨路系统全面清洗', status: 'completed' }
    ]
  },
  {
    id: 'm3',
    name: '陶瓷通过式喷墨机D10',
    model: 'MJ-C-D10',
    status: 'debugging',
    speed: 0,
    width: '1000mm',
    outputHourly: 0,
    totalArea: 12500,
    image: 'https://s21.ax1x.com/2025/11/20/pZFmB9A.jpg',
    temperature: 28,
    humidity: 45,
    voltage: 380,
    openRate: 75,
    params: [
      { name: '电流', value: 0, unit: 'A' },
      { name: '电压', value: 380, unit: 'V' },
      { name: '墨路压力', value: -4.0, unit: 'kPa' },
      { name: '待机时长', value: 2.5, unit: 'h' }
    ],
    workOrders: [
      { id: 'WO-2025-021', product: '岩板 1200x2400', quantity: 1000, status: 'pending' }
    ],
    maintenanceLog: [
      { id: 'MR-301', date: '2025-11-10', type: '例行检查', technician: '孙工', description: '检查皮带张力，校准传感器', status: 'completed' }
    ]
  }
];

export const INITIAL_ALARMS: Alarm[] = [
  { id: 'a1', machineId: 'm4', time: '2025-11-17 10:30', type: 'UV灯温度过高', status: 'resolved', severity: 'medium' },
  { id: 'a2', machineId: 'm2', time: '2025-11-17 09:15', type: '墨路压力波动', status: 'resolved', severity: 'medium' },
  { id: 'a3', machineId: 'm1', time: '2025-11-16 14:20', type: '网络延迟', status: 'resolved', severity: 'low' },
  { id: 'a4', machineId: 'm4', time: '2025-11-17 11:05', type: '负压异常', status: 'resolved', severity: 'high' }
];

export const INITIAL_USERS: User[] = [
  { id: 'u1', username: 'admin', role: '系统管理员', lastLogin: '2025-11-17 09:45', status: 'active' },
  { id: 'u2', username: 'operator_wang', role: '操作员', lastLogin: '2025-11-17 08:00', status: 'active' },
  { id: 'u3', username: 'manager_li', role: '生产主管', lastLogin: '2025-11-16 17:30', status: 'active' },
  { id: 'u4', username: 'guest', role: '访客', lastLogin: '2025-11-10 10:00', status: 'disabled' },
];
