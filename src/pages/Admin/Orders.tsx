import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import OrderStatusDropdown from "../../components/Cart/orderStatusDeopdown";



const Orders  = ()=>{

    const [orders, setOrders] = useState<any>("")
    const jsonString: any = localStorage.getItem("accessToken");
    const accessToken = JSON.parse(jsonString);

    useEffect(()=>{
    
        // api request call.............................................
        axios
          .get("http://localhost:5000/order/get_all_orders", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            setOrders(res.data)
            // toast(res.data.message)
          })
          .catch((error) => {
            console.log(error)
          });
    },[])

    return(
        <div className="box" style={{display:"flex", height:"100vh", width:"100vw", flexDirection:"column",justifyContent:"center", marginTop:"100px"}}>
        <h3>Users List</h3>
        {
            orders && orders.map((item:any)=>{

                return (
                    <div key={item.order_id} style={{display:"flex",height:"250px", alignItems:"center", justifyContent:"space-between",marginBottom:"10px", maxWidth:"900px"}}>
                        <div>
                        <p><b>Order Id:</b> {item.order_id}</p>
                        <p><b>Order Status</b>: {item.order_status}</p>
                        <p><b>Address</b>: {item.address}</p>
                        </div>
                        
                            {/* <OrderStatusDropdown/> */}
                        {/* <Button variant="outlined">Updata order Status</Button> */}
                        
                        <p><b>Total</b>: {item.total_amount}/-</p>
                        
                    </div>
                )
            })
        }
    </div>
    )
}
export default Orders