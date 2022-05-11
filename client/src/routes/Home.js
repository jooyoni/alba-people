import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginInfo from "../components/LoginInfo";
import LogoutInfo from "../components/LogoutInfo";
import Post from "../components/Post";
import PostList from "../components/PostList";
import SelectBoard from "../components/SelectBoard";

const Container=styled.div`

`;
const TopMenu=styled.div`
    margin:0 auto;
    height:60px;
    display:flex;
    align-items:center;
    width:1050px;
    justify-content:space-between;
`;
const Logo=styled.div`
    font-size:28px;
    font-weight:bold;
`;

const Content=styled.div`
    width:1050px;
    margin:0 auto;
    display:flex;
    justify-content: space-between;
    margin-top:20px;
`;
const Left=styled.div`
    width:68%;
`;
const Right=styled.div`
    width:28%;
`;
const UserInfo=styled.div`

`;

function Home(){
    const [userInfo, setUserInfo]=useState();
    const navigate=useNavigate();
    const {pathname:location}=useLocation();

    useEffect(()=>{
        axios.post("http://localhost:5000/api/userConfirm").then((res)=>{
            setUserInfo(res.data);
        });
    },[]);
    useEffect(()=>{
        if(location=="/")
            navigate("/convenience/1");
    })
    function logoutClick(){
        setUserInfo("");
        axios.get('http://localhost:5000/api/logout');
    }
    function loginClick(){
        navigate("/login");
    }
    return (
        <Container>
            <TopMenu>
                <Logo>𝗥𝗯𝗮𝗣𝗲𝗼𝗽𝗹𝗲</Logo>
            </TopMenu>
            <Content>
                <Left>
                    <SelectBoard />
                    <Outlet />
                </Left>
                <Right>
                    <UserInfo>
                        {userInfo?<LoginInfo userName={userInfo[0]} logout={logoutClick} />:<LogoutInfo />}
                    </UserInfo>
                </Right>
            </Content>
        </Container>
    )
}

export default Home;