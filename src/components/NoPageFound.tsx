import { Container } from "@mui/material";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',

  },
  text: {
    textAlign: 'center',
    fontSize:"20px"
  },
});

const NoPageFound = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <p className={classes.text}> Error 404! No Page found</p>
    </Container>
  );
};

export default NoPageFound;
