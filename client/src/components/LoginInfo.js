import styled from "styled-components";

const Container=styled.div`
    width:100%;
    height:150px;
    border:1px solid red;
`;
const Info=styled.div`
    width:85%;
    height:70px;
    margin:0 auto;
    border:1px solid red;
`;
function LoginInfo(){
    return (
        <Container>
            <Info></Info>
        </Container>
    );
}
export default LoginInfo;