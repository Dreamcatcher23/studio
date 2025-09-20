import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  TestTube2,
  LineChart,
  Landmark,
  CloudSun,
  Leaf,
  Calendar,
  Users,
  Store,
  Calculator,
} from 'lucide-react';

export type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const navLinks: NavLink[] = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/disease-detection',
    label: 'Disease Detection',
    icon: TestTube2,
  },
  {
    href: '/market-prices',
    label: 'Market Prices',
    icon: LineChart,
  },
  {
    href: '/schemes',
    label: 'Govt. Schemes',
    icon: Landmark,
  },
  {
    href: '/weather',
    label: 'Weather',
    icon: CloudSun,
  },
  {
    href: '/soil-health',
    label: 'Soil Health',
    icon: Leaf,
  },
  {
    href: '/calendar',
    label: 'Crop Calendar',
    icon: Calendar,
  },
  {
    href: '/community',
    label: 'Community Chat',
    icon: Users,
  },
  {
    href: '/marketplace',
    label: 'Marketplace',
    icon: Store,
  },
  {
    href: '/finance-tools',
    label: 'Finance Tools',
    icon: Calculator,
  },
];
