import { jwtDecode } from "jwt-decode";
export function getRolesFromToken(token){
    try{
        const decodedToken=jwtDecode(token)
        const roles = decodedToken.realm_access.roles;
        localStorage.setItem("idUser",decodedToken.sub)
        return roles;
    }
    catch(error){
        console.error("Error decoding token: ", error);
    }
}
export function getInfoFromToken(token){
    try{
        const decodedToken=jwtDecode(token)
        const infos = decodedToken;
        return {
            id:infos.sub,
            username:infos.preferred_username,
            firstName:infos.name.split(" ")[0],
            lastName:infos.name.split(" ")[1],
            email:infos.email

        }
      
        
    }
    catch(error){
        console.error("Error decoding token: ", error);
    }
}