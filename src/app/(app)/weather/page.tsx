"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { mockWeatherForecast, mockExtremeWeatherAlert } from "@/lib/mock-data";
import { CloudSun, Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const WeatherIcon = ({ condition, className }: { condition: string, className?: string }) => {
    switch (condition) {
        case 'Sunny': return <Sun className={className} />;
        case 'Cloudy': return <Cloud className={className} />;
        case 'Rainy': return <CloudRain className={className} />;
        case 'Stormy': return <CloudRain className={className} />; // Or a different icon
        default: return <CloudSun className={className} />;
    }
};

const translations = {
  title: {
    en: "Hyper-local Weather Forecast",
    hi: "अति-स्थानीय मौसम पूर्वानुमान",
    kn: "ಹೈಪರ್-ಲೋಕಲ್ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ",
  },
  description: {
    en: "Stay updated with the latest weather conditions and alerts for your area.",
    hi: "अपने क्षेत्र के लिए नवीनतम मौसम की स्थिति और अलर्ट से अपडेट रहें।",
    kn: "ನಿಮ್ಮ ಪ್ರದೇಶಕ್ಕಾಗಿ ಇತ್ತೀಚಿನ ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳು ಮತ್ತು ಎಚ್ಚರಿಕೆಗಳೊಂದಿಗೆ ನವೀಕೃತರಾಗಿರಿ.",
  },
  currentWeather: {
    en: "Current Weather",
    hi: "वर्तमान मौसम",
    kn: "ಪ್ರಸ್ತುತ ಹವಾಮಾನ",
  },
  sevenDayForecast: {
    en: "7-Day Forecast",
    hi: "7-दिन का पूर्वानुमान",
    kn: "7-ದಿನದ ಮುನ್ಸೂಚನೆ",
  },
  // Days of the week
  Today: { en: 'Today', hi: 'आज', kn: 'ಇಂದು' },
  Fri: { en: 'Fri', hi: 'शुक्र', kn: 'ಶುಕ್ರ' },
  Sat: { en: 'Sat', hi: 'शनि', kn: 'ಶನಿ' },
  Sun: { en: 'Sun', hi: 'रवि', kn: 'ಭಾನು' },
  Mon: { en: 'Mon', hi: 'सोम', kn: 'ಸೋಮ' },
  Tue: { en: 'Tue', hi: 'मंगल', kn: 'ಮಂಗಳ' },
  Wed: { en: 'Wed', hi: 'बुध', kn: 'ಬುಧ' },
};

export default function WeatherPage() {
    const { t } = useLanguage();
    const currentWeather = mockWeatherForecast[0];

    const getDayTranslation = (day: string) => {
        const dayKey = day as keyof typeof translations;
        if (translations[dayKey]) {
            return t(translations[dayKey] as { en: string; hi: string; kn: string });
        }
        return day;
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <CloudSun className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>{t(translations.title)}</CardTitle>
                            <CardDescription>{t(translations.description)}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {mockExtremeWeatherAlert && (
                <Alert variant={mockExtremeWeatherAlert.severity === 'High' ? 'destructive' : 'default'} className="bg-accent/20 border-accent">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>{mockExtremeWeatherAlert.title}</AlertTitle>
                    <AlertDescription>{mockExtremeWeatherAlert.description}</AlertDescription>
                </Alert>
            )}

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle>{t(translations.currentWeather)}</CardTitle>
                        <CardDescription>{getDayTranslation(currentWeather.day)}, {currentWeather.date}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center space-y-4">
                        <WeatherIcon condition={currentWeather.condition} className="h-24 w-24 text-accent" />
                        <p className="text-6xl font-bold">{currentWeather.temp}°C</p>
                        <p className="text-xl text-muted-foreground">{currentWeather.condition}</p>
                        <div className="flex justify-around w-full pt-4 text-sm">
                            <div className="flex items-center gap-2">
                                <Droplets className="h-5 w-5 text-muted-foreground" />
                                <span>{currentWeather.humidity}%</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Wind className="h-5 w-5 text-muted-foreground" />
                                <span>{currentWeather.windSpeed} km/h</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>{t(translations.sevenDayForecast)}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {mockWeatherForecast.map((forecast, index) => (
                                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-card">
                                    <div className="flex items-center gap-4">
                                        <WeatherIcon condition={forecast.condition} className="h-8 w-8 text-muted-foreground" />
                                        <div>
                                            <p className="font-semibold">{getDayTranslation(forecast.day)}</p>
                                            <p className="text-sm text-muted-foreground">{forecast.condition}</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold text-lg">{forecast.temp}°C</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
