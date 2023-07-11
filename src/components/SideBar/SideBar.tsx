import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import ListItemText from '@mui/material/ListItemText';
import { Link, useNavigate } from 'react-router-dom';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface Props {
  state: Record<Anchor, boolean>;
  setState: React.Dispatch<React.SetStateAction<Record<Anchor, boolean>>>;
  toggleDrawer: (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const sideBarAdmin = [
  {
    name:'Home',
    route:'/'
  },
  {
    name:'Category',
    route:'/category'
  },
  
  {
    name:'User',
    route:'/admin_users'
  },
  {
    name:'Order',
    route:'/admin_orders'
  },
  {
    name:'All Products',
    route:'/admin_products'
  },
]

const sideBarCustomer = [
  {
    name:'Home',
    route:'/'
  },
  {
    name:'Category',
    route:'/category'
  },
  {
    name:'Cart',
    route:'/cart'
  },
  
]

export default function   ({ state, setState, toggleDrawer }: Props) {

  const jsonString: any = localStorage.getItem("role");
        const role = JSON.parse(jsonString);

  const navigate = useNavigate()
  const list = (anchor: Anchor) => (

    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <h3>{role}</h3>
      <Divider/>
      <List>
        {role==="ADMIN" && sideBarAdmin.map((text, index) => (
          <ListItem key={text.name} disablePadding>
            <ListItemButton onClick={()=>navigate(text.route)}>
              {/* <Link to={text.route}> */}
                <ListItemText primary={text.name} />
              {/* </Link> */}
            </ListItemButton>
          </ListItem>
        ))}
        {role==="CUSTOMER" && sideBarCustomer.map((text, index) => (
          <ListItem key={text.name} disablePadding>
            <ListItemButton onClick={()=>navigate(text.route)}>
              {/* <Link to={text.route}> */}
                <ListItemText primary={text.name} />
              {/* </Link> */}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      
    </Box>
  );

  return (
    <div>
      {(['left'] as const).map((anchor: Anchor) => (
        <React.Fragment key={anchor}>

          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
