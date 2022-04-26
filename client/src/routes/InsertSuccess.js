import { useNavigate } from "react-router-dom";

function InsertSuccess(){
    const navigate=useNavigate();
    return (
        <div>
            회원가입완료
            <button onClick={()=>navigate("/")}>홈으로</button>
        </div>
    )
}
export default InsertSuccess;