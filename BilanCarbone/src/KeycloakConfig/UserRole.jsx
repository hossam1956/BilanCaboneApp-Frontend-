import { jwtDecode } from "jwt-decode";
export function getRolesFromToken(token){
    try{
        const decodedToken=jwtDecode(token)
        const roles = decodedToken.realm_access.roles;
        return roles;
    }
    catch(error){
        console.error("Error decoding token: ", error);
    }
}
