import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from '../SideBar/SideBar'
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '@mui/material';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { setProductInCart } from '../../redux/features/addPoductToCartSlice';

export default function Navbar() {

  React.useEffect(()=>{
    axios.get(`http://localhost:5000/users/cart_details`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => {     

             if(response.data.cart){
              // console.warn(response.data.cart)
               dispatch(setProductInCart(response.data.cart))
             }
            })
            .catch(err => console.log(err))
  },[])
  
  const cartvalue = useSelector((state:any)=>state.cart.cartProducts)
 
// console.log(cartvalue.length)  
  const json: string | null = localStorage.getItem("role")
  let role;
  if (json) {
    role = JSON.parse(json)
  }
  type Anchor = 'top' | 'left' | 'bottom' | 'right';
  const navigate = useNavigate();

  interface StateVar {
    top: boolean,
    left: boolean,
    bottom: boolean,
    right: boolean,
  }
  const [state, setState] = React.useState<StateVar>({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });


  
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };


  const jsonString: any = localStorage.getItem("accessToken");
  const accessToken = JSON.parse(jsonString)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{backgroundImage: "linear-gradient(to right, #0f0c29, #302b63, #24243e)"}} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link style={{color:"white"}} to="/">E-Com</Link>

          </Typography>
          {
            role === "ADMIN" ? (<>
              <Button color="inherit"><Link style={{color: "white"}} to="/admin_addProduct">Add Products</Link></Button>
              <Button color="inherit" ><Link style={{color: "white"}} to="/admin_addCategory">Add Category</Link></Button>
            </>
            ) : ""
          }
          {
            role==="CUSTOMER" && (
              <Badge badgeContent={cartvalue?.length} color="primary">
            <Link to="/cart"><ShoppingCartCheckoutOutlinedIcon style={{ color: "white" }} /></Link>
          </Badge>
            )
          }

          

          {
            accessToken ? (
              <Button color="inherit"
                onClick={() => {
                  localStorage.removeItem("accessToken")
                  localStorage.removeItem("role")
                  navigate('/')
                }}>
                LogOut
              </Button>
            ) :
              (
                <Button color="inherit" onClick={() => navigate('/register')}>
                  Sign Up
                </Button>

              )
          }

        </Toolbar>
      </AppBar>
      <SideBar state={state} setState={setState} toggleDrawer={toggleDrawer} />
    </Box>
  );
}

function dispatch(arg0: { payload: any; type: "cart/setProductInCart"; }) {
  throw new Error('Function not implemented.');
}
