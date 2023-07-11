import axios from "axios";
import { useEffect, useState } from "react"
import SingleProductAdmin from "./SingleProductAdmin";

const  AllProductsAdmin = ()=>{
    const [allProducts, setAllProducts] = useState<any>([])
    useEffect(() => {
        axios.get("http://localhost:5000/products/all_products_details")
        .then((response: any) => {
            setAllProducts(response.data)
        })
        .catch((err)=>console.log(err))
    }, [])
    return (
        <div>
           <SingleProductAdmin/>
        </div>
    )
}
export default AllProductsAdmin