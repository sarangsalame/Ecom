import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState:any = {
    cartProducts:[]
}

const AddCategorySlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      setProductInCart: (state, action) => {
        console.log(action.payload) 
        state.cartProducts = action.payload
      },
      
     
    }
  });
  export const {setProductInCart} = AddCategorySlice.actions;
  export default AddCategorySlice.reducer;