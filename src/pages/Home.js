import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Slider from "../components/Slider";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import styled from "styled-components";



const Container = styled.div`
margin: 0;
padding: 0;
`

const Home = () => {
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Slider />
      <Categories />
      <Products />
      <Newsletter/>
      <Footer/>
    </Container>
  );
};


export default Home;
