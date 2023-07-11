import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { LoginPayload } from '../../interfaces/interfaces'

interface UserCredential {
  token: string;
}

const initialState: UserCredential = {
  token: ""
};

interface CredencialResponse{
    data:UserCredential
}

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    verifyUser: (state:UserCredential, action: PayloadAction<UserCredential>) => {
      const {token} = action.payload
      state.token = token
    }
  }
});

export const { verifyUser } = loginSlice.actions;
export default loginSlice.reducer;
