import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import Layout from "./components/layout/Layout";
import { useSelector } from "react-redux";

function App() {
	const admin = useSelector((state) => state.user.currentUser?.isAdmin);
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route
						path="/login"
						element={<Login />}
					/>
					<Route
						path="/"
						element={admin ? <Layout /> : <Login />}
					>
						<Route
							index
							element={<Home />}
						/>
						<Route
							path="/users"
							element={<UserList />}
						/>
						<Route
							path="/user/:userId"
							element={<User />}
						/>
						<Route
							path="/new-user"
							element={<NewUser />}
						/>
						<Route
							path="/products"
							element={<ProductList />}
						/>
						<Route
							path="/product/:productId"
							element={<Product />}
						/>
						<Route
							path="/new-product"
							element={<NewProduct />}
						/>
						<Route
							path="/login"
							element={<Login />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
