import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Post from "./Post";

const PostLists=styled.div`
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
    & > div:last-child::after{
        display:none;
    }
`;
const PageSelect=styled.div`

`;
function PostList(){
    const [post, setPost]=useState([]);
    const [postLength, setPostLength]=useState(0);
    const location=useLocation();
    const {postCategory:params}=useParams();
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/post/${params}`).then((res)=>{
            setPost(res.data);
        });
    },[params]);
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/postLength/${params}`).then((res)=>{
            setPostLength(res.data[0]['COUNT(*)']/15);
        })
    },[])
    console.log(postLength);
    return (
        <PostLists>
            {post.map((item)=>{
                return (
                    <Post key={item.id} img={item.img} title={item.title} writeTime={item.time} writer={item.writer}></Post>
                )
            })}
            <PageSelect>
                <span>이전</span>
                <div></div>
                <span>다음</span>
            </PageSelect>
        </PostLists>
    )
}
export default PostList;