import { USERNAME_REGEX,EMAIL_REGEX,PRENOM_REGEX,NOM_REGEX,PASSWORD_REGEX } from "@/Constants/Regex";

export const validate=({username,email,prenom,nom,password,confirmPassword})=>{
    const errors={}
    if(!USERNAME_REGEX.test(username)){
      errors.username = 'Nom Utilisateur doit être alphanumérique et contenir entre 4 et 15 caractères.';
    }
    if(!EMAIL_REGEX.test(email)){
      errors.email="Email est invalide"
    }
    if (!PRENOM_REGEX.test(prenom)) {
      errors.prenom = 'Prenom doit contenir uniquement des lettres et avoir entre 2 et 20 caractères.';
    }
    if (!NOM_REGEX.test(nom)) {
      errors.nom = 'Nom doit contenir uniquement des lettres et avoir entre 2 et 20 caractères.';
    }
    
    if (!PASSWORD_REGEX.test(password)) {
      
      errors.password = 'Mot de passe doit contenir au moins 8 caractères, une lettre et un chiffre et un caractère spèciale.';
    }
    
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Les mots de passe ne correspondent pas.';
    }
    
    return errors;
  }
export const validateWithoutPassword=({username,email,prenom,nom})=>{
  const errors={}

    if(!USERNAME_REGEX.test(username)){
      errors.username = 'Nom Utilisateur doit être alphanumérique et contenir entre 4 et 15 caractères.';
    }
    if(!EMAIL_REGEX.test(email)){
      errors.email="Email est invalide"
    }
    if (!PRENOM_REGEX.test(prenom)) {
      errors.prenom = 'Prenom doit contenir uniquement des lettres et avoir entre 2 et 20 caractères.';
    }
    if (!NOM_REGEX.test(nom)) {

      errors.nom = 'Nom doit contenir uniquement des lettres et avoir entre 2 et 20 caractères.';
    }
    return errors;
}