import Keycloak from "keycloak-js";

const keycloak=new Keycloak({
    realm: "BilanCarbone",
    url: "http://localhost:8080",
    clientId: "ReactApp"
});



export default keycloak