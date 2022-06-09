import React from 'react';
import styled from 'styled-components';
import mobile from '../responsive';


const Container = styled.div`
    height: 30px;
    background-color: teal;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 14px;
    ${mobile({width:"100%", justifyContent:"center"})}
`


const Announcement = () => {
  return (
    <Container>
        Super Deal gratuit à partir de 500$ !!!
    </Container>
  )
}

export default Announcement;