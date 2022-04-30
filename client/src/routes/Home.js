import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home(){
    const [userName, setUserName]=useState("");
    const navigate=useNavigate();
    useEffect(()=>{
        axios.post("http://localhost:5000/api/userConfirm").then((res)=>{
            setUserName(res.data);
        });
    },[])
    console.log(userName)
    return (
        <div>
            {userName?`${userName}님 환영합니다`:null}
            {userName?<button onClick={()=>{
                setUserName("");
                axios.get('http://localhost:5000/api/logout');
            }}>로그아웃</button>:<button onClick={()=>navigate("/login")}>로그인</button>}
        </div>
    )
}

export default Home;