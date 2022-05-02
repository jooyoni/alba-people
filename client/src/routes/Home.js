import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginInfo from "../components/LoginInfo";
import LogoutInfo from "../components/LogoutInfo";
import Post from "../components/Post";

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
const MenuList=styled.ul`
    display:flex;
    &, li{
        list-style:none;
        padding:0;
    }
`;
const Menu=styled.li`
    font-weight:bold;
    font-size:17px;
    margin-left: 20px;
    cursor: pointer;
    & >svg{
        width:15px;
        margin-right:5px;
    }
`;
const Content=styled.div`
    width:1050px;
    border:1px solid red;
    height:100vh;
    margin:0 auto;
    display:flex;
`;
const Left=styled.div`
    width:70%;
    border:1px solid gold;
`;
const Right=styled.div`
    width:30%;
    border:1px solid gold;
`;
const PostList=styled.div`
    & > div{
        position:relative;
    }
    & > div::after{
        content:"";
        display:block;
        border-top:1px solid #dfdfdf;
        position:absolute;
        bottom:0;
        left:0;
        width:100%;
    }
`;
const UserInfo=styled.div`

`;

const post=[{id:1, img:null, title:"이이이잉",writer:"김영준", writeTime:"13:50"},{id:2, img:null, title:"싱글벙글",writer:"박수빈", writeTime:"21:23"}]
function Home(){
    const [userInfo, setUserInfo]=useState();
    const navigate=useNavigate();
    useEffect(()=>{
        axios.post("http://localhost:5000/api/userConfirm").then((res)=>{
            setUserInfo(res.data);
        });
    },[])
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
                <MenuList>
                    <Menu>게시판</Menu>
                    <Menu onClick={userInfo?logoutClick:loginClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/></svg>
                        <span>{userInfo?"LOGOUT":"LOGIN"}</span>
                    </Menu>
                </MenuList>
            </TopMenu>
            <Content>
                <Left>
                    <PostList>
                        {post.map((item)=>{
                            return (
                                <Post key={item.key} img={item.img} title={item.title} writeTime={item.writeTime} writer={item.writer}></Post>
                            )
                        })}
                    </PostList>
                </Left>
                <Right>
                    <UserInfo>
                        {userInfo?<LoginInfo />:<LogoutInfo />}
                    </UserInfo>
                </Right>
            </Content>
        </Container>
    )
}

export default Home;