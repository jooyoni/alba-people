import styled from "styled-components";

const Container=styled.div`
`;
const Title=styled.input`
    width:100%;
    box-sizing: border-box;
    height:35px;
    border:1px solid #dfdfdf;
    outline: none;
`;
function MakePost(){
    return (
        <Container>
            <Title placeholder="제목을 입력하세요."></Title>
            <editor>df</editor>
        </Container>        
    )
}
export default MakePost;