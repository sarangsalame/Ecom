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
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';

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

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CustomizedTables() {
    const jsonString: any = localStorage.getItem("accessToken");
    const accessToken = JSON.parse(jsonString)

    const [allProducts, setAllProducts] = useState<any>([])

    useEffect(() => {
        axios.get("http://localhost:5000/products/all_products_details")
            .then((response: any) => {
                setAllProducts(response.data)
            })
            .catch((err) => console.log(err))
    }, [])



    const handleDeleteProduct = (prod:any)=>{
        
        axios.delete(`http://localhost:5000/products/${prod.product_id}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then((response: any) => {
           
            const filterarr = allProducts.filter((item:any)=>item.product_id!==prod.product_id)
            setAllProducts(filterarr)
            toast.success("Product Deleted Successfully")
            
        })
        .catch((err)=>{
            toast.error(err.response.data.message)
            if(err.response.data.statusCode===400){
                toast.error(err.response.data.message)
            }
        })
    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Product Name</StyledTableCell>
                        <StyledTableCell align="right">Brand Name</StyledTableCell>
                        <StyledTableCell align="right">Price</StyledTableCell>
                        <StyledTableCell align="right">Stock</StyledTableCell>
                        <StyledTableCell align="right">Sold</StyledTableCell>
                        <StyledTableCell align="center">Delete Product</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {allProducts.map((prod:any) => (
                        <StyledTableRow key={prod.product_name}>
                            <StyledTableCell component="th" scope="row">
                                {prod.product_name}
                            </StyledTableCell>
                            <StyledTableCell component="th" scope="row">
                                {prod.brand_name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{prod.price}</StyledTableCell>
                            <StyledTableCell align="right">{prod.stock}</StyledTableCell>
                            <StyledTableCell align="right">{prod.sold}</StyledTableCell>
                            <StyledTableCell align="center"><DeleteIcon onClick={()=>handleDeleteProduct(prod)}/></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}   