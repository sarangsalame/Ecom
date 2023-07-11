import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductContainer from "./ProductContainer";
import { Container, Typography, Select, MenuItem, SelectChangeEvent } from '@mui/material';
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
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  select: {
    width: '200px',
  },
  productContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const ProductByCategory = () => {
  const classes = useStyles();

  const [categoryList, setCategoryList] = useState<any>([]);
  const [categoryData, setCategoryData] = useState<any>({
    category: null,
    productList: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonString: any = localStorage.getItem("accessToken");
        const accessToken = JSON.parse(jsonString);

        const response = await axios.get("http://localhost:5000/category", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setCategoryList(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleChange = async (e: SelectChangeEvent<any>) => {
    const category = e.target.value as string;

    try {
      const jsonString: any = localStorage.getItem("accessToken");
      const accessToken = JSON.parse(jsonString);

      if (category) {
        const response = await axios.get(
          `http://localhost:5000/products/category/${category}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        setCategoryData({
          category,
          productList: response.data,
        });
      } else {
        setCategoryData({
          category: null,
          productList: [],
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Typography variant="h6" className={classes.title}>
        Products by Categories
      </Typography>
      <Select
        className={classes.select}
        value={categoryData.category || ""}
        onChange={handleChange}
      >
        <MenuItem value="">Select Category</MenuItem>
        {categoryList.map((item: any) => (
          <MenuItem value={item.id} key={item.id}>
            {item.category_name}
          </MenuItem>
        ))}
      </Select>
      <div className={classes.productContainer}>
        <ProductContainer productList={categoryData.productList} />
      </div>
    </Container>
  );
};

export default ProductByCategory;
