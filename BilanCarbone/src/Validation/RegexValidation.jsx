export const validate=({username,email,prenom,nom,password,confirmPassword})=>{
    const errors={}
    if(!/^[A-Za-z0-9]{4,15}$/.test(username)){
      errors.username = 'Nom Utilisateur doit être alphanumérique et contenir entre 4 et 15 caractères.';
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      errors.email="Email est invalide"
    }
    if (!/^[a-zA-Z]{2,20}$/.test(prenom)) {
      errors.prenom = 'Prenom doit contenir uniquement des lettres et avoir entre 2 et 20 caractères.';
    }
    if (!/^[a-zA-Z]{2,20}$/.test(nom)) {
      errors.nom = 'Nom doit contenir uniquement des lettres et avoir entre 2 et 20 caractères.';
    }
    
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
      errors.password = 'Mot de passe doit contenir au moins 8 caractères, une lettre et un chiffre et un caractère spèciale.';
    }
    
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Les mots de passe ne correspondent pas.';
    }
    
    return errors;
  }
export const validateWithoutPassword=({username,email,prenom,nom})=>{
  const errors={}
    if(!/^[A-Za-z0-9]{4,15}$/.test(username)){
      errors.username = 'Nom Utilisateur doit être alphanumérique et contenir entre 4 et 15 caractères.';
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      errors.email="Email est invalide"
    }
    if (!/^[a-zA-Z]{2,20}$/.test(prenom)) {
      errors.prenom = 'Prenom doit contenir uniquement des lettres et avoir entre 2 et 20 caractères.';
    }
    if (!/^[a-zA-Z]{2,20}$/.test(nom)) {
      errors.nom = 'Nom doit contenir uniquement des lettres et avoir entre 2 et 20 caractères.';
    }
    return errors;
}