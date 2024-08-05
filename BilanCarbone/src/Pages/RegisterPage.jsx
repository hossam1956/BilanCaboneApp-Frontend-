import React from 'react';
import { ChevronLeft } from 'lucide-react'; 

const RegisterPage = () => {
  return (
    <div className="bg-[url('https://cdn.glitch.global/0764a513-91e4-48ff-9473-54f2a3174dc7/forest-3622519_1920.jpg?v=1721836294491')] bg-cover bg-center h-screen md:h-full">
      <div className="flex justify-center">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mt-16 mb-4">
          <form className="space-y-6" action="#">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              <a href="/" className="inline-flex text-blue-700 hover:underline dark:text-blue-500">
                <ChevronLeft /> Retour
              </a>
            </div>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center">
              Envoyer une demande de création de votre compte
            </h5>
            <div>
              <label htmlFor="Username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nom Utilisateur
              </label>
              <input
                type="text"
                name="Username"
                id="Username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="ex : JeanM"
                required
              />
            </div>
            <div>
              <label htmlFor="Email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                type="email"
                name="Email"
                id="Email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="ex : name@company.com"
                required
              />
            </div>
            <div>
              <label htmlFor="Prenom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Prenom
              </label>
              <input
                type="text"
                name="Prenom"
                id="Prenom"
                placeholder="ex : John"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="Nom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nom
              </label>
              <input
                type="text"
                name="Nom"
                id="Nom"
                placeholder="ex : Michelle"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Choisir un rôle
              </label>
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="US">Admin Entreprise</option>
                <option value="CA">Responsable</option>
                <option value="FR">Employé</option>
              </select>
            </div>

            <div>
              <label htmlFor="Password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Mot de passe
              </label>
              <input
                type="password"
                name="Password"
                id="Password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="Confi_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Confirmer Votre Mot de Passe
              </label>
              <input
                type="password"
                name="Confi_password"
                id="Confi_password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Envoyer Votre Demande
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
