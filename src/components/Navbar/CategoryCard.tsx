const CategoryCard = ({name}:any)=>{
    
    return (
        <div className="cat-container">
            <img alt="category" src="https://picsum.photos/100"/>
            <p>{name}</p>

        </div>
    )
}
export default CategoryCard