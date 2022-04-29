import {createStoreHook} from "react-redux"


const reducer=(state="false", action)=>{
    switch(action.type){
        case true:
            return true;
        default:
            return false;
    }
}
export default reducer