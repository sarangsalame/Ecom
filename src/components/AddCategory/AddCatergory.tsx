import React, { useState } from "react";
import { useFormik } from "formik";
import axios, { AxiosResponse } from "axios";
import { toast } from 'react-toastify'
import ListCategory from "./ListCategory";
import { Button, Container, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    width: '100%',
  },
  input: {
    width: '100%',
  },
  button: {
    width: '200px',
  },
});



const AddCategory = () => {
  const classes = useStyles();
  const [update, setUpdate] = useState<any>(false)

  const handleOnSubmit = (values: any, {resetForm}:any) => {
    const { imgCollection, category_name } = values;

    if (!imgCollection || !category_name) {
      return;
    }

    // appending values in from data...............................
    const formData = new FormData();
    formData.append("category_name", category_name);

    for (const key of Object.keys(imgCollection)) {
      formData.append("photos", imgCollection[key]);
    }

    const jsonString: any = localStorage.getItem("accessToken");
    const accessToken = JSON.parse(jsonString);

    // api request call.............................................
    axios
      .post("http://localhost:5000/category/add", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        // console.log(res);
        toast(res.data.message)
        setUpdate(true)
        resetForm( )
      })
      .catch((error) => {
        console.error(error); 
        if (error.message === "Request failed with status code 409") {
          alert("Category name already exists");
        }
        // toast()
      });
  };

  const { handleSubmit, values, handleChange, setFieldValue } = useFormik({
    initialValues: {
      imgCollection: null,
      category_name: "",
    },
    onSubmit: handleOnSubmit,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("imgCollection", e.target.files);
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Typography variant="h6">Add Categories</Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          className={classes.input}
          placeholder="Enter the category"
          type="text"
          name="category_name"
          value={values.category_name}
          onChange={handleChange}
        />
        <input
          type="file"
          name="imgCollection"
          onChange={handleFileChange}
          multiple
        />
        <Button
          className={classes.button}
          variant="contained"
          disabled={!values.category_name}
          type="submit"
        >
          Add Category
        </Button>
      </form>
      <ListCategory  update={update} setUpdate={setUpdate}/>
    </Container>
  );
};

export default AddCategory;
