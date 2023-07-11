import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Category } from "@material-ui/icons";
import { setProductInCart } from "../../redux/features/addPoductToCartSlice";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    width:"100vw",
    height:"100vh",
    justifyContent:"space-evenly",
    background:"#e8f2fa",
    // flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  imageContainer: {
    textAlign: "center",
  },
  image: {
    width: "300px",
    height: "auto",
  },
  detailsContainer: {
    textAlign: "center",
  },
  detailsimgContainer:{
    display:"flex"
  },
  details: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    maxWidth: "400px",
  },
  productName: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  productBrand: {
    fontSize: "16px",
  },
  productDescription: {
    fontSize: "14px",
  },
  productPrice: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  addButton: {
    height: "50px",
    width: "200px",
  },
});

const ProductDetailsPage = () => {
  const cartvalue = useSelector((state: any) => state.cart);

  const [product, setProduct] = useState<any>({});
  const [displayBtn, setDisplayBtn] = useState<boolean>(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const jsonString: any = localStorage.getItem("accessToken");
  const jsonRole:any = localStorage.getItem("role")
  const accessToken = JSON.parse(jsonString);
  const role = JSON.parse(jsonRole)
  const classes = useStyles();

  const addToCart = () => {
    axios
      .post(`http://localhost:5000/cart/add_to_cart/${product.product_id}`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        dispatch(setProductInCart(response.data));
        toast.success("Item Added Successfully");
        setDisplayBtn(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // Fetch product details
    axios
      .get(`http://localhost:5000/products/get_product/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <div className={classes.detailsimgContainer}>
          <img className={classes.image} alt={product.product_name} src={"https://picsum.photos/200"} />
        </div>
      </div>

      <div className={classes.detailsContainer}>
        <h3>Details:</h3>
        <div className={classes.details}>
          <p className={classes.productName}>Name: {product.product_name}</p>
          <p className={classes.productBrand}>Brand: {product.brand_name}</p>
          <p className={classes.productDescription}>Description: {product.product_description}</p>
          <p className={classes.productPrice}>Price: Rs. {product.price}/-</p>
        </div>

{
    role === "CUSTOMER" && (
      <div className={classes.buttonContainer}>
          <Button disabled={!displayBtn} onClick={addToCart} variant="outlined" className={classes.addButton}>
            Add To Cart
          </Button>
          <Button onClick={() => navigate("/cart")} variant="outlined">
            Go To Cart
          </Button>
        </div>
    )
}
        
      </div>
    </div>
  );
};

export default ProductDetailsPage;
