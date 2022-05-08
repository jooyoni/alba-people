import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import PostContent from "../components/PostContent";
import {useNavigate, useParams} from "react-router-dom";
const Container=styled.div`
    position:relative;
`;
const Title=styled.input`
    width:100%;
    box-sizing: border-box;
    height:35px;
    border:1px solid #d2d2d2;
    border-bottom:none;
    outline: none;
`;
function MakePost(){
    const [title, setTitle]=useState("");
    const [state, setState] = useState({ text: "" });
    const {postCategory:params}=useParams();
    const navigate=useNavigate();
    const handleChange = value => {
      setState({ text: value });
    };
    function postWrite(){
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        axios.get('http://localhost:5000/api/tokenConfirm').then(res=>{
            if(!res.data){
                alert("로그인이 필요한 서비스입니다.");
                navigate('/login');
            }else{
                axios.post('http://localhost:5000/api/insertPost',JSON.stringify({category:params, title:title, content:state.text}) ,config)
            }
        })
        
    }
    return (
        <Container>
            <Title placeholder="제목을 입력하세요." onChange={(e)=>setTitle(e.currentTarget.value)}></Title>
            <PostContent handleChange={handleChange} state={state} />
            <span style={{position:"absolute", bottom:"-100px"}} onClick={postWrite}>등록</span>
        </Container>
    )
}
export default MakePost;