import Carousel from "react-material-ui-carousel";
import Product from "../Product/Product";
import SideBar from '../SideBar/SideBar'
import './Home.css'
import { makeStyles } from '@mui/styles';
import CategoryBar from "../Navbar/CategoryBar";

const useStyles = makeStyles({
    carousel: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    }
});

const bannerImages = [
    {
        id: 1,
        bImg: "http://res.cloudinary.com/coupondora/image/upload/v1494581876/slider/banner3.jpg"
    },
    {
        id: 2,
        bImg: "http://res.cloudinary.com/coupondora/image/upload/v1495630672/slider/shopclues_image_banner.jpg"
    },
    {
        id: 3,
        bImg: "http://res.cloudinary.com/coupondora/image/upload/v1495624664/slider/bluestone_image_banner_1.jpg"
    },
    {
        id: 4,
        bImg: "http://res.cloudinary.com/coupondora/image/upload/v1495630560/slider/amazon_banner_1.jpg"
    },
];

const Home = () => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.carousel}>
                <img style={{height:"300px"}} className="image" alt='banner' src={bannerImages[0].bImg} />
            </div>

            <CategoryBar />

            <Product />
        </>
    );
};

export default Home;
