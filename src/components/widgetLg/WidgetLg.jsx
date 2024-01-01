import React, { useEffect, useState } from "react";
import "./widgetLg.css";
import { userRequest } from "../../requestMethods";
import TimeAgo from "react-timeago";

const WidgetLg = () => {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const getOrders = async () => {
			try {
				const res = await userRequest.get("/orders");
				setOrders(
					res.data.sort((order1, order2) => {
						return new Date(order2.createdAt) - new Date(order1.createdAt);
					})
				);
			} catch (err) {
				console.log(err);
			}
		};
		getOrders();
	}, []);

	//Type button styles: "Approved", "Declined", "Pending"
	const Button = ({ type }) => {
		return <button className={"widgetLgButton " + type}>{type}</button>;
	};

	return (
		<div className="widgetLg">
			<h3 className="widgetLgTitle">Latest transactions</h3>
			<table className="widgetLgTable">
				<thead>
					<tr className="widgetLgTr">
						<th className="widgetLgTh">Customer</th>
						<th className="widgetLgTh">Date</th>
						<th className="widgetLgTh">Amount</th>
						<th className="widgetLgTh">Status</th>
					</tr>
				</thead>
				<tbody>
					{orders?.map((order) => (
						<tr
							className="widgetLgTr"
							key={order._id}
						>
							<td className="widgetLgUser">
								<img
									src={order.userId.img || require("../../assets/noAvatar.png")}
									alt=""
									className="widgetLgImg"
								/>
								<span className="widgetLgName">{order.userId.username}</span>
							</td>
							<td className="widgetLgDate">
								<TimeAgo date={order.createdAt} />
							</td>
							<td className="widgetLgAmount">{order.amount}</td>
							<td className="widgetLgStatus">
								<Button type={order.status} />
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default WidgetLg;
