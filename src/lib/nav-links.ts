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
  label: {
    en: string;
    hi: string;
    kn: string;
  };
  icon: LucideIcon;
};

export const navLinks: NavLink[] = [
  {
    href: '/dashboard',
    label: { en: 'Dashboard', hi: 'डैशबोर्ड', kn: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್' },
    icon: LayoutDashboard,
  },
  {
    href: '/disease-detection',
    label: { en: 'Disease Detection', hi: 'रोग पहचान', kn: 'ರೋಗ ಪತ್ತೆ' },
    icon: TestTube2,
  },
  {
    href: '/market-prices',
    label: { en: 'Market Prices', hi: 'बाजार मूल्य', kn: 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು' },
    icon: LineChart,
  },
  {
    href: '/schemes',
    label: { en: 'Govt. Schemes', hi: 'सरकारी योजनाएं', kn: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು' },
    icon: Landmark,
  },
  {
    href: '/weather',
    label: { en: 'Weather', hi: 'मौसम', kn: 'ಹವಾಮಾನ' },
    icon: CloudSun,
  },
  {
    href: '/soil-health',
    label: { en: 'Soil Health', hi: 'मृदा स्वास्थ्य', kn: 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ' },
    icon: Leaf,
  },
  {
    href: '/calendar',
    label: { en: 'Crop Calendar', hi: 'फसल कैलेंडर', kn: 'ಬೆಳೆ ಕ್ಯಾಲೆండర్' },
    icon: Calendar,
  },
  {
    href: '/community',
    label: { en: 'Community Chat', hi: 'सामुदायिक चैट', kn: 'ಸಮುದಾಯ ಚಾಟ್' },
    icon: Users,
  },
  {
    href: '/marketplace',
    label: { en: 'Marketplace', hi: 'बाजार', kn: 'ಮಾರುಕಟ್ಟೆ' },
    icon: Store,
  },
  {
    href: '/finance-tools',
    label: { en: 'Finance Tools', hi: 'वित्त उपकरण', kn: 'ಹಣಕಾಸು ಪರಿಕರಗಳು' },
    icon: Calculator,
  },
];
