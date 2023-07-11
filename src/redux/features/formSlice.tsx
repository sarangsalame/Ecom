import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormField } from '../../interfaces/interfaces';
import {ApiResponse} from '../../interfaces/interfaces'
import axios from 'axios';
import { toast } from 'react-toastify';

interface FormState {
  formData: FormField;
  apiResponse: ApiResponse;
}

const initalApiResponse = {
  message: "",
  success: false,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    pincode: "",
  }
}

const initialState: FormState = {
  formData: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    pincode: "",
  },
  apiResponse: initalApiResponse
};



const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<FormField>) => {
      state.formData = action.payload;

    },

    clearFormData: (state) => {
      state.formData = initialState.formData;

    },
    setApiResponse:(state, action)=>{
      state.apiResponse = action.payload
    },


    

  },

});

export const { updateFormData, clearFormData, setApiResponse } = formSlice.actions;
export default formSlice.reducer;
