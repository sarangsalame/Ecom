import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Button, CardMedia, Container } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { setProductInCart } from '../../redux/features/addPoductToCartSlice';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const getTotalOfProducts = (prod: any, setGrandTotal: any) => {
    const totalPrice = prod.map((item: any) => item.price).reduce((acc: any, current: any) => acc + current)
    setGrandTotal(totalPrice)
}

const deleteItemsFromCart = (product: any, accessToken: string, dispatch: any, setCartProducts: any, setGrandTotal: any) => {

    axios.delete(`http://localhost:5000/cart/delete_from_cart/${product.product_id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
        .then(response => {
            console.log(response.data.products)
            // const filtered = cartvalue.filter((item:any)=>item.product_id !== response.)
            getTotalOfProducts(response.data.products, setGrandTotal)
            setCartProducts(response.data.products)
            dispatch(setProductInCart(response.data.products))
            toast.success("Cart item deleted", {
                position: toast.POSITION.TOP_RIGHT,
            })

            // dispatch(setProductInCart(response.data.cart))
        })
        .catch(err => console.log(err))
}




export default function CartProduct() {
    const cartvalue = useSelector((state: any) => state.cart.cartProducts)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const [grandTotal, setGrandTotal] = useState<any>("")
    const [cartProducts, setCartProducts] = useState<any>([])

    const jsonString: any = localStorage.getItem("accessToken");
    const accessToken = JSON.parse(jsonString)

    useEffect(() => {
        // for display product
        axios.get(`http://localhost:5000/users/cart_details`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {
                setCartProducts(response.data.cart)
                setGrandTotal(response.data.totalAmount)
                dispatch(setProductInCart(response.data.cart))
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <>
            {
                cartProducts.length !== 0 ?
                    (
                        <>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 600 }} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Image</StyledTableCell>
                                            <StyledTableCell align="right">Product Name</StyledTableCell>
                                            <StyledTableCell align="right">Brand Name</StyledTableCell>
                                            <StyledTableCell align="right">Price</StyledTableCell>
                                            <StyledTableCell align="right">Remove Product</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {cartProducts && cartProducts.map((row: any) => (
                                            <StyledTableRow key={row.product_id}>

                                                <CardMedia
                                                    component="img"
                                                    height="160"
                                                    //product img
                                                    image={"https://picsum.photos/200"}
                                                    alt={""}
                                                />
                                                <StyledTableCell align="right">{row.product_name}</StyledTableCell>
                                                <StyledTableCell align="right">{row.brand_name}</StyledTableCell>
                                                <StyledTableCell align="right">&#x20B9; {row.price}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <DeleteIcon style={{ cursor: "pointer" }} onClick={() => {
                                                        deleteItemsFromCart(row, accessToken, dispatch, setCartProducts, setGrandTotal)
                                                    }} />
                                                    {/* <Button variant="text"></Button> */}
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Container style={{ display: 'flex', justifyContent: 'space-evenly', height: 100, alignItems: "center", marginTop: 10, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                                <div style={{ display: 'flex', justifyContent: "space-evenly", alignItems: "center", padding: 4 }}>
                                    {grandTotal && <span><b>Card Total: </b>  &#x20B9; {grandTotal}/- </span>}
                                    {/* <span>&#x20B9; {grandTotal}/-</span> */}
                                </div>
                                <Button variant='outlined' style={{ height: 50 }} onClick={() => navigate('/place_order')}>Place Order</Button>
                            </Container>
                        </>
                    ) : <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh", flexDirection: "column" }}>
                        <img style={{ borderRadius: "15px" }} alt='empty cart' src='https://picsum.photos/200' />
                        <h3>yOUR CART IS EMPTY</h3>
                        <p>Looks like you have not added anything to Your Cart. Go ahead and explore categories.</p>
                    </div>
            }
        </>
    );

}


