import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function OrderStatusDropdown() {
  const [age, setAge] = React.useState('');

  const dropdownArr = ["Ordered" , "Dispatched" , "Delivered" , "Rejected" , "Cancelled" ]

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
            {
                dropdownArr.map((status:string)=><MenuItem value={status}>{status}</MenuItem>)
            }
        </Select>
      </FormControl>
    </Box>
  );
}