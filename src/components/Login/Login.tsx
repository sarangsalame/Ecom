import './Login.css';
import Wrapper from '../Wrapper/Wrapper';
import { ToastContainer, toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { loginSchema } from '../../Schemas';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { verifyUser } from '../../redux/features/loginSlice'
import { RootState } from '../../redux/store';
import { Button, Box, TextField } from '@mui/material';
import axios from 'axios'
import { useState } from 'react';

interface LoginForm {
  email: string;
  password: string;
}

interface UserCredential {
  role: string;
  token: string;
}


interface CredencialResponse {
  data: UserCredential
}

const initialLoginForm: LoginForm = {
  email: '',
  password: ''
};

const getVerifiedResult = (values: LoginForm, navigate:any) => {
  axios.post('http://localhost:5000/auth/login', values,{
    headers:{
      "Content-Type": "application/json",
    }
  })
    .then((response: CredencialResponse) => {
      const { token, role} = response.data;
      console.log(response.data)

      if (token) {
        window.localStorage.setItem("accessToken", JSON.stringify(token))
        window.localStorage.setItem("role", JSON.stringify(role))
        navigate('/')
      }
    })
    .catch(error => {
      console.log(error?.response?.data);

    });
}

const Login = () => {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const [state, setState] = useState<any>("");

  // subscribing to the loginSlice
  const { token } = useSelector((state: RootState) => state.login)
  console.log(token)

  //---------------------------------------------------------------------------

  const handleSubmit = async (values: LoginForm, formikHelpers: FormikHelpers<LoginForm>) => {

    // fetch the login url and return the state of success and token
    getVerifiedResult(values, navigate)

    // storing the token in localstate
    // const jsonString =  localStorage.getItem("accessToken");
    // if (jsonString) {
    //   const accessToken = JSON.parse(jsonString)
     
    //   console.log("accessToken", accessToken)

    //   if (accessToken) {
    //     // dispatch(verifyUser(accessToken))

    //       //resetiing the form
    //       formikHelpers.resetForm()
    //       toast.error("Login Sucessful",{
    //         position: toast.POSITION.TOP_RIGHT,}
    //       )

    //       //navigating to Home
    //       navigate('/')

    //       console.log("Login success");
        
    //   }
    // }
  };



  return (
    <Wrapper>
      <div className="form-container">
        <h2>Login</h2>
        <Formik
          initialValues={initialLoginForm}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting, errors, isValid, touched, dirty }) =>
            <Form>
              <Box height={14} />
              <Field name="email"
                type="email"
                as={TextField}
                size='small'
                variant="outlined"
                color="primary"
                label="Email"
                fullWidth
                errors={Boolean(errors.email) && Boolean(touched.email)}
                helperText={Boolean(touched.email) && errors.email}
              />

              <Box height={14} />
              <Field name="password"
                type="password"
                as={TextField}
                size='small'
                variant="outlined"
                color="primary"
                label="Password"
                errors={Boolean(errors.password) && Boolean(touched.password)}
                helperText={Boolean(touched.password) && errors.password}
                fullWidth />

              <Box height={16} />
              <Button type='submit' disabled={isSubmitting} variant='contained' color='primary' size='large' fullWidth>Login</Button>

            </Form>
          }
        </Formik>
      </div>
      <ToastContainer />
    </Wrapper>
  );
};

export default Login;
