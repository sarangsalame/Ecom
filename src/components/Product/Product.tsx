import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from "../../redux/store";
import { setProductList } from '../../redux/features/productSlice';
import { useDispatch } from 'react-redux';
import CardComp from '../Card/CardComp';
import Carousel from 'react-material-ui-carousel';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap:"wrap"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  }
});

const Product = () => {
  const [product, setProduct] = useState<any[]>([]);
  const token = useSelector((state: RootState) => state.login.token);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    const jsonString: any = localStorage.getItem("accessToken");
    const accessToken = JSON.parse(jsonString);

    axios.get('http://localhost:5000/products', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        dispatch(setProductList(response.data));
        setProduct(response.data);
      });

  }, []);

  

  return (
    <div className={classes.container}>
      {product && product.map((item: any) => (
        <CardComp key={item.product_id} product={item} />
      ))}
    </div>
  );
};

export default Product;
