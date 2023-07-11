import "./Register.css";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Wrapper from "../Wrapper/Wrapper";
import { FormEvent } from "react";
import { FormField } from "../../interfaces/interfaces";
import { signUpSchema } from "../../Schemas";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Button, Box, TextField } from "@mui/material";
import {toast} from 'react-toastify'
import {updateFormData,setApiResponse} from "../../redux/features/formSlice";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";

const initialSignupState: FormField = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  mobile: "",
  address: "",
  pincode: "",
};

const Register = () => {
  const res = useSelector((state: RootState) => state.form);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleError = () => {
  //     console.log("err fn called")
  //     toast(errMessage ? errMessage : "Please fill all fields")
  // }


  const handleSubmit = (values:FormField, {resetForm}:any)=>{
    axios.post('http://localhost:5000/auth/register', values)
        .then(result => {         
            dispatch(setApiResponse(result.data))
            toast.success("Sign Up Successful")
            setTimeout(() => {
              resetForm()
              navigate('/')
              
            }, 1000);
          
        })
        .catch(error => {
          // Handle any error
          console.log(error?.response?.data?.message)
         
        });
  }
  // const handleSubmit = (values: FormField, formikHelpers: FormikHelpers<FormField>) => {

  //   // setting the form data in store
  //   dispatch(updateFormData(values));

  //   // async function that returns the response and set value inside the store
  //   signup(values as FormField)

  //   if (res.apiResponse.success) {
  //     console.log("this called from if block")
  //     console.log(res)
  //     formikHelpers.resetForm()
  //   }
  // };

  return (
    <Wrapper>
      <div className="form-container">
        <h2>Sign Up</h2>
        <Formik
          initialValues={
            initialSignupState
          }
          // validation schema needed here
          validationSchema={signUpSchema}
          //  on submit function
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, isValid, touched, dirty }) => (
            <Form>
              <Box height={14} />
              <Field
                name="firstName"
                type="text"
                as={TextField}
                size="small"
                variant="outlined"
                color="primary"
                label="First Name"
                fullWidth
                errors={Boolean(errors.firstName) && Boolean(touched.firstName)}
                helperText={Boolean(touched.firstName) && errors.firstName}
              />
              <Box height={14} />
              <Field
                name="lastName"
                type="text"
                as={TextField}
                size="small"
                variant="outlined"
                color="primary"
                label="Last Name"
                fullWidth
                errors={Boolean(errors.lastName) && Boolean(touched.lastName)}
                helperText={Boolean(touched.lastName) && errors.lastName}
              />

              <Box height={14} />
              <Field
                name="email"
                type="email"
                as={TextField}
                size="small"
                variant="outlined"
                color="primary"
                label="Email"
                fullWidth
                errors={Boolean(errors.email) && Boolean(touched.email)}
                helperText={Boolean(touched.email) && errors.email}
              />

              <Box height={14} />
              <Field
                name="password"
                type="password"
                as={TextField}
                size="small"
                variant="outlined"
                color="primary"
                label="Password"
                errors={Boolean(errors.password) && Boolean(touched.password)}
                helperText={Boolean(touched.password) && errors.password}
                fullWidth
              />

              <Box height={14} />
              <Field
                name="mobile"
                type="text"
                as={TextField}
                size="small"
                variant="outlined"
                color="primary"
                label="Mobile Number"
                errors={Boolean(errors.mobile) && Boolean(touched.mobile)}
                helperText={Boolean(touched.mobile) && errors.mobile}
                fullWidth
              />

              {/* <Box height={14} />
              <Field
                name="address"
                type="text"
                as={TextField}
                size="small"
                variant="outlined"
                color="primary"
                label="Address"
                errors={Boolean(errors.address) && Boolean(touched.address)}
                helperText={Boolean(touched.address) && errors.address}
                fullWidth
              />

              <Box height={14} />
              <Field
                name="pincode"
                type="text"
                as={TextField}
                size="small"
                variant="outlined"
                color="primary"
                label="Pincode"
                errors={Boolean(errors.pincode) && Boolean(touched.pincode)}
                helperText={Boolean(touched.pincode) && errors.pincode}
                fullWidth
              /> */}

              <Box height={16} />
              <Button
                type="submit"
                
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>

        <p className="login-redirect">
          Already has an account?
          <span>
            <Link to="/login">Login</Link>
          </span>
        </p>
      </div>
      <ToastContainer />
    </Wrapper>
  );
};

export default Register;
