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
      number: "01",
      title: "Total Proposals",
      count: counts.total,
      color: "bg-[#1e3a8a]",
      description: "Track all your business proposals in one place"
    },
    {
      number: "02",
      title: "Draft Proposals",
      count: counts.drafts,
      color: "bg-[#ea580c]",
      description: "Proposals currently in progress awaiting completion"
    },
    {
      number: "03",
      title: "Completed Proposals",
      count: counts.completed,
      color: "bg-[#0d9488]",
      description: "Successfully completed and ready to share proposals"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {countCards.map((card, index) => (
          <div 
            key={card.number}
            className="relative group animate-fade-in"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="absolute -top-3 left-4 z-10">
              <div className={`${card.color} text-white w-10 h-10 flex items-center justify-center rounded-sm shadow-lg`}>
                <span className="font-bold">{card.number}</span>
              </div>
              <Paperclip className="absolute -top-1 -right-1 w-6 h-6 text-gray-400 transform rotate-45" />
            </div>
            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-300 pt-8">
              <CardContent className="space-y-3">
                <h3 className="font-semibold text-lg text-gray-800">{card.title}</h3>
                <p className="text-3xl font-bold">{card.count}</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {card.description}
                </p>
              </CardContent>
            </Card>
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