import axios from "axios";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container=styled.div`
    border:1px solid #dfdfdf;
    border-radius:5px;
    min-height:500px;
    padding:0 20px;
`;
const PostInfo=styled.div`
    &::after{
        content:"";
        display:block;
        border-top:1px solid #dfdfdf;
        margin:15px auto;
    }
`;
const Title=styled.h2`
`;
const Writer=styled.div`
    display:flex;
    flex-direction: column;
`;
const Content=styled.div``;
function PostDetail(){
    const [postInfo, setPostInfo]=useState();
    const {postCategory:category}=useParams();
    const {postId:id}=useParams();
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/postInfo/${category}/${id}`).then((res)=>{
             setPostInfo(res.data[0]);
        })
    },[])
    return (
        <Container>
            {postInfo?(<>
            <PostInfo>
                <Title>{postInfo.title}</Title>
                <Writer>
                    <span>{postInfo.writer}</span>
                    <span>{postInfo.time}</span>
                </Writer>
            </PostInfo>
            <Content dangerouslySetInnerHTML={{ __html:postInfo.content }} />
            </>):null}
        </Container>
    );
}
export default PostDetail;