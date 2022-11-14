import axios from 'axios';




//const BASE_URL = "https://mernecommerces02.herokuapp.com/api/"
const BASE_URL = "http://localhost:8080/api/"

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNWQ3MjhjM2U2NWQyODE4YmQ4MTcxYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTcwNzU3MCwiZXhwIjoyNTE1NzA3NTcwfQ.25-9nUMcRUAaFFJg8ZXgT7cm91J-czrwdVdL6A4y93M"


export const publicRequest = axios.create({
    baseURL: BASE_URL
});


export const userRequest = axios.create({
    baseURL: BASE_URL,
    header:{token:`Bearer ${TOKEN}`}
})