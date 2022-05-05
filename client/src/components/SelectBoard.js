import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Container=styled.div`
    width:100%;
    display:flex;
    justify-content: space-between;
`;
const JobCategory=styled.button`
    border-radius:10px;
    border:none;
    padding:10px 20px;
    background-color:${props=>props.selected?"black":"darkgray"};
    color:${props=>props.selected?"white":"black"};
    font-weight:bold;
    cursor:pointer;
`;
const list=[{name:"편의점", link:"convenience"},{name:"음식점", link:"restaurant"},{name:"배달", link:"delivery"},{name:"사무직", link:"office"},
{name:"현장직", link:"field"},{name:"고객상담ㆍ영업", link:"telemarketing"},{name:"기타", link:"etc"}
]
function SelectBoard(){
    const navigate=useNavigate();
    const {pathname:location}=useLocation();
    const {postCategory:params}=useParams();
    function onClick(link){
        navigate(`/${link}`);
    }
    return (
    <Container>
        {list.map((item,index)=><JobCategory selected={item.link===params} onClick={()=>onClick(item.link)} key={item.name}>{item.name}</JobCategory>)}
    </Container>
    );
}

export default SelectBoard;