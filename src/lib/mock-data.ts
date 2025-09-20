import type { MarketPrice, GovernmentScheme, WeatherData, ExtremeWeatherAlert, Task, Supplier } from './types';

export const mockMarketPrices: MarketPrice[] = [
  { id: '1', crop: 'Paddy', variety: 'Fine', market: 'Bengaluru', state: 'Karnataka', price: 2100, lastUpdated: 'Today' },
  { id: '2', crop: 'Wheat', variety: 'Lokwan', market: 'Mysuru', state: 'Karnataka', price: 2350, lastUpdated: 'Today' },
  { id: '3', crop: 'Ragi', variety: 'Local', market: 'Hubli', state: 'Karnataka', price: 3400, lastUpdated: 'Yesterday' },
  { id: '4', crop: 'Tomato', variety: 'Hybrid', market: 'Delhi', state: 'Delhi', price: 1500, lastUpdated: 'Today' },
  { id: '5', crop: 'Onion', variety: 'Red', market: 'Mumbai', state: 'Maharashtra', price: 2800, lastUpdated: 'Today' },
];

export const mockSchemes: GovernmentScheme[] = [
  {
    id: '1',
    name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    description: 'An actuarial premium based scheme where farmer has to pay maximum premium of 2 percent for Kharif, 1.5 percent for Rabi and 5 percent for horticulture and commercial crops.',
    eligibility: 'All farmers including sharecroppers and tenant farmers growing notified crops in the notified areas are eligible for coverage.',
    documents: ['Aadhaar card', 'Bank passbook', 'Land records'],
    applicationLink: '#',
    deadline: '2024-07-31',
  },
  {
    id: '2',
    name: 'Kisan Credit Card (KCC)',
    description: 'The KCC scheme was introduced to ensure that farmers have access to timely and adequate credit. The credit can be used for various agricultural and allied activities.',
    eligibility: 'All farmers, individuals/joint borrowers, tenant farmers, oral lessees, and sharecroppers are eligible.',
    documents: ['Identity proof', 'Address proof', 'Land documents'],
    applicationLink: '#',
    deadline: 'N/A',
  },
];

export const mockWeatherForecast: WeatherData[] = [
    { day: 'Today', date: 'Jul 18', temp: 28, condition: 'Cloudy', humidity: 75, windSpeed: 15 },
    { day: 'Fri', date: 'Jul 19', temp: 26, condition: 'Rainy', humidity: 85, windSpeed: 20 },
    { day: 'Sat', date: 'Jul 20', temp: 27, condition: 'Rainy', humidity: 82, windSpeed: 18 },
    { day: 'Sun', date: 'Jul 21', temp: 29, condition: 'Sunny', humidity: 70, windSpeed: 12 },
    { day: 'Mon', date: 'Jul 22', temp: 30, condition: 'Sunny', humidity: 68, windSpeed: 10 },
    { day: 'Tue', date: 'Jul 23', temp: 28, condition: 'Cloudy', humidity: 72, windSpeed: 14 },
    { day: 'Wed', date: 'Jul 24', temp: 27, condition: 'Rainy', humidity: 80, windSpeed: 17 },
];

export const mockExtremeWeatherAlert: ExtremeWeatherAlert = {
    id: '1',
    title: 'Heavy Rainfall Warning',
    description: 'Heavy to very heavy rainfall expected in the next 48 hours. Take necessary precautions for your crops and livestock.',
    severity: 'High',
};

export const mockTasks: Task[] = [
    { id: '1', title: 'Start paddy nursery sowing', date: '2024-07-20', category: 'Sowing', completed: false },
    { id: '2', title: 'Irrigate wheat fields', date: '2024-07-22', category: 'Irrigation', completed: false },
    { id: '3', title: 'Apply first dose of fertilizer to maize', date: '2024-07-25', category: 'Fertilizing', completed: true },
    { id: '4', title: 'Scout for pests in cotton crop', date: '2024-07-28', category: 'Pest Control', completed: false },
];

export const mockSuppliers: Supplier[] = [
    { id: '1', name: 'Karnataka Seeds Corp', location: 'Bengaluru', contact: '080-12345678', products: ['Seeds', 'Bio-fertilizers'], rating: 4.5 },
    { id: '2', name: 'Agro Inputs Mysuru', location: 'Mysuru', contact: '0821-87654321', products: ['Fertilizers', 'Pesticides', 'Tools'], rating: 4.2 },
    { id: '3', name: 'Hubli Farm Solutions', location: 'Hubli', contact: '0836-11223344', products: ['All farm inputs'], rating: 4.8 },
];
