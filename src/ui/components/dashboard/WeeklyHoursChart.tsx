import { useMemo } from "react";
import type { TimeEntry } from "@/domain/timeEntry/timeEntry.entity";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
    type ChartConfig,
} from "@/ui/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { BarChart2 } from "lucide-react";

const PROJECT_COLORS = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-4)",
    "var(--chart-5)",
    "var(--chart-3)",
];

function getWeekDays(): { iso: string; label: string }[] {
    const today = new Date();
    const dow = today.getDay(); // 0=Sun
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((dow + 6) % 7));

    return Array.from({ length: 7 }, (_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        const iso = d.toISOString().slice(0, 10);
        const label = d.toLocaleDateString("es-ES", { weekday: "short", day: "2-digit", month: "short" });
        return { iso, label };
    });
}

interface WeeklyHoursChartProps {
    entries: TimeEntry[];
    loading: boolean;
}

export function WeeklyHoursChart({ entries, loading }: WeeklyHoursChartProps) {
    const weekDays = useMemo(() => getWeekDays(), []);

    const { chartData, chartConfig, projectKeys, totalHours } = useMemo(() => {
        const projectMap = new Map<string, string>();
        entries.forEach((e) => {
            if (!projectMap.has(e.project.id.value)) {
                projectMap.set(e.project.id.value, e.project.name);
            }
        });

        const projectIds = Array.from(projectMap.keys());
        const keys = projectIds.map((id) => `p_${id.replace(/-/g, "_")}`);

        const config: ChartConfig = {};
        projectIds.forEach((id, i) => {
            config[`p_${id.replace(/-/g, "_")}`] = {
                label: projectMap.get(id) ?? id,
                color: PROJECT_COLORS[i % PROJECT_COLORS.length],
            };
        });

        const data = weekDays.map(({ iso, label }) => {
            const row: Record<string, string | number> = { day: label };
            projectIds.forEach((id, i) => {
                const key = keys[i];
                const hours = entries
                    .filter((e) => e.date === iso && e.project.id.value === id)
                    .reduce((sum, e) => sum + e.hour, 0);
                row[key] = hours;
            });
            return row;
        });

        const total = entries.reduce((sum, e) => sum + e.hour, 0);

        return { chartData: data, chartConfig: config, projectKeys: keys, totalHours: total };
    }, [entries, weekDays]);

    if (loading) {
        return (
            <div className="rounded-2xl border bg-card ring-1 ring-foreground/10 p-6 space-y-3">
                <div className="h-5 w-48 bg-muted animate-pulse rounded" />
                <div className="h-48 w-full bg-muted animate-pulse rounded-xl" />
            </div>
        );
    }

    return (
        <div className="rounded-2xl border bg-card ring-1 ring-foreground/10 p-6 space-y-4">
            <div>
                <h3 className="font-semibold text-base flex items-center gap-2">
                    <BarChart2 className="size-4 text-muted-foreground" />
                    Horas Imputadas — <span className="text-muted-foreground font-normal">Semana actual</span>
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                    Total: <span className="font-bold text-foreground">{totalHours}h</span>
                    {" "}— Todas las imputaciones
                </p>
            </div>

            <ChartContainer config={chartConfig} className="h-56 w-full">
                <BarChart data={chartData} barCategoryGap="30%">
                    <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border" />
                    <XAxis
                        dataKey="day"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11 }}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 11 }}
                        tickFormatter={(v) => `${v}h`}
                    />
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    {projectKeys.map((key, i) => (
                        <Bar
                            key={key}
                            dataKey={key}
                            stackId="hours"
                            fill={`var(--color-${key})`}
                            radius={i === projectKeys.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                        />
                    ))}
                </BarChart>
            </ChartContainer>
        </div>
    );
}
