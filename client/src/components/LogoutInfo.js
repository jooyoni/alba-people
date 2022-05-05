import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container=styled.div`
    width:100%;
    height:100px;
    padding:0 20px;
    box-sizing:border-box;
    background-color:#f7f9fa;
    border:1px solid #dfdfdf;
`;
const Button=styled.button`
    width:100%;
    height:45px;
    font-weight:900;
    color:white;
    font-size:18px;
    background:#49492a ;
    border:none;
    margin-top:20px;  
    cursor:pointer;
`;
const Support=styled.div`
    margin-top:10px;
    display:flex;
    justify-content: space-between;
    & > span{
        font-size:12px;
    }
`;
function LogoutInfo(){
    const navigate=useNavigate();
    return (
        <Container>
            <Button onClick={()=>navigate("/login")}>RbaPeople 로그인</Button>
            <Support>
                <span>아이디 비밀번호 찾기</span>
                <span>회원가입</span>
            </Support>
        </Container>
    )
}
export default LogoutInfo;