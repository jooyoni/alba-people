import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
const Content=styled.div`
    overflow-x: scroll;
    
`;
const ChangeButton=styled.div`
`;
function PostDetail(){
    const [showButton, setShowButton]=useState(false);
    const [postInfo, setPostInfo]=useState();
    const {postCategory:category}=useParams();
    const {postId:id}=useParams();
    const navigate=useNavigate();
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/postInfo/${category}/${id}`).then((res)=>{
             setPostInfo(res.data[0]);
        })
    },[])
    useEffect(()=>{
        axios.post('http://localhost:5000/api/userConfirm').then((res)=>{
            if(res.data[1]==postInfo?.writer){
                setShowButton(true);
            }else{
                setShowButton(false);
            }
        })
    },[postInfo]);
    const modifyBtn=()=>{
        navigate(`/makePost/${category}/${id}`)
    }
    const deleteBtn=()=>{
        let result=window.confirm("정말로 삭제하시겠습니까?");
        if(!result) return;
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        axios.delete(`http://localhost:5000/api/deletePost/${category}/${id}`).then(res=>{
            navigate(`/${category}/1`)
        })
    }
    return (
        <>
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
            {showButton?(
                <ChangeButton>
                <button onClick={modifyBtn}>수정</button>
                <button onClick={deleteBtn}>삭제</button>
            </ChangeButton>
            ):null}
        </>
    );
}
export default PostDetail;