import styled from "styled-components";
import {useForm} from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";

const Container=styled.div`
    width:100%;
`;
const Content=styled.div`
    border:1px solid black;
    width:450px;
    margin:0 auto;
`;
const Form=styled.form`
    & > div > input, & > div > select{
        width:100%;
        box-sizing:border-box;
    }
    & > div{
        height:70px;
    }
`;
const ErrorMsg=styled.div`
    font-size:13px;
    color:red;
`;
function InsertMember(){
    const {register, handleSubmit,watch, formState}=useForm();
    const navigate=useNavigate();
    const [passCheck,setPassCheck]=useState(true);
    const [overlapId, setOverlapId]=useState(false);
    const addUser=(data)=>{
        const url="http://localhost:5000/api/user";
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
        return axios.post(url, JSON.stringify({id:data.id, pass:data.pass, name:data.name, birth:data.birth, gender:data.gender, phone:data.phone}),config)
    }
    const onValid=(data)=>{
        if(!passCheck)
            return ;
        addUser(data).catch(err=>console.log(err)).then((res)=>{
            if(res.data==""){
                navigate("/insertSuccess");
            }
            else if(res.data.errno==1062)
                document.getElementById("id").focus();
                setOverlapId(true);
        });
    }
    return (
        <Container>
            <Content>
                <Form onSubmit={handleSubmit(onValid)}>
                    <div>
                    <label htmlFor="id">아이디</label>
                        <input { ...register("id",{required:true, pattern:/^[a-z0-9_]{5,20}$/})} type="text" id="id" onBlur={()=>{setOverlapId(false)}} />
                        {formState?.errors.id&&<ErrorMsg>5~20자의 영문 소문자, 숫자와 특수기호(_)만 사용 가능합니다.</ErrorMsg>}
                        {overlapId&&<ErrorMsg>이미 사용중인 아이디입니다.</ErrorMsg>}
                    </div>
                    <div>
                        <label htmlFor="pass">비밀번호</label>
                        <input {...register("pass", {required:true, pattern: /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,25}$/})} type="password" id="pass" />
                        {formState?.errors.pass&&<ErrorMsg>8~25자의 영문 소문자, 숫자, 특수문자가 각각 최소 1개 이상이어야 합니다.</ErrorMsg>}
                    </div>
                    <div>
                        <label htmlFor="passCheck">비밀번호 재확인</label>
                        <input {...register("passCheck", {required:true})} type="password" id="passCheck" onBlur={()=>{watch().pass===watch().passCheck?setPassCheck(true):setPassCheck(false)}} />
                        {!passCheck&&<ErrorMsg>비밀번호가 일치하지 않습니다.</ErrorMsg>}
                    </div>

                    <div>
                        <label htmlFor="name">이름</label>
                        <input {...register("name", {required:true, pattern:/^[ㄱ-힣]+$/ })} type="text" id="name"/>
                        {formState?.errors.name&&<ErrorMsg>이름이 올바르지 않습니다.</ErrorMsg>}
                    </div>
                    <div>
                        <label htmlFor="birth">생년월일</label>
                        <input {...register("birth", {required:true, pattern:/^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/})} type="text" id="birth" placeholder="19990101" />
                        {formState?.errors.birth&&<ErrorMsg>생년월일이 올바르지 않습니다.</ErrorMsg>}
                    </div>
                    <div>
                        <label htmlFor="gender">성별</label>
                        <select id="gender" {...register("gender")}>
                            <option value="남자">남자</option>
                            <option value="여자">여자</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="phone">연락처</label>
                        <input {...register("phone", {required:true, pattern:/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/})} type="text" id="phone" />
                        {formState?.errors.phone&&<ErrorMsg>전화번호가 올바르지 않습니다.</ErrorMsg>}
                    </div>
                    <button>회원가입</button>
                </Form>
            </Content>
        </Container>
    )
}
export default InsertMember;