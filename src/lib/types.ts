export type MarketPrice = {
  id: string;
  crop: string;
  variety: string;
  market: string;
  state: string;
  price: number; // per quintal
  lastUpdated: string;
};

export type GovernmentScheme = {
  id: string;
  name: string;
  description: string;
  eligibility: string;
  documents: string[];
  applicationLink: string;
  deadline: string;
};

export type WeatherData = {
  day: string;
  date: string;
  temp: number;
  condition: 'Sunny' | 'Cloudy' | 'Rainy' | 'Stormy';
  humidity: number;
  windSpeed: number;
};

export type ExtremeWeatherAlert = {
  id: string;
  title: string;
  description: string;
  severity: 'High' | 'Medium' | 'Low';
};

export type Task = {
  id: string;
  title: string;
  date: string;
  category: 'Sowing' | 'Irrigation' | 'Fertilizing' | 'Harvesting' | 'Pest Control';
  completed: boolean;
};

export type Supplier = {
  id: string;
  name: string;
  location: string;
  contact: string;
  products: string[];
  rating: number;
};
