export function getUser(){
    return fetch("http://localhost:5000/api/user").then(response=>response.json()).catch(err=>console.log(err));
}