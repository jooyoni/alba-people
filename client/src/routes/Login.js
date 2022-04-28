import { useQuery } from "react-query";
import { useEffect } from "react";
import { getUser } from "../api";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

const Container=styled.div`
`;
const Contents=styled.div`
    border:1px solid black;
    width:360px;
    margin:0 auto;
`;
const Logo=styled.div`
    font-size:30px;
    font-weight:bold;
    text-align: center;
    padding:30px 0;
    & > span{
        @font-face {
        font-family: 'SuncheonB';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2202-2@1.0/SuncheonB.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    }
`;
const Form=styled.form`
    display:flex;
    flex-direction: column;
`;

const Id=styled.input``;
const Pw=styled.input``;
const Btn=styled.button``;
const LoginKeep=styled.span`
    display:flex;
    align-items: center;
    &>div{
        display:flex;
        justify-content: center;
        align-items: center;
        border:1px solid black;
        border-radius: 50%;
        width:15px;
        height:15px;
        font-size:12px;
    }
`;
const LoginMenu=styled.div`
    display:flex;
    justify-content: center;
    & > div{
        font-size:13px;
        display:flex;
        align-items: center;
        & > a{
            text-decoration: none;
            color:inherit;
        }
    }
    & > div::after{
        content:"";
        display:inline-block;
        border-left:1px solid black;
        height:60%;
        margin:0 5px;
    }
    & > div:last-child::after{
        display:none;
    }
`;
function Login(){
    const {data, isLoading}=useQuery("userInfo", getUser, {staleTime:Infinity, cacheTime:Infinity});
    const {register,watch} = useForm();
    const onSubmit=(e)=>{
        e.preventDefault();
        const config={
            headers:{
                'Content-Type':"application/json"
            }
        }
        axios.post('http://localhost:5000/api/login', JSON.stringify({id:watch().id, pw:watch().pw}), config).then(res=>{
            if(res.data==false){
                console.log("login failed")
            }
            else{
                console.log("login successed",res,data.token);
                localStorage.setItem("jwtToken",res.data.token)
            }  
        });
    }
    useEffect(()=>{
        axios.post('http://localhost:5000/api/userConfirm', {token:localStorage.getItem("jwtToken")});
    },[])
    return (
        <Container>
            <Contents>
                <Logo><span>알바프렌드</span></Logo>
                <Form onSubmit={onSubmit}>
                    <Id {...register("id")} type="text" placeholder="아이디" />
                    <Pw {...register("pw")} type="password" placeholder="비밀번호" />
                    <Btn type="submit">로그인</Btn>
                </Form>
                <LoginKeep>
                    <div>✔</div>로그인 상태 유지
                </LoginKeep>
                <LoginMenu>
                    <div>아이디 찾기</div><div>비밀번호 찾기</div><div><Link to="/insertMember">회원가입</Link></div>
                </LoginMenu>
            </Contents>
        </Container>
    );
}
export default Login;