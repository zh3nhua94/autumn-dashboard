import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";

const Layout = () => {
	return (
		<>
			<Topbar />
			<div className="container">
				<Sidebar />
				<div className="dashboard_content">
					<Outlet />
				</div>
			</div>
		</>
	);
};

export default Layout;
