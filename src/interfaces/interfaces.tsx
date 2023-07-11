export interface ApiResponse {
    message: string;
    success: boolean;
    user: {
      firstName: string,
      lastName: string,
      email: string,
      password: string,
      mobile: string,
      address: string,
      pincode: string,
    }
  }
  export interface FormField {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobile: string;
    address: string;
    pincode: string;
}
export interface LoginPayload{
  email: string,
  password: string
}