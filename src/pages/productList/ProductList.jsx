import React, { useEffect, useState } from "react";
import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProducts, getProducts } from "../../redux/apiCalls";

const ProductList = () => {
	const dispatch = useDispatch();
	// const [data, setData] = useState(productRows);
	const products = useSelector((state) => state.product.products);

	useEffect(() => {
		getProducts(dispatch);
	}, [dispatch]);

	const handleDelete = (id) => {
		deleteProducts(dispatch, id);
	};

	const columns = [
		{ field: "_id", headerName: "ID", width: 200 },
		{
			field: "product",
			headerName: "Product",
			width: 250,
			renderCell: (params) => {
				return (
					<div className="productListItem">
						<img
							className="productListImg"
							src={params.row.img}
							alt=""
						/>
						{params.row.title}
					</div>
				);
			},
		},
		{ field: "inStock", headerName: "Stock", width: 110 },
		{
			field: "price",
			headerName: "Price",
			width: 100,
		},
		{
			field: "action",
			headerName: "Action",
			width: 150,
			renderCell: (params) => {
				return (
					<>
						<Link to={"/product/" + params.row._id}>
							<button className="productListEdit">Edit</button>
						</Link>
						<DeleteOutlineOutlinedIcon
							className="productListDelete"
							onClick={() => handleDelete(params.row._id)}
						/>
					</>
				);
			},
		},
	];

	return (
		<div className="productList">
			<DataGrid
				rows={products}
				columns={columns}
				getRowId={(row) => row._id}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 10 },
					},
				}}
				pageSizeOptions={[5, 8, 10]}
				checkboxSelection
				disableRowSelectionOnClick
			/>
		</div>
	);
};

export default ProductList;
