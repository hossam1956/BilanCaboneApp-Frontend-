const API_FACTEUR_BASE_URL=import.meta.env.VITE_AXIOS_URL
const API_FACTEUR = {
    "Facteur": `${API_FACTEUR_BASE_URL}/facteur`,
    "Facteur_type": `${API_FACTEUR_BASE_URL}/facteur/type`,
    "Facteur_Search": `${API_FACTEUR_BASE_URL}/facteur/search`,
    "Facteur_trash": `${API_FACTEUR_BASE_URL}/facteur/trash`,
    "Facteur_ALL": `${API_FACTEUR_BASE_URL}/facteur/all`,

};
const API_TYPE={
    "Type": `${API_FACTEUR_BASE_URL}/type`,
    "Type_trash": `${API_FACTEUR_BASE_URL}/type/trash`,
    "Type_Search": `${API_FACTEUR_BASE_URL}/type/search`,

}
export {API_FACTEUR,API_TYPE};