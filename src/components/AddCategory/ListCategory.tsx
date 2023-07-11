import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import axios from 'axios';
import { Button, Container, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';


type ListCategoryProps = {
    update: any;
    setUpdate: React.Dispatch<any>;
  };

 const ListCategory: React.FC<ListCategoryProps> = ({ update, setUpdate }) => {
    const jsonString: any = localStorage.getItem("accessToken");
    const accessToken = JSON.parse(jsonString)
   

    const [categories, setCategories] = useState<any>([])

    useEffect(() => {
        axios.get("http://localhost:5000/category")
        .then((response: any) => {
            // console.log(response.data)
            setCategories(response.data);
        })
        .catch((err)=>console.log(err))

        return setUpdate(false)
    }, [update])

    //..........................................

    const deleteCategory= (product:any,accessToken:any)=>{
        // console.log(product , accessToken   )
        axios.delete(`http://localhost:5000/category/${product.id}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then((response: any) => {
            // console.log(response.data)
            
            const filterarr = categories.filter((item:any)=>item.id !== product.id)
            setCategories(filterarr)
            
        })
        .catch((err)=>{
            // console.log(err.response.data.statusCode)
            if(err.response.data.statusCode===400){
                toast(err.response.data.message)
            }
        })
    }
    
    // console.log(categories)

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', }}>
            {
                categories && categories.map((item: any) => {
                    return (<Container key={item.id}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <ImageIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.category_name}  />
                            <Button variant='text'>
                                <DeleteIcon onClick={()=>{
                                deleteCategory(item, accessToken)
                                }}/></Button>
                        </ListItem>
                        <Divider />
                        </Container>
                    )
                })
            }



        </List>
    );
}
export default ListCategory