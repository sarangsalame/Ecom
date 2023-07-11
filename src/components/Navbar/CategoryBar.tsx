import axios from 'axios';
import { useState, useEffect } from 'react';
import CategoryCard from './CategoryCard';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    background: '#e8f2fa',
    overflowX: 'scroll',
    // overflow: 'auto',
    height: '150px',
    padding: '10px',
    gap: '10px',
    borderRadius: '8px',
  },
});

const CategoryBar = () => {
  const [categories, setCategories] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const jsonString: any = localStorage.getItem('accessToken');
    const accessToken = JSON.parse(jsonString);

    const getCategories = () => {
      axios
        .get('http://localhost:5000/category', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response: any) => {
          setCategories(response.data);
        });
    };

    getCategories();
  }, []);

  return (
    <div className={classes.container}>
      {categories.length !== 0 &&
        categories.map((item: any) => <CategoryCard key={item.id} name={item.category_name} />)}
      
    </div>
  );
};

export default CategoryBar;
