import "./chart.css";
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, YAxis } from "recharts";

const Chart = ({ title, data, dataKey, grid }) => {
	return (
		<div className="chart">
			<h3 className="chartTitle">{title}</h3>
			<ResponsiveContainer
				width="100%"
				aspect={4 / 1}
			>
				<LineChart data={data}>
					{grid && (
						<CartesianGrid
							stroke="#e0dfdf"
							strokeDasharray="5 5"
						/>
					)}
					{/* <YAxis /> */}
					<XAxis
						dataKey="name"
						stroke="#5550b4"
						interval="preserveStartEnd"
					/>
					<Tooltip />
					<Legend />
					<Line
						type="monotone"
						dataKey={dataKey}
						stroke="#5550b4"
						activeDot={{ r: 8 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default Chart;
