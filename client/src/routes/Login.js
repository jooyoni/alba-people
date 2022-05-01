import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { getUser } from "../api";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
const Container=styled.div`
`;
const Contents=styled.div`
    width:400px;
    margin:0 auto;
    padding-top:100px;
`;
const Logo=styled.div`
    font-size:30px;
    font-weight:bold;
    text-align: center;
    padding:30px 0;
    margin-bottom: 15px;
    & > a{
        color:inherit;
        text-decoration: none;
    }

`;
const Form=styled.form`
    margin-bottom:25px;
    display:flex;
    flex-direction: column;
    & > div > input{
        height:45px;
        border-color:#dfdfdf;
        outline: none;
        font-size:16px;
        width:100%;
        box-sizing: border-box;
        padding-left: 25px;
    }
    & > div{
        width:100%;
        position:relative;
        & > svg{
            width:15px;
            height:15px;
            position:absolute;
            left:5px;
            top:50%;
            transform: translateY(-50%);
            fill:#dfdfdf;
        }
    }
`;

const Id=styled.input`
    border:1px solid #dfdfdf;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    border-bottom:none;
`;
const Pw=styled.input`
    border:1px solid #dfdfdf;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
`;
const Btn=styled.button`
    height:44px;
    background-color: #49492a;
    color:white;
    border-radius:7px;
    font-weight: bold;
    border:1px solid #dfdfdf;
    width:100%;
    margin-top:15px;
    font-size:16px;
    cursor: pointer;
`;

const LoginKeep=styled.span`
    display:flex;
    align-items: center;
    margin:7px 0 10px 0;
    & > div{
        display:flex;
        border:1px solid black;
        border-radius: 50%;
        width:16px;
        height:16px;
        justify-content: center;
        align-items: center;
        & > svg{
            width:12px;
        }
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

const ErrorMsg=styled.span`
    font-size:12px;
    color:red;
`;
function Login(){
    const {data, isLoading}=useQuery("userInfo", getUser, {staleTime:Infinity, cacheTime:Infinity});
    const [loginFailed, setLoginFailed]=useState(false);
    const {register,watch, handleSubmit, formState} = useForm();
    const navigate=useNavigate();

    const onValid=(data)=>{
        const config={
            headers:{
                'Content-Type':"application/json"
            }
        }
        axios.post('http://localhost:5000/api/login', JSON.stringify({id:watch().id, pw:watch().pw}), config).then(res=>{
            console.log(res);
            if(res.data==false||res==false){
                setLoginFailed(true);
            }
            else{
                console.log("login successed");
                navigate("/");
            }  
        });
    }
    useEffect(()=>{
        if(localStorage.getItem("jwtToken"))
            axios.post('http://localhost:5000/api/userConfirm', {token:localStorage.getItem("jwtToken")}); 
    },[]);
    return (
        <Container>
            <Contents>
                <Logo><Link to="/">𝗥𝗯𝗮𝗣𝗲𝗼𝗽𝗹𝗲</Link></Logo>
                <Form onSubmit={handleSubmit(onValid)}>
                    <div>
                        <Id {...register("id", {required:true})} type="text" placeholder="아이디" />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/></svg>
                    </div>
                    <div>
                        <Pw {...register("pw", {required:true})} type="password" placeholder="비밀번호" />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"/></svg>
                    </div>
                    <LoginKeep>
                        <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg></div>
                        <span>로그인 상태 유지</span>
                    </LoginKeep>
                    <ErrorMsg>{formState.errors.id?"아이디를 입력해주세요":formState.errors.pw?"비밀번호를 입력해주세요.":(
                        loginFailed?"아이디 또는 비밀번호를 잘못 입력했습니다.":null
                    )}</ErrorMsg>
                    <Btn type="submit">로그인</Btn>
                </Form>
                <LoginMenu>
                    <div>아이디 찾기</div><div>비밀번호 찾기</div><div><Link to="/insertMember">회원가입</Link></div>
                </LoginMenu>
            </Contents>
        </Container>
    );
}
export default Login;