import { Link } from "react-router-dom";

function Home(){
    return (
        <div>
            <div>홈</div>
            <Link to="/login" >로그인</Link>
        </div>
    )
}

export default Home;