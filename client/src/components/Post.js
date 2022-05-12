import { useNavigate, useParams } from "react-router-dom";
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
    cursor: pointer;
`;
const Title=styled.div`
    cursor: pointer;
    font-weight:bold;
`;
const Info=styled.div`
    font-size:13px;
    color:#dfdfdf;
    display:flex;
    & > div:nth-child(2){
        content:"";
        border-left:1px solid #dfdfdf;
        height:10px;
        align-self: center;
        margin:0 5px;
    }
`;
function Post(props){
    const navigate=useNavigate();
    const PostClick=()=>{
        navigate(`/postDetail/${props.category}/${props.id}`)
    }
    return (
        <Container>
            <div >
                <Img onClick={PostClick} src={props.img?`http://localhost:5000/uploads/${props.img}`:null}></Img>
                <Title onClick={PostClick}>{props.title}</Title>
            </div>
            <Info><div>{props.writer}</div><div></div><div>{props.writeTime}</div></Info>
        </Container>
    )
}
export default Post;