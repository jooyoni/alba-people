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
    height:100vh;
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

const post=[{id:1, img:null, title:"이이이잉",writer:"김영준", writeTime:"13:50"},{id:2, img:null, title:"싱글벙글",writer:"박수빈", writeTime:"21:23"},
{id:3, img:null, title:"김영준, 교통사고 당해 입원",writer:"박수빈", writeTime:"20:23"},{id:4, img:null, title:"박수빈, 음주운전 사고내고 뺑소니",writer:"박수빈", writeTime:"21:23"},
{id:5, img:null, title:"이주연 카카오 최종합격",writer:"박수빈", writeTime:"12:15"},{id:6, img:null, title:"이주연vs김영준,박수빈 현피",writer:"박수빈", writeTime:"21:23"},
{id:7, img:null, title:"이주연 심경 고백 \"서브웨이, 햄버거 먹을 때마다 죽고싶어...\"",writer:"박수빈", writeTime:"19:23"},{id:8, img:null, title:"꾸꾸까까",writer:"박수빈", writeTime:"21:23"},
{id:9, img:null, title:"김영준, 사망",writer:"박수빈", writeTime:"21:23"},{id:10, img:null, title:"박수빈, 친구 살해혐의 구속",writer:"박수빈", writeTime:"21:23"},
{id:11, img:null, title:"김영준, 등록금 분실",writer:"박수빈", writeTime:"21:23"},{id:12, img:null, title:"박수빈, 통장에 의문의 330만원 입금",writer:"박수빈", writeTime:"21:23"},
{id:13, img:null, title:"이주연, 로또 1등 당첨... 실수령액 42억",writer:"박수빈", writeTime:"21:23"},{id:14, img:null, title:"칭챙총",writer:"박수빈", writeTime:"21:23"}]
function Home(){
    const [userInfo, setUserInfo]=useState();
    const navigate=useNavigate();
    const location=useLocation();
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
                    <SelectBoard />
                    <Outlet />
                </Left>
                <Right>
                    <UserInfo>
                        {userInfo?<LoginInfo userName={userInfo} />:<LogoutInfo />}
                    </UserInfo>
                </Right>
            </Content>
        </Container>
    )
}

export default Home;