import React from 'react';
import NavBar from "./navbar";
import MainCard from './main-card';
import Container from '@material-ui/core/Container';

const Home = () => {
  return (
      <>
        <NavBar />
        <Container>
            <MainCard />
        </Container>
      </>
  );
};

export default Home;