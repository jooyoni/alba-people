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
    width:450px;
    margin:0 auto;
    padding-top:20px;
`;
const Form=styled.form`
    & > div > input, & > div > select{
        width:100%;
        box-sizing:border-box;
        height:40px;
        font-size:16px;
        border-radius: 3px;
        border:1px solid #dfdfdf;
    }
    & > div{
        margin-bottom:10px;
    }
    & > button{
        width:100%;
        height:40px;
        font-size:17px;
        color:white;
        background-color: #49492a;
        border:1px solid #dfdfdf;
        border-radius:3px;
    }
`;
const ErrorMsg=styled.div`
    font-size:13px;
    color:red;
`;
const Logo=styled.div`
    font-size:30px;
    font-weight:900;
    text-align: center;
    margin-bottom:30px;
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
            console.log(res);
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
                <Logo>????????????????????????????????????</Logo>
                <Form onSubmit={handleSubmit(onValid)}>
                    <div>
                        <label htmlFor="id">?????????</label>
                        <input { ...register("id",{required:true, pattern:/^[a-z0-9_]{5,20}$/})} type="text" id="id" onBlur={()=>{setOverlapId(false)}} />
                        {formState?.errors.id&&<ErrorMsg>5~20?????? ?????? ?????????, ????????? ????????????(_)??? ?????? ???????????????.</ErrorMsg>}
                        {overlapId&&<ErrorMsg>?????? ???????????? ??????????????????.</ErrorMsg>}
                    </div>
                    <div>
                        <label htmlFor="pass">????????????</label>
                        <input {...register("pass", {required:true, pattern: /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,25}$/})} type="password" id="pass" />
                        {formState?.errors.pass&&<ErrorMsg>8~25?????? ?????? ?????????, ??????, ??????????????? ?????? ?????? 1??? ??????????????? ?????????.</ErrorMsg>}
                    </div>
                    <div>
                        <label htmlFor="passCheck">???????????? ?????????</label>
                        <input {...register("passCheck", {required:true})} type="password" id="passCheck" onBlur={()=>{watch().pass===watch().passCheck?setPassCheck(true):setPassCheck(false)}} />
                        {!passCheck&&<ErrorMsg>??????????????? ???????????? ????????????.</ErrorMsg>}
                    </div>

                    <div>
                        <label htmlFor="name">??????</label>
                        <input {...register("name", {required:true, pattern:/^[???-???]+$/ })} type="text" id="name"/>
                        {formState?.errors.name&&<ErrorMsg>????????? ???????????? ????????????.</ErrorMsg>}
                    </div>
                    <div>
                        <label htmlFor="birth">????????????</label>
                        <input {...register("birth", {required:true, pattern:/^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/})} type="text" id="birth" placeholder="19990101" />
                        {formState?.errors.birth&&<ErrorMsg>??????????????? ???????????? ????????????.</ErrorMsg>}
                    </div>
                    <div>
                        <label htmlFor="gender">??????</label>
                        <select id="gender" {...register("gender")}>
                            <option value="??????">??????</option>
                            <option value="??????">??????</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="phone">?????????</label>
                        <input {...register("phone", {required:true, pattern:/^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/})} type="text" id="phone" placeholder="000-0000-0000" />
                        {formState?.errors.phone&&<ErrorMsg>??????????????? ???????????? ????????????.</ErrorMsg>}
                    </div>
                    <button>????????????</button>
                </Form>
            </Content>
        </Container>
    )
}
export default InsertMember;