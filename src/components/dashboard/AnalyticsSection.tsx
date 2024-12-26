import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Proposals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.total}</div>
            <div className="text-xs text-muted-foreground">All proposals</div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in [animation-delay:200ms]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft Proposals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{counts.drafts}</div>
            <div className="text-xs text-muted-foreground">In progress</div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in [animation-delay:400ms]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Proposals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{counts.completed}</div>
            <div className="text-xs text-muted-foreground">Ready to share</div>
          </CardContent>
        </Card>
      </div>

      <Card className="animate-fade-in [animation-delay:600ms]">
        <CardHeader>
          <CardTitle>Proposal Activity</CardTitle>
        </CardHeader>
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