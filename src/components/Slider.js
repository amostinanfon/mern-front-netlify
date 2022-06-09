import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import styled from 'styled-components';
import { sliderItems } from '../data';
import mobile  from '../responsive'


const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    background-color: white;
    position: relative;
    overflow: hidden;
    ${mobile({display:"none"})}

`

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border-radius: 50%;
    top: 0;
    bottom: 0;
    left: ${props=> props.direction === "left" && "10px"};
    right: ${props=> props.direction === "right" && "10px"};
    margin: auto;
    cursor: pointer;
    opacity:0.5 ;
    z-index: 2;
`

const Wrapper = styled.div`
    height: 100px;
    display: flex;
    transform: translateX(${(props) => props.slideIndex * -100}vw);

`

const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: ${(props) => props.bg};
`

const ImgContainer = styled.div`
    flex: 1;
`
const Image = styled.img`
    height: 100% ;
    width: 100% ;
    
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
    margin: 100px;
`

const Title = styled.h2`
    font-size: 60px;
`

const Desc = styled.p`
    margin: 50px 0px ;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
`
const Button = styled.button`
    font-size: 20px;
    padding: 10px; 
`

const Slider = () => {

    const [slideIndex, setSlideIndex] = useState(0);

    const handleClick = (direction) => {
        if (direction === "left"){
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
        }
    }


  return (
    <Container>
        <Arrow direction="left" onClick={()=>handleClick("left")}>
            <ArrowLeftOutlined/>
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
            {sliderItems.map((item)=> (
                <Slide bg={item.bg} key={item.id}>
                    <ImgContainer>
                        <Image src={item.img}/>
                    </ImgContainer>
                    <InfoContainer>
                        <Title>{item.title}</Title>
                        <Desc>
                            {item.desc}
                        </Desc>
                        <Button>VOIR PLUS</Button>
                    </InfoContainer>
                </Slide>
            ))}
        </Wrapper>
        <Arrow direction="right" onClick={()=>handleClick("right")}>
            <ArrowRightOutlined/>
        </Arrow>
    </Container>
  )
}

export default Slider;