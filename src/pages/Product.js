import { Add, Remove } from '@material-ui/icons';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import mobile from '../responsive';
import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { publicRequest } from '../requestMethods';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';


const Container = styled.div`
`

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({padding: "10px", flexDirection:"column"})}

`

const ImgContainer = styled.div`
        flex: 1;
`

const Image  = styled.img`
    width: 50%;
    height: 50vh;
    object-fit: cover;
    padding: 0 70px;
    ${mobile({height: "40vh"})}

`

const InfoContainer = styled.div`
    flex: 1;
`
const Title = styled.h2`
    font-weight: 600;

`
const Desc = styled.p`
margin: 20px 0px;

`

const Price = styled.span`
    font-weight: 100%;
    font-size: 40px;
`


const FilterContainer = styled.div`
    width: 40%;
    margin: 30px 0px;
    display: flex;
    justify-content:space-between;
`
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin: 0px 3px;
    cursor: pointer;
`
const FilterTitle = styled.span`
    font-style: 20px;
    font-weight: 200px;
`
const FilterSizeOption = styled.option`
margin: 5px;
`
const Filter = styled.div`
    display: flex;
    align-items: center;

`
const FilterSize = styled.select`
    margin: 5px;
    padding: 5px;
`;

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: space-between;
    justify-content: center;
    ${mobile({width:"100%"})}
`;
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
    justify-content: space-between;
`;
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 0px 5px;
`;

const Button = styled.button`
    padding: 15px;
    margin-left: 40px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover{
        background-color: #f8f4f4;
    } 
`;

const Product = () => {

    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    //const [color, setColor] = useState("");
    let [size, setSize] = useState([]);
    const dispatch = useDispatch();
    // const newSize = {size:[]};
   


    useEffect(() => {
        const getProduct = async () => {
            try{
                const res = await publicRequest.get("/products/find/" + id);
                setProduct(res.data);
            } catch(err) {
                console.log(err);
            }
        };
        getProduct(); 
     },[id,size])


    const handleQuantity = (type) => {
        if (type === "dec") {
          quantity > 1 && setQuantity(quantity - 1)
        } else {
            setQuantity(quantity + 1)
        }
    } 

    // const handleColor = (e) => {

    //     const value = e.target.value;
    //     setColor({
    //         ...color,
    //         [e.target.name]: value, 
    //     });

    // };

    const handleSize = (e) => {
        let value = [e.target.value];
        setSize(value);
    };
 
    console.log("taille :" + size);

    const handleClick = () => {
        product.size = size;
        dispatch( addProduct({ ...product , quantity })) ;

    }


    return (
            <Container>
                <Navbar />
                <Announcement />
                <Wrapper >
                    <ImgContainer>
                        <Image src={product.img}/>
                    </ImgContainer>
                    <InfoContainer>
                        <Title>{product.title}</Title>
                        <Desc>{product.desc}</Desc>
                        <Price>$ {product.price}</Price>
                        <FilterContainer>
                            <Filter>
                                <FilterTitle>Couleur:</FilterTitle>
                                { 
                                    product.color?.map((c) => 
                                        <FilterColor color={c} key={c}></FilterColor>)
                                    
                                }
                            </Filter>
                            <Filter>
                                <FilterTitle>Taille</FilterTitle>
                                <FilterSize name="" key={product.size} onChange={handleSize}>
                                
                                    { 
                                        product.size?.map((s) =>
                                                <FilterSizeOption key={s} onClick={handleSize}>{s}</FilterSizeOption>
                                        )
                                    }
                                  
                                    
                                </FilterSize>
                            </Filter>
                        </FilterContainer>
                        <AddContainer>
                            <AmountContainer>
                                <Remove onClick={ () => handleQuantity("dec")}/>
                                <Amount>{quantity}</Amount>
                                <Add onClick={() => handleQuantity("inc")}/>
                            </AmountContainer>
                            <Button onClick={handleClick}>AJOUTER A LA CARTE</Button>
                        </AddContainer>
                    </InfoContainer>
                </Wrapper>
    </Container>)
}




export default Product;
