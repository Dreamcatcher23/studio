import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { mockWeatherForecast, mockExtremeWeatherAlert } from "@/lib/mock-data";
import { CloudSun, Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, AlertTriangle } from "lucide-react";

const WeatherIcon = ({ condition, className }: { condition: string, className?: string }) => {
    switch (condition) {
        case 'Sunny': return <Sun className={className} />;
        case 'Cloudy': return <Cloud className={className} />;
        case 'Rainy': return <CloudRain className={className} />;
        case 'Stormy': return <CloudRain className={className} />; // Or a different icon
        default: return <CloudSun className={className} />;
    }
};

export default function WeatherPage() {
    const currentWeather = mockWeatherForecast[0];

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <CloudSun className="h-8 w-8 text-primary" />
                        <div>
                            <CardTitle>Hyper-local Weather Forecast</CardTitle>
                            <CardDescription>Stay updated with the latest weather conditions and alerts for your area.</CardDescription>
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
                        <CardTitle>Current Weather</CardTitle>
                        <CardDescription>{currentWeather.day}, {currentWeather.date}</CardDescription>
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
                        <CardTitle>7-Day Forecast</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {mockWeatherForecast.map((forecast, index) => (
                                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-card">
                                    <div className="flex items-center gap-4">
                                        <WeatherIcon condition={forecast.condition} className="h-8 w-8 text-muted-foreground" />
                                        <div>
                                            <p className="font-semibold">{forecast.day}</p>
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
