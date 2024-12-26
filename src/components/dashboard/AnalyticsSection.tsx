import { useEffect, useState } from "react";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Drafts", value: 4 },
  { name: "Completed", value: 8 },
];

const COLORS = ["#0088FE", "#00C49F"];

export function AnalyticsSection() {
  const [count, setCount] = useState(0);
  const totalProposals = 12;

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev < totalProposals) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div className="p-6 rounded-lg border bg-card">
        <h3 className="text-xl font-semibold mb-4">Total Proposals</h3>
        <div className="text-4xl font-bold text-primary">{count}</div>
      </div>
      <div className="p-6 rounded-lg border bg-card">
        <h3 className="text-xl font-semibold mb-4">Proposal Status</h3>
        <ChartContainer className="w-full aspect-square" config={{}}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <ChartLegend
          className="mt-4"
          payload={data.map((entry, index) => ({
            value: entry.name,
            color: COLORS[index],
          }))}
        >
          <ChartLegendContent />
        </ChartLegend>
      </div>
    </div>
  );
}