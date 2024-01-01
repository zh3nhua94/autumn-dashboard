import "./product.css";
import { Link, useLocation } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import PublishIcon from "@mui/icons-material/Publish";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { useRef } from "react";

const Product = () => {
	const [pStats, setPStats] = useState([]);
	const location = useLocation();
	const productId = location.pathname.split("/")[2];
	const initialized = useRef(false);

	const product = useSelector((state) => state.product.products.find((product) => product._id === productId));

	const MONTHS = useMemo(
		() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		[]
	);

	useEffect(() => {
		const getStats = async () => {
			try {
				const res = await userRequest.get("/orders/income?pid=" + productId);
				res.data.map((item) => setPStats((prev) => [...prev, { name: MONTHS[item._id - 1], Sales: item.total }]));
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
		<div className="product">
			<div className="productTitleContainer">
				<h1 className="productTitle">Product</h1>
				<Link to="/new-product">
					<button className="productAddButton">Create A New Product</button>
				</Link>
			</div>
			<div className="productTop">
				<div className="productTopLeft">
					<Chart
						title={"Sales Performance"}
						data={pStats}
						dataKey={"Sales"}
					/>
				</div>
			</div>
			<div className="productBottom">
				<div className="productBottomLeft">
					<div className="productInfoTop">
						<img
							src={product.img}
							alt=""
							className="productInfoImg"
						/>
						<span className="productName">{product.title}</span>
					</div>
					<div className="productInfoBottom">
						<div className="productInfoItem">
							<span className="productInfoKey">id:</span>
							<span className="productInfoValue">{product._id}</span>
						</div>
						<div className="productInfoItem">
							<span className="productInfoKey">sales:</span>
							<span className="productInfoValue">5123</span>
						</div>
						<div className="productInfoItem">
							<span className="productInfoKey">in stock:</span>
							<span className="productInfoValue">{product.inStock ? "Yes" : "No"}</span>
						</div>
					</div>
				</div>
				<form className="productForm">
					<div className="productFormLeft">
						<label>Product Name</label>
						<input
							type="text"
							placeholder="Summer dress"
						/>
						<label>Product Description</label>
						<textarea />
						<label>Price</label>
						<input
							type="number"
							placeholder="100"
						/>
						<label>In Stock</label>
						<select
							name="inStock"
							id="idStock"
						>
							<option value="true">Yes</option>
							<option value="false">No</option>
						</select>
					</div>
					<div className="productFormRight">
						<div className="productUpload">
							<img
								src={product.img}
								alt=""
								className="productUploadImg"
							/>
							<label htmlFor="file">
								<PublishIcon />
							</label>
							<input
								type="file"
								id="file"
								style={{ display: "none" }}
							/>
						</div>
						<button className="productButton">Update</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Product;
