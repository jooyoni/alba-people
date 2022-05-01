import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
const Container=styled.div`
    width:100%;
    height:100vh;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > div{
        width:200px;
        height:200px;
        border-radius: 50%;
        border:20px solid #49492a;
        display:flex;
        justify-content: center;
        align-items: center;
        margin-bottom:40px;
        & > svg{
            width:175px;
            height:175px;
            fill:#49492a;
        }
    }
    & > span{
        font-size:26px;
        font-weight: bold;
        color:#49492a;
        margin-bottom:25px;
    }
    & > a{
        display:flex;
        align-items: center;
        color:#49492a;
        text-decoration: none;
        font-size:18px;
        & > svg{
            width:15px;
            height:15px;
            margin-right:5px;
        }
    }
`;
function InsertSuccess(){
    const navigate=useNavigate();
    return (
        <Container>
            <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg></div>
            <span>회원가입이 완료되었습니다!</span>
            <Link to="/">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z"/></svg>홈으로 돌아가기
            </Link>
        </Container>
    )
}
export default InsertSuccess;