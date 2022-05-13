import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
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
    display:flex;
    justify-content:center;
    margin-top:10px;
`;
const PageNum=styled.div`
    margin:0 10px;
    & > span{
        margin:0 4px;
        cursor: pointer;
    }
    & > span:hover{
        text-decoration: underline;
    }
`;
const WrBtn=styled.div`
    display:flex;
    justify-content: flex-end;
    & > button {
        background-color:#49492a;
        border:1px solid #dfdfdf;
        padding:5px 10px;
        color:white;
        border-radius:5px;
        cursor: pointer;
    }
`;
function PostList(){
    const navigate=useNavigate();
    const [post, setPost]=useState([]);
    const [postLength, setPostLength]=useState(0);
    const location=useLocation();
    const {postCategory:params}=useParams();
    const {page:page}=useParams();
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/post/${params}/${page}`).then((res)=>{
            setPost(res.data);
        });
    },[params, page,location]);
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/postLength/${params}`).then((res)=>{
            setPostLength(res.data[0]['COUNT(*)']/15);
        })
    },[params, page,location])
    function pageNumber(){
        let array=[];
        let pageRange=Number(page);
        if(pageRange%10==0)
            pageRange--;
        while(pageRange%10!=0)
            pageRange--;
        for(let i=pageRange+1;i<=pageRange+10;i++){
            if(i>Math.ceil(postLength))
                break;
            array.push(<span style={{fontWeight:page==i?"bold":"500"}} key={i} onClick={()=>navigate(`/${params}/${i}`)}>{i}</span>);
        }
        return array;
    }
    function makePost(){
        axios.get('http://localhost:5000/api/tokenConfirm').then(res=>{
            if(!res.data){
                alert("로그인이 필요한 서비스입니다.");
                navigate('/login');
            }else{
                navigate(`/makePost/${params}`)
            }
        })
    }
    function beforePage(){
        navigate(`/${params}/${Number(page)-1}`);
    }
    function nextPage(){
        navigate(`/${params}/${Number(page)+1}`);
    }
    return (<>
        <PostLists>
            {post?.map((item)=>{
                return (
                    <Post key={item.id} id={item.id} category={params} img={item.image} title={item.title} writeTime={item.time} writer={item.writer}></Post>
                )
            })}
        </PostLists>
        <PageSelect>
            {Number(page)!==1?<span onClick={beforePage}>이전</span>:null}
            <PageNum>
                {pageNumber()}
            </PageNum>
            {Math.ceil(postLength)===Number(page)?null:<span onClick={nextPage}>다음</span>}
        </PageSelect>
        <WrBtn>
            <button onClick={makePost}>글쓰기</button>
        </WrBtn>
    </>
    )
}
export default PostList;