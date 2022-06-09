import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from './Product';
import axios from "axios";



const Container = styled.div`
    padding: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`


const Products = ({cat, filters, sort}) => {

const [products,setProducts] = useState([]);
const [filteredProducts,setFilteredProducts] = useState([]);

useEffect(() => {
  const getProducts = async() => {
    try {
        const res = await axios.get(cat ? `https://mernecommerces02.herokuapp.com/api/products?category=${cat}` : "https://mernecommerces02.herokuapp.com/api/products")
        setProducts(res.data);
    } catch(err) {
        console.log(err);
    };
  }
    getProducts();
},[cat]);


useEffect(() =>{
    cat && setFilteredProducts(
        products.filter(item => Object.entries(filters).every(([key,value])=>
            item[key].includes(value)
        ))
    )
},[products,cat, filters])


useEffect(() =>{
        if ((sort === "nouveau")) {
            setFilteredProducts((prev) =>[...prev].sort((a,b) => a.createdAt - b.createdAt))
        } else if ((sort === "asc")) {
            setFilteredProducts((prev) =>[...prev].sort((a,b) => a.price - b.price))
    } else {
        setFilteredProducts((prev) =>[...prev].sort((a,b) => b.price - a.price))
    }
},[sort])

    return (<Container> 
                {
                       cat ? filteredProducts.map((item, index) => <Product  item={item} key={index} />) : 
                       products.slice(0, 8).map((item, index) => <Product  item={item} key={index}/>)
                }
           </Container>
   )
   
}


export default Products;