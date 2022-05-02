import styled from "styled-components";

const Container=styled.div`
    padding:0 10px;
    height:60px;
    display:flex;
    align-items: center;
    justify-content:space-between;
    & > div{
        display:flex;
        align-items: center;
    }
`;
const Img=styled.img`
    width:70px;
    height:50px;
    margin-right:5px;
`;
const Title=styled.div`
    font-weight:bold;
`;
const Info=styled.div`
    font-size:13px;
    color:#dfdfdf;
    & > div{
        content:"";
        border-left:1px solid #dfdfdf;
        height:9px;
        align-self: center;
        margin:0 3px;
    }
`;
function Post(props){
    console.log(props);
    return (
        <Container>
            <div>
                <Img src={props.img}></Img>
                <Title>{props.title}</Title>
            </div>
            <Info>{props.writer}<div></div>{props.writeTime}</Info>
        </Container>
    )
}
export default Post;