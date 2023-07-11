import React, { useState, useEffect } from "react";
import { Field, Formik, useFormik } from "formik";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

// interface initial  {
//   imgCollection:FileList | null,
//   category_name:string
// }

const container= {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
}

const FilesUploadComponent = () => {
    const initialValues = {
        product_name: "",
        brand_name: "",
        product_description: "",
        price: 0,
        stock: 0,
        category_id: 0,
        photos: null,

    }

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        const getCategories = () => {
            axios.get("http://localhost:5000/category").then((response: any) => {
                setCategories(response.data);
            });
        }
        getCategories()
    }, [])


    const handleOnSubmit = (values: any, {resetForm}:any) => {
        // console.log(values)
        const {
            product_name,
            brand_name,
            product_description,
            stock,
            price,
            category_id,
            photos
        } = values;

        if (

            !product_name ||
            !product_description ||
            !stock ||
            !price ||
            !brand_name ||
            !category_id ||
            !photos
        ) {
            return;
        }

        const formData = new FormData();
        formData.append("product_name", product_name);
        formData.append("brand_name", brand_name);
        formData.append("product_description", product_description);
        formData.append("stock", stock);
        formData.append("price", price);
        formData.append("category_id", category_id);

        for (const key of Object.keys(photos)) {
            formData.append("photos", photos[key]);

        }

        // console.log(formData);
        const jsonString: any = localStorage.getItem("accessToken");
        const accessToken = JSON.parse(jsonString)
        
        axios
            .post("http://localhost:5000/products/add", formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then((res) => {
                // console.log(res.data);
                toast(res.data.message);
                resetForm()
            })
            .catch((error) => {
                console.error(error);
                if (error.message === "Request failed with status code 409") {
                    alert("Category name Already exist");
                }
            });
    };

    const { handleSubmit, values, handleChange, setFieldValue, resetForm } = useFormik({
        initialValues: initialValues,
        onSubmit: handleOnSubmit
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue("photos", e.target.files);
    };

    return (
        <div className="addprodcontainer">
            <h3>Add Product</h3>
            <form
                style={{
                    width: "300px",
                    height: "auto",
                    flexDirection: "column",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
                onSubmit={handleSubmit}
            >
                <input
                    placeholder="Enter the product_name"
                    type="text"
                    name="product_name"
                    value={values.product_name}
                    onChange={handleChange}
                />
                <input
                    placeholder="Enter the brand_name"
                    type="text"
                    name="brand_name"
                    value={values.brand_name}
                    onChange={handleChange}
                />

                <input
                    placeholder="Enter the discription"
                    type="text"
                    name="product_description"
                    value={values.product_description}
                    onChange={handleChange}
                />
                <input
                    placeholder="Enter the stock"
                    type="text"
                    name="stock"
                    value={values.stock}
                    onChange={handleChange}
                />

                <input
                    placeholder="Enter the price"
                    type="text"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                />

                <select name="category_id"
                    onChange={handleChange}>

                    <option value="">Categories</option>
                    {
                        categories.map((item: any) => {
                            return <option key={item.id} value={item.id}>{item.category_name}</option>
                        })
                    }
                </select>
                <input
                    type="file"
                    name="photos"
                    onChange={handleFileChange}
                    multiple
                />
                <button className="btn" type="submit">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default FilesUploadComponent;
