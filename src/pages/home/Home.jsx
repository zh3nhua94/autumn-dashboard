import React, { useEffect, useMemo, useRef, useState } from "react";
import "./home.css";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import Chart from "../../components/chart/Chart";
// import { dummyChartData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { userRequest } from "../../requestMethods";

const Home = () => {
	const [userStats, setUserStats] = useState([]);
	const initialized = useRef(false);

	const MONTHS = useMemo(
		() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		[]
	);

	useEffect(() => {
		const getStats = async () => {
			try {
				const res = await userRequest.get("/user/stats");
				res.data.map((item) => {
					return setUserStats((prev) => [...prev, { name: MONTHS[item._id.month - 1], "Active User": item.total }]);
				});
			} catch (err) {
				console.log(err);
			}
		};
		if (!initialized.current) {
			initialized.current = true;
			getStats();
		}
	}, [MONTHS]);

	return (
		<div className="home">
			<FeaturedInfo />
			<Chart
				data={userStats}
				title={"User Analytics"}
				dataKey={"Active User"}
				grid
			/>
			<div className="homeWidgets">
				<WidgetSm />
				<WidgetLg />
			</div>
		</div>
	);
};

export default Home;
