import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const TaskPieChart = ({task}) => {


	const data = [
		{ name: "Completed", value: completed },
		{ name: "Remaining", value: remaining },
	];

	const COLORS = ["#22C55E", "#E5E7EB"];

	const percentage = total === 0 ? 0 : ((completed / total) * 100).toFixed(1);

	return (
		<div className='w-full h-64 relative'>
			<ResponsiveContainer>
				<PieChart>
					<Pie
						data={data}
						innerRadius={70}
						outerRadius={100}
						paddingAngle={3}
						dataKey='value'>
						{data.map((entry, index) => (
							<Cell key={index} fill={COLORS[index]} />
						))}
					</Pie>

					<Tooltip />
				</PieChart>
			</ResponsiveContainer>

			{/* Center percentage */}
			<div className='absolute inset-0 flex items-center justify-center'>
				<span className='text-xl font-semibold'>{percentage}%</span>
			</div>
		</div>
	);
};

export default TaskPieChart;
