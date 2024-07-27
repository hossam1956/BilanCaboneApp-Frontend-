const API_FACTEUR_BASE_URL="http://localhost:8081"
const API_FACTEUR = {
    "Facteur": `${API_FACTEUR_BASE_URL}/api/facteur`,
    "Facteur_type": `${API_FACTEUR_BASE_URL}/api/facteur/type`,
    "Facteur_trash": `${API_FACTEUR_BASE_URL}/api/facteur/trash`,
};
const API_TYPE={
    "Type": `${API_FACTEUR_BASE_URL}/api/type`,
    "Type_trash": `${API_FACTEUR_BASE_URL}/api/type/trash`,
}
export {API_FACTEUR,API_TYPE};