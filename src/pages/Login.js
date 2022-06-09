import styled from "styled-components";
import mobile from "../responsive";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";



const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255,255,255,0.5), 
        rgba(255,255,255,0.5)
    ),
    url("https://img.freepik.com/photos-gratuite/femme-elegante-sacs-provisions_23-2148733313.jpg?w=2000")
    center;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
`
const Form = styled.form`
    display: flex; 
    flex-direction: column;
`
const Title = styled.h1`
    text-transform: uppercase;
    font-size: 24px;
    font-weight: 300;
`
const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;
    ${mobile({width: "75%"})}
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    margin-top: 10px;
    background-color: teal;
    color: white;
    cursor: pointer;
    &:disabled {
        color: green;
        cursor: not-allowed;
    }
`

const Link = styled.a`
    margin: 5px 0px;
    font-size: 15px;
    text-decoration: underline;
    cursor: pointer;
`

const Error = styled.span`
    color: red;
`

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector((state) => state.user);


    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, {username, password})
    }

    return (
        <Container>
            <Wrapper>
                <Title>se connecter</Title>
                <Form>
                    <Input 
                        placeholder="nom d'utilisateur"
                        onChange={(e) =>setUsername(e.target.value)}
                    />
                    <Input 
                        placeholder="mot de passe"
                        type="password"
                        onChange={(e) =>setPassword(e.target.value)}
                    />
                    <Button 
                        onClick={handleClick}
                        disabled={isFetching}
                    >
                            ENTRER
                    </Button>
                    {error && <Error>Qu'est ce qui n'a pas marché 🔞</Error>}
                    <Link>avez-vous oublié le mot de passe ???</Link>
                    <Link>créer un nouveau compte</Link>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login