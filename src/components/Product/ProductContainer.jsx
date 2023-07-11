import CardComp from "../Card/CardComp"

const ProductContainer = ({productList})=>{
    return (
    <>
        {productList && productList.map((prod)=>{
            
            return (<CardComp key={prod.product_id} product={prod}/>)
        })
        
    }

        </>
    )
}
export default ProductContainer;