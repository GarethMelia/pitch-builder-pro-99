import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Paperclip } from "lucide-react";

const generateDummyData = () => {
  const data = [];
  for (let i = 9; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      count: Math.floor(Math.random() * 5) + 1,
    });
  }
  return data;
};

const barChartData = generateDummyData();

export function AnalyticsSection() {
  const [counts, setCounts] = useState({
    total: 0,
    drafts: 0,
    completed: 0
  });

  const targetCounts = {
    total: 12,
    drafts: 4,
    completed: 8
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts(prev => ({
        total: prev.total < targetCounts.total ? prev.total + 1 : prev.total,
        drafts: prev.drafts < targetCounts.drafts ? prev.drafts + 1 : prev.drafts,
        completed: prev.completed < targetCounts.completed ? prev.completed + 1 : prev.completed,
      }));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const countCards = [
    {
      title: "TOTAL",
      count: counts.total,
      topColor: "bg-[#1A1F2C]", // Navy Blue
      description: "Track and manage all your business proposals efficiently in one centralized location. Stay organized and never miss a proposal opportunity.",
      accent: "border-[#1A1F2C]"
    },
    {
      title: "DRAFTED",
      count: counts.drafts,
      topColor: "bg-[#F97316]", // Orange
      description: "Keep track of your work-in-progress proposals. These drafts represent opportunities waiting to be refined and completed.",
      accent: "border-[#F97316]"
    },
    {
      title: "COMPLETED",
      count: counts.completed,
      topColor: "bg-[#0EA5E9]", // Teal
      description: "Successfully finalized proposals ready for client presentation. Each one represents a potential business opportunity.",
      accent: "border-[#0EA5E9]"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {countCards.map((card, index) => (
          <div 
            key={card.title}
            className="relative group animate-fade-in"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            {/* Card Container */}
            <div className="relative bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
              {/* Top Square with Paperclip */}
              <div className="absolute -top-4 left-6 z-10">
                <div className={`${card.topColor} w-12 h-12 transform -rotate-6 rounded shadow-md flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{card.count}</span>
                </div>
                <Paperclip 
                  className="absolute -top-2 -right-2 w-6 h-6 text-gray-400 transform rotate-45" 
                />
              </div>

              {/* Card Content */}
              <div className="pt-12 pb-4 px-6">
                <h3 className="text-center font-bold text-gray-800 tracking-wider mb-4">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600 text-center leading-relaxed min-h-[3rem]">
                  {card.description}
                </p>
              </div>

              {/* Bottom Accent Bar */}
              <div className={`h-2 ${card.accent} border-b-4 rounded-b-lg`} />
            </div>
          </div>
        ))}
      </div>

      <Card className="animate-fade-in [animation-delay:600ms]">
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <XAxis 
                  dataKey="date" 
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-md">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Date
                              </span>
                              <span className="font-bold text-sm">
                                {payload[0].payload.date}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
                                Proposals
                              </span>
                              <span className="font-bold text-sm">
                                {payload[0].value}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="currentColor"
                  radius={[4, 4, 0, 0]}
                  className="fill-primary"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}