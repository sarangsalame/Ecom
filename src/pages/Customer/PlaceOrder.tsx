import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { setProductInCart } from "../../redux/features/addPoductToCartSlice";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  label: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "4px",
    padding: "10px",
    border: "1px solid #ccc",
  },
  button: {
    height: "50px",
    width: "200px",
    backgroundColor: "#3f51b5",
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#2c387e",
    },
  },
  orderDetails: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  productName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  },
  productPrice: {
    fontSize: "16px",
    marginBottom: "10px",
    color: "#666",
  },
  productRow:{
    display:"flex"
  }
});

const PlaceOrder = () => {
  const [address, setAddress] = useState<any>("");
  const [orderPlaced, setOrderPlaced] = useState<any>("");
  const [orderStatus, setOrderStatus] = useState<any>("")
  const [btnDisable, setBtnDisable] = useState<boolean>(false)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const classes = useStyles();
  useEffect(()=>setBtnDisable(false),[])

  const jsonString: any = localStorage.getItem("accessToken");
  const accessToken = JSON.parse(jsonString);

  const placeOrder = (e: any) => {
    e.preventDefault();


    if (address) {
      axios
        .post(
          "http://localhost:5000/order/place_order",
          { address: address },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
        //   console.log(response);
          setOrderPlaced(response.data);
          dispatch(setProductInCart(""))
          toast.success("Order Placed Successfully");   
        })
        .catch((err) => console.log(err));
    } else {
      toast.error("Please enter an address");
    }
  };

  const getOrderStatus = (item:any)=>{
    // console.log(item)
    axios
    .get(`http://localhost:5000/order/order_details/${item.order_id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
        // console.log(response.data)
      setOrderStatus(response.data);
      setBtnDisable(true)
    })
    .catch((err) => console.log(err));
  }

  return (
    <div>
      {!orderPlaced && (
        <div className={classes.container}>
          <Typography variant="h6" className={classes.label}>
            Add address
          </Typography>
          <TextField
            type="text"
            variant="outlined"
            className={classes.input}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button
            variant="contained"
            className={classes.button}
            onClick={placeOrder}
          >
            Place Order
          </Button>
        </div>
      )}

      {orderPlaced && (
        <div className={classes.orderDetails}>
          <Typography variant="h6">Order Details</Typography>
          {orderPlaced.products.map((item: any) => (
            
            <div key={item.product_id}>
              <Typography variant="subtitle1" className={classes.productName}>
                Product Name: {item.product_name}
              </Typography>
              <Typography variant="body1" className={classes.productPrice}>
                Product Price: ₹ {item.price}/-
              </Typography>
              
              <Button
                variant="outlined"
                disabled={btnDisable    }
                className={classes.button}
                onClick={()=>{getOrderStatus(orderPlaced)}}
              >
               Order Status
              </Button>
            </div>
          ))}

          {
            orderStatus && <div><b>Order Status:</b> {orderStatus.order_status}</div>
          }
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
