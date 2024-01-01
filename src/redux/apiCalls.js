import { publicRequest, userRequest } from "../requestMethods";
import {
	addProductFailure,
	addProductStart,
	addProductSuccess,
	deleteProductFailure,
	deleteProductStart,
	deleteProductSuccess,
	getProductFailure,
	getProductStart,
	getProductSuccess,
	updateProductFailure,
	updateProductStart,
	updateProductSuccess,
} from "./productSlice";
import { loginFailure, loginStart, loginSuccess, logout } from "./userSlice";

//LOGIN & LOGOUT
export const login = async (dispatch, user) => {
	dispatch(loginStart());
	try {
		const res = await publicRequest.post("/auth/login", user);
		//passing user data to redux
		dispatch(loginSuccess(res.data));
	} catch (err) {
		dispatch(loginFailure());
	}
};

export const logoutUser = async (dispatch) => {
	dispatch(logout());
};

//GET PRODUCTS
export const getProducts = async (dispatch) => {
	dispatch(getProductStart());
	try {
		const res = await publicRequest.get("/products");
		//passing user data to redux
		dispatch(getProductSuccess(res.data));
	} catch (err) {
		dispatch(getProductFailure());
	}
};

//DELETE PRODUCTS
export const deleteProducts = async (dispatch, id) => {
	dispatch(deleteProductStart());
	try {
		const res = await userRequest.delete(`/products/${id}`);
		//passing user data to redux
		dispatch(deleteProductSuccess(id));
	} catch (err) {
		dispatch(deleteProductFailure());
	}
};

//UPDATE PRODUCTS (NOT COMPLETE)
export const updateProduct = async (id, product, dispatch) => {
	dispatch(updateProductStart());
	try {
		// update function write here
		//.......
		dispatch(updateProductSuccess({ id, product }));
	} catch (err) {
		dispatch(updateProductFailure());
	}
};

//ADD PRODUCTS
export const addProduct = async (product, dispatch) => {
	dispatch(addProductStart());
	try {
		const res = await userRequest.post(`/products`, product);
		dispatch(addProductSuccess(res.data));
	} catch (err) {
		dispatch(addProductFailure());
	}
};
