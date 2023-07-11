import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setProductInCart } from "../../redux/features/addPoductToCartSlice";
import CartProduct from "./CartProduct";
import { Container } from "@mui/material";

const Cart = () => {

    const response = useSelector((state: any) => state.cart.cartProducts)
    console.log(response)

    return (
        <div>
            <h2>Cart</h2>
            <div>
                <CartProduct />
            </div>
        </div>
    )
}
export default Cart;

