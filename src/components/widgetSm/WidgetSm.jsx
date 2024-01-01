import React, { useEffect, useState } from "react";
import "./widgetSm.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { userRequest } from "../../requestMethods";

const WidgetSm = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const getUsers = async () => {
			try {
				const res = await userRequest.get("/user/?new=true");
				setUsers(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		getUsers();
	});

	return (
		<div className="widgetSm">
			<span className="widgetSmTitle">New Join Members</span>
			<ul className="widgetSmList">
				{users.map((users) => (
					<li
						className="widgetSmListItem"
						key={users._id}
					>
						<img
							src={users.img || require("../../assets/noAvatar.png")}
							alt=""
							className="widgetSmImg"
						/>
						<div className="widgetSmUser">
							<span className="widgetSmUsername">{users.username}</span>
							<span className="widgetSmUserTitle">{}</span>
						</div>
						<button className="widgetSmButton">
							<VisibilityIcon className="widgetSmIcon" />
							display
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default WidgetSm;
