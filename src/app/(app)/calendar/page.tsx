"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockTasks } from "@/lib/mock-data";
import { Calendar as CalendarIcon, CheckCircle2, Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/language-context";

const translations = {
  title: {
    en: "Task Planner / Crop Calendar",
    hi: "कार्य योजनाकार / फसल कैलेंडर",
    kn: "ಕಾರ್ಯ ಯೋಜಕ / ಬೆಳೆ ಕ್ಯಾಲೆಂಡರ್",
  },
  description: {
    en: "Schedule and track all your farming tasks in one place.",
    hi: "अपने सभी कृषि कार्यों को एक ही स्थान पर शेड्यूल और ट्रैक करें।",
    kn: "ನಿಮ್ಮ ಎಲ್ಲಾ ಕೃಷಿ ಕಾರ್ಯಗಳನ್ನು ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ ನಿಗದಿಪಡಿಸಿ ಮತ್ತು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.",
  },
  noTasks: {
    en: "No tasks scheduled. Time to plan your season!",
    hi: "कोई कार्य निर्धारित नहीं है। अपनी ऋतु की योजना बनाने का समय!",
    kn: "ಯಾವುದೇ ಕಾರ್ಯಗಳನ್ನು ನಿಗದಿಪಡಿಸಲಾಗಿಲ್ಲ. ನಿಮ್ಮ ಋತುವನ್ನು ಯೋಜಿಸಲು ಸಮಯ!",
  },
};

export default function CalendarPage() {
  const { t } = useLanguage();
  const sortedTasks = [...mockTasks].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <CalendarIcon className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>{t(translations.title)}</CardTitle>
              <CardDescription>{t(translations.description)}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {sortedTasks.length > 0 ? sortedTasks.map(task => (
              <div key={task.id} className="flex items-start gap-4 p-4 rounded-lg bg-card hover:bg-background transition-colors">
                {task.completed ? (
                    <CheckCircle2 className="h-6 w-6 text-green-500 mt-1" />
                ) : (
                    <Circle className="h-6 w-6 text-muted-foreground mt-1" />
                )}
                <div className="flex-1">
                  <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{new Date(task.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <Badge variant="secondary">{task.category}</Badge>
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center text-muted-foreground p-8">
                <p>{t(translations.noTasks)}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
