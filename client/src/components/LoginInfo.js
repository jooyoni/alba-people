import axios from "axios";
import styled from "styled-components";

const Container=styled.div`
    width:100%;
    display:flex;
    flex-direction: column;
    align-items: center;
    border:1px solid #dfdfdf;
    & > button{
        width:70px;
    }
`;
const Info=styled.div`
    width:85%;
    height:70px;
    margin:0 auto;
    display:flex;
    margin-top:10px;
`;
const ProfileImg=styled.img`
    width:55px;
    height:55px;
    border-radius:50%;
    margin-right:10px;
`;

function LoginInfo({userName, logout}){

    return (
        <Container>
            <Info>
                <ProfileImg src={`${process.env.PUBLIC_URL}/image/gibon.jpg`} />
                <div>
                    <span>{userName}님</span>

                </div>
            </Info>
            <button onClick={logout}>로그아웃</button>
        </Container>
    );
}
export default LoginInfo;