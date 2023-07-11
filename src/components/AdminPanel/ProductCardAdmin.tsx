import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function ProdctCardAdmin({product}:any) {

    const jsonString: any = localStorage.getItem("accessToken");
    const accessToken = JSON.parse(jsonString)

    const deletProductFromCart = ()=>{
        axios.get(`http://localhost:5000/cart/delete_from_cart/${product.product_id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => {
                console.log(response.data)
                // dispatch(setProductInCart(response.data))
            }).catch(err => console.log(err))
    }
 
  const navigate = useNavigate()

  return (
    <Card sx={{ maxWidth: 300, minWidth:280, margin:2 }}
    onClick={()=>{console.log("card clicked", product.product_name)
    // console.log(product)
    // navigate(`/products_id/${product.product_id}`)
  }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="180"
          //product img
          image={"https://picsum.photos/200"}
          alt={product.product_name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {/* {title} */}
            {product.product_name}
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            {/* {discrpiption} */}
            {product.product_description}
          </Typography>
          <Button variant="outlined" onClick={deletProductFromCart}>Delete</Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}