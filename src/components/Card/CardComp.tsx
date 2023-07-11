import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function CardComp({product}:any) {
 
  const navigate = useNavigate()

  return (
    <Card sx={{ maxWidth: 300, minWidth:280, margin:2 }}
    onClick={()=>{
    navigate(`/products_id/${product.product_id}`)
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
        </CardContent>
      </CardActionArea>
    </Card>
  );
}