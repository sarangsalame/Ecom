import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";

// const useStyles = makeStyles({
//     userContainer: {
//       display: "flex",
//       flexDirection: "column",
//       height: "100vh",
//       width: "100vw",
//     },
//     userInfo: {
//       display: "flex",
//     },
//     userInfoContent: {
//       marginRight: "10px",
//     },
//   });

const Users = ()=>{
    const [users, setUsers] = useState<any>("")
    const jsonString: any = localStorage.getItem("accessToken");
    const accessToken = JSON.parse(jsonString);
    
    useEffect(()=>{
    
        // api request call.............................................
        axios
          .get("http://localhost:5000/users", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            console.log(res);
            setUsers(res.data)
            // toast(res.data.message)
          })
          .catch((error) => {
            console.log(error)
          });
    },[])

    const handleDeleteUser = (id:any)=>{
      console.log(id);
      
        axios
        .delete(`http://localhost:5000/users/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log(res);
          toast("User Deleted SuccessFully")
        })
        .catch((error) => {
          console.log(error)
        });
    }
    return (
        <div className="box" style={{display:"flex", height:"100vh", width:"100vw", flexDirection:"column"}}>
            <h3>Users List</h3>
            {
                users && users.map((item:any)=>{

                    return (
                        <div key={item.user_id} style={{display:"flex",height:"150px", alignItems:"center", justifyContent:"center"}}>
                            <div>
                            <p><b>FirstName:</b> {item.firstName}</p>
                            <p><b>LastName</b>: {item.lastName}</p>
                            <p><b>Mobile</b>: {item.mobile}</p>
                            <p><b>Address</b>: {item.address}</p>
                            </div>
                            <DeleteIcon onClick={()=>handleDeleteUser(item.user_id)}/>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Users