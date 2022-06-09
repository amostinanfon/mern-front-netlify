import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Add , Remove } from "@material-ui/icons";
import mobile from "../responsive";
import { useSelector } from "react-redux";
import StripeCheckout from 'react-stripe-checkout';
import { useState, useEffect} from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";


const KEY = process.env.REACT_APP_STRIPE;



const Container = styled.div`
 width: 100vwh;
`

const Wrapper = styled.div`
    ${mobile({padding: "20px"})}
`;

const Title = styled.p`
    font-weight: 600;
    text-align: center;
    font-size: 25px;
`

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px;
    ${mobile({display: "flex", width: "85%"})}
`

const Bottom = styled.div`
    /* margin-top: 30px;
    padding-top: 20px; */
    display: flex;
    justify-content: space-space-between;
    ${mobile({flexDirection:"column"})}
`

const Info = styled.div`
    flex: 3;
`

const TopTexts = styled.div`
    ${mobile({display: "none" })}
    display: flex;
`

const TopText = styled.p`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`
const TopBottom = styled.button`
    padding: 5px;
    font-weight: 600;
    cursor: pointer;
    text-transform: uppercase;
    border: ${(props) => props.type === "filled" && "none"};
    background-color: ${(props) => props.type === "filled" ? "black" : "transparent"};
    color: ${(props) => props.type === "filled" && "white"};
    ${mobile({margin:"5px"})}
`

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px;
    ${mobile({flexDirection:"column"})}
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
    margin: 5px;

`
const Image = styled.img`
    width: 150px;
`
const Details = styled.div`
    padding-left: 30px;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const ProductName = styled.span`
`
const ProductId = styled.span`
`
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50% ;
    background-color: ${(props) => props.color};
`
const ProductSize = styled.span`

`
const PriceDetail = styled.div`
    flex:1;
    flex-direction: column;
    align-content: center;
    justify-content: center;
`
const ProductPrice= styled.div`
    font-size: 30px;
    font-weight: 200;
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`

const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
`

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`
const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    margin: 10px; 
    padding: 10px;
    height: 100%;
`

const SummaryTitle = styled.h3`
`

const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${(props) => props.type === "total" && "500"};
    font-size: ${(props) => props.type === "total" && "24px"};
`

const SummaryTitleText = styled.span`
`

const SummaryItemPrice = styled.span`
`

const Button = styled.button`
    background-color: black;
    color: white;
    font-size: 15px;
    padding: 10px;
    width: 100%;
    cursor: pointer;
`

const Cart = () => {

    const cart = useSelector(state => state.cart);
    const [stripeToken,setStripeToken] = useState(null);
    const navigate = useNavigate()

    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
            try{
                const res = await userRequest.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: 500,
                });                
                navigate("/success", {state : {data: res.data}});
            }catch{

            }
        }
      stripeToken && cart.total>=1 && makeRequest();
    }, [stripeToken, cart.total , navigate])
    

  return (
      <Container>
          <Navbar/>
          <Announcement/>
          <Wrapper>
              <Title>Votre sac</Title>
              <Top>
                  <TopBottom>continuez vos achats</TopBottom>
                  <TopTexts>
                      <TopText>Sac de courses(2)</TopText>
                      <TopText>Votre liste de souhaits(0)</TopText>
                  </TopTexts>
                  <TopBottom type="filled">réglez tout maintenant</TopBottom>
              </Top>
              <Hr/>
              <Bottom>
                      <Info>
                          {cart.products.map((product, index) =>(                                               
                                <Product key={index}>
                                    <ProductDetail>
                                        <Image src={product.img}/>
                                        <Details>
                                            <ProductName><b>Article:</b>{product.title}</ProductName>
                                            <ProductId><b>ID:</b>{product._id}</ProductId>
                                            <>
                                            Couleur
                                             {

                                                 product.color.map((color)=>
                                                    <ProductColor color={color}></ProductColor>
                                                 )
                                             }
                                            </>
                                            <ProductSize><b>Taille: </b>{product.size}</ProductSize>
                                        </Details>
                                    </ProductDetail>
                                    <PriceDetail>
                                        <ProductAmountContainer>
                                            <Add/>
                                            <ProductAmount>{product.quantity}</ProductAmount>
                                            <Remove/>
                                        </ProductAmountContainer>
                                        <ProductPrice>$ {product.price*product.quantity}</ProductPrice>
                                    </PriceDetail>
                                </Product>
                          ))}
                    </Info>
                            <Summary>
                                <SummaryTitle>recapitulatif de la commande</SummaryTitle>
                                <SummaryItem>
                                    <SummaryTitleText>Sous total</SummaryTitleText>
                                    <SummaryItemPrice>${cart.total} </SummaryItemPrice>
                                </SummaryItem>
                                <SummaryItem>
                                    <SummaryTitleText>Frais de livraison estimés</SummaryTitleText>
                                    <SummaryItemPrice>$ 30.8</SummaryItemPrice>
                                </SummaryItem>
                                <SummaryItem>
                                    <SummaryTitleText>Remise sur l'expédition</SummaryTitleText>
                                    <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                                </SummaryItem>
                                <SummaryItem type="total">
                                    <SummaryTitleText>Total</SummaryTitleText>
                                    <SummaryItemPrice>${cart.total}</SummaryItemPrice>
                                </SummaryItem>
                                <StripeCheckout 
                                    name='E commerce' 
                                    image='https://cdn-icons-png.flaticon.com/512/219/219983.png'
                                    billingAddress
                                    shippingAddress
                                    description={`VOtre total est $${cart.total}`}
                                    amount={cart.total*100}
                                    token={onToken}
                                    stripeKey={KEY}
                                >
                                    <Button>
                                        RÉGLER MAINTENANT
                                    </Button>
                                </StripeCheckout>
                            </Summary>
              </Bottom>
          </Wrapper>
          <Hr/>
          <Footer/>
      </Container>
  );
}





export default Cart;