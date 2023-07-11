import React from 'react';
import { makeStyles } from '@mui/styles';
import { Typography, Link, Container, Grid } from '@mui/material';

const useStyles = makeStyles({
  footer: {
    backgroundColor: '#f5f5f5',
    padding: '20px',
    marginTop: 'auto',
    position: 'sticky',
    left: 0,
    bottom: 0,
    width: '100%',
    textAlign: 'center',
  },
});

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body1" align="center">
              &copy; 2023 All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" align="center">
              Designed and Developed by Sarang
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
