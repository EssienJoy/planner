import { useLoaderData } from "react-router"
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts"
import {
	CheckCircle2,
	Circle,
	ClipboardList,
	Clock,
	TrendingUp,
} from "lucide-react"

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components"

function Dashboard() {
	const CHART = {
		primary: "#7F228F",
		secondary: "#A182DE",
		danger: "#DC2626",
		grid: "#E5E5E5",
		muted: "#737373",
	}
	const { overview } = useLoaderData()
	const { plansTotal, totals, byDay, today } = overview

	const metrics = [
		{ label: "Total Tasks", value: totals.total, icon: ClipboardList },
		{ label: "Completed", value: totals.completed, icon: CheckCircle2 },
		{ label: "Pending", value: totals.pending, icon: Clock },
		{
			label: "Completion",
			value: `${totals.completionRate}%`,
			icon: TrendingUp,
		},
	]

	const statusData = [
		{ name: "Completed", value: totals.completed, fill: CHART.primary },
		{ name: "Pending", value: totals.pending, fill: CHART.secondary },
		{ name: "Overdue", value: totals.overdue, fill: CHART.danger },
	]

	return (
		<div>
			<div className="mb-6">
				<p className="w-fit rounded-full bg-primary-subtle px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
					Overview
				</p>
				<h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
					Dashboard
				</h1>
				<p className="mt-2 text-sm text-foreground-muted sm:text-base">
					Across {plansTotal} plan{plansTotal === 1 ? "" : "s"} —
					here&apos;s how your work is moving.
				</p>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{metrics.map((metric) => (
					<Card key={metric.label}>
						<CardHeader className="flex flex-row items-center justify-between pb-2">
							<CardTitle className="text-sm font-medium text-foreground-muted">
								{metric.label}
							</CardTitle>
							<metric.icon className="size-4 text-foreground-muted" />
						</CardHeader>
						<CardContent>
							<p className="text-3xl font-extrabold tracking-tight text-foreground">
								{metric.value}
							</p>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="mt-4 grid gap-4 lg:grid-cols-5">
				<Card className="lg:col-span-3">
					<CardHeader>
						<CardTitle>Task activity</CardTitle>
						<CardDescription>
							New tasks per day, last 7 days
						</CardDescription>
					</CardHeader>
					<CardContent>
						{totals.total === 0 ? (
							<p className="flex h-[300px] items-center justify-center text-sm text-foreground-muted">
								No activity yet — create your first plan to get
								started.
							</p>
						) : (
							<div className="h-[300px]">
								<ResponsiveContainer width="100%" height="100%">
									<LineChart
										data={byDay}
										margin={{
											top: 8,
											right: 8,
											bottom: 0,
											left: -12,
										}}>
										<CartesianGrid
											strokeDasharray="3 3"
											stroke={CHART.grid}
										/>
										<XAxis
											dataKey="label"
											tick={{
												fill: CHART.muted,
												fontSize: 12,
											}}
											axisLine={false}
											tickLine={false}
										/>
										<YAxis
											allowDecimals={false}
											tick={{
												fill: CHART.muted,
												fontSize: 12,
											}}
											axisLine={false}
											tickLine={false}
											width={32}
										/>
										<Tooltip
											contentStyle={{
												borderRadius: 12,
												border: `1px solid ${CHART.grid}`,
												fontSize: 12,
											}}
										/>
										<Line
											type="monotone"
											dataKey="count"
											stroke={CHART.primary}
											strokeWidth={2.5}
											dot={{
												r: 4,
												fill: CHART.primary,
											}}
											activeDot={{ r: 6 }}
										/>
									</LineChart>
								</ResponsiveContainer>
							</div>
						)}
					</CardContent>
				</Card>

				<Card className="lg:col-span-2">
					<CardHeader>
						<CardTitle>By status</CardTitle>
						<CardDescription>
							Where your tasks stand
						</CardDescription>
					</CardHeader>
					<CardContent>
						{totals.total === 0 ? (
							<p className="flex h-[300px] items-center justify-center text-sm text-foreground-muted">
								Nothing to compare yet.
							</p>
						) : (
							<div className="h-[300px]">
								<ResponsiveContainer width="100%" height="100%">
									<BarChart
										data={statusData}
										layout="vertical"
										margin={{
											top: 8,
											right: 16,
											bottom: 8,
											left: 8,
										}}>
										<XAxis type="number" hide />
										<YAxis
											type="category"
											dataKey="name"
											tick={{
												fill: CHART.muted,
												fontSize: 12,
											}}
											axisLine={false}
											tickLine={false}
											width={90}
										/>
										<Tooltip
											cursor={{ fill: "#F5F5F5" }}
											contentStyle={{
												borderRadius: 12,
												border: `1px solid ${CHART.grid}`,
												fontSize: 12,
											}}
										/>
										<Bar
											dataKey="value"
											radius={[0, 8, 8, 0]}
											barSize={24}>
											{statusData.map((entry) => (
												<Cell
													key={entry.name}
													fill={entry.fill}
												/>
											))}
										</Bar>
									</BarChart>
								</ResponsiveContainer>
							</div>
						)}
					</CardContent>
				</Card>
			</div>

			<Card className="mt-4">
				<CardHeader>
					<CardTitle>Today&apos;s tasks</CardTitle>
					<CardDescription>
						{today.length === 0
							? "Nothing due today"
							: `${today.length} due today`}
					</CardDescription>
				</CardHeader>
				<CardContent>
					{today.length === 0 ? (
						<p className="text-sm leading-6 text-foreground-muted">
							No tasks due today. Enjoy the calm — or plan
							something.
						</p>
					) : (
						<ul className="divide-y divide-border">
							{today.map((task) => (
								<li
									key={task.id}
									className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
									{task.completed ? (
										<CheckCircle2 className="size-5 shrink-0 text-success" />
									) : (
										<Circle className="size-5 shrink-0 text-foreground-muted" />
									)}
									<span
										className={`text-sm ${
											task.completed
												? "font-medium text-foreground-muted line-through"
												: "font-semibold text-foreground"
										}`}>
										{task.title}
									</span>
								</li>
							))}
						</ul>
					)}
				</CardContent>
			</Card>
		</div>
	)
}

export default Dashboard
