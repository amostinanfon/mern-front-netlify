//import React from "react";
import styled from "styled-components";
import {Search, ArrowDownwardOutlined, ShoppingCartOutlined} from "@material-ui/icons"
import Badge from '@material-ui/core/Badge';
import mobile from '../responsive'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { removeProduct } from "../redux/cartRedux";


const Container = styled.div`
  height: 60px;
  margin: 5px;
  ${mobile({height:"50px"})}
`

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: 'center';
  justify-content: space-between;
  ${mobile({padding:"10px 0px"})}

`
const Logo = styled.h3`
  font-weight: bold;
  ${mobile({fontSize:"24px"})}

`
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({display: "none"})}

`

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding-left: 6px;
`

const Input = styled.input`
  border: none; 
  ${mobile({width:"50px"})}

`

const Left = styled.div`
  display: flex;
  flex: 1;
  align-items: center
`

const Center = styled.div`
  flex: 1;
  text-align: center
`

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent:"center"})}

`

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 15px;
  ${mobile({fontSize:"10px", marginLeft:"10px"})}

`

const RemoveContainer = styled.div`
  padding-left: 5px;
  margin-left: 10px;
`

const Navbar = () => {

  const quantity = useSelector(state => state.cart.quantity);
  const dispatch = useDispatch();


  const removeCart = () => {
    quantity > 0 &&
        dispatch(
            removeProduct({ quantity })
        )
    }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Rechercher"/>
            <Search style={{color:'gray', fontSize:'16px'}} />
          </SearchContainer>
        </Left>
        <Center><Logo>AMOS</Logo></Center>
        <Right>
          <MenuItem>ENREGISTRER</MenuItem>
          <MenuItem>SIGN IN</MenuItem>
          <RemoveContainer>
            <ArrowDownwardOutlined onClick={removeCart} style={{cursor:"pointer", color:"blue"}}/>
          </RemoveContainer>
          <Link to="/cart">
            <MenuItem style={{margin:"0px"}}>
                  <Badge badgeContent={quantity} color="primary">
                    <ShoppingCartOutlined />
                  </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar;