import React, { useEffect, useRef } from "react";
import "./login.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const formRef = useRef(null);
	const { isFetching, error } = useSelector((state) => state.user);
	const admin = useSelector((state) => state.user.currentUser?.isAdmin);

	useEffect(() => {
		if (admin) {
			navigate("/");
		}
	});

	const handleLogin = (e) => {
		e.preventDefault();
		if (formRef.current.reportValidity()) {
			login(dispatch, { username, password });
		}
	};

	return (
		<div className="login">
			<form ref={formRef}>
				<input
					type="text"
					placeholder="username"
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="password"
					placeholder="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button onClick={handleLogin}>Login</button>
			</form>
		</div>
	);
};

export default Login;
