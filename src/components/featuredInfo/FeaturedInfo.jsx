import React, { useEffect, useState } from "react";
import "./featuredInfo.css";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { userRequest } from "../../requestMethods";

const FeaturedInfo = () => {
	const [income, setIncome] = useState([]);
	const [perc, setPerc] = useState(0);

	useEffect(() => {
		const getIncome = async () => {
			try {
				const res = await userRequest.get("/orders/income");
				setIncome(res.data);
				setPerc(Math.floor((res.data[1].total / res.data[0].total) * 100 - 100));
				console.log(Math.floor((res.data[1].total / res.data[0].total) * 100 - 100));
			} catch {}
		};
		getIncome();
	}, []);

	console.log(income);

	return (
		<div className="featured">
			<div className="featuredItem">
				<span className="featuredTitle">Revenue</span>
				<div className="featuredMoneyContainer">
					<span className="featuredMoney">${income[1] ? income[1]?.total : "0"}</span>
					<span className="featuredMoneyRate">
						{income[1] ? perc + "% " : ""}
						{income[1] ? (
							perc > 0 ? (
								<ArrowUpwardIcon className="featuredIcon positive" />
							) : (
								<ArrowDownwardIcon className="featuredIcon negative" />
							)
						) : (
							""
						)}
					</span>
				</div>
				<span className="featuredSub">Compared to last month</span>
			</div>
			<div className="featuredItem">
				<span className="featuredTitle">Sales</span>
				<div className="featuredMoneyContainer">
					<span className="featuredMoney">$4,415</span>
					<span className="featuredMoneyRate">
						-1.4 <ArrowDownwardIcon className="featuredIcon negative" />
					</span>
				</div>
				<span className="featuredSub">Compared to last month</span>
			</div>
			<div className="featuredItem">
				<span className="featuredTitle">Cost</span>
				<div className="featuredMoneyContainer">
					<span className="featuredMoney">$2,215</span>
					<span className="featuredMoneyRate">
						+2.4 <ArrowUpwardIcon className="featuredIcon positive" />
					</span>
				</div>
				<span className="featuredSub">Compared to last month</span>
			</div>
		</div>
	);
};

export default FeaturedInfo;
