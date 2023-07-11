import * as yup from 'yup'
// min 5 characters, 1 uppercase letter, 1 lower case letter, 1 numeric digit.
// const passwordRules =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const loginSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup
    .string()
    .min(5)
    .required("Required"),
    
})
export const signUpSchema = yup.object().shape({
    firstName:yup.string().required("Required"),
    lastName:yup.string().required("Required"),
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup
    .string()
    .min(5)
    .required("Required"),
    mobile:yup.string().max(10).required(),
    address:yup.string(),
    pincode:yup.string()
})

export const categorySchema = yup.object().shape({
    category:yup.string().required("Category Required"),
    productImage: yup
  .mixed()
  .required("Provide Image please")
  .test(
    "File Type",
    "Invalid!",
    (value: any) =>
      value && ['image/png', 'image/jpeg'].includes(value.type)
  ),

})

export const addProductSchema = yup.object().shape({
  product_name: yup.string().required("Please Add Category Name"),
  brand_name: yup.string().required("Please Add Brand Name"),
  product_description: yup.string().required("Please Add Category Discription"),
  price:yup.number().required("Please add Price"),
  stock: yup.number().required("Stock Quantatiy Required"),
  category_id: yup.number().required("Please Select Any One Category"),
  photos:yup.array().of(yup.string().required("Product Photo required"))
})
