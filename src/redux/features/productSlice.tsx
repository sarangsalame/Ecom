import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState:any = {
    products:[]
}

const ProductSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
      setProductList: (state, action: PayloadAction) => {
        state.products = action.payload
      }
    }
  });
  export const {setProductList} = ProductSlice.actions;
  export default ProductSlice.reducer;