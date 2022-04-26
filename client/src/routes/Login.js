import { useQuery } from "react-query";
import { useEffect } from "react";
import { getUser } from "../api";

function Login(){
    const {data, isLoading}=useQuery("userInfo", getUser, {staleTime:Infinity, cacheTime:Infinity});
    console.log(data);
    return (
        <div>
            {data?.map(user=><div>이름:{user.name}, 생년월일:{user.birth}</div>)}
        </div>
    );
}
export default Login;