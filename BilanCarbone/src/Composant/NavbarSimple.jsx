import { useNavigate } from 'react-router-dom';
import keycloak from '../KeycloakConfig/keycloak';

const NavbarSimple = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-black">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">BilanCarbone</span>
        </a>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4  rounded-lg bg-black md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-black dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <button
                className="text-white bg-black hover:bg-white hover:text-black rounded-md border-solid border-transparent px-4 py-2"
                onClick={() => { navigate('/register'); }}
              >
                S'inscrire
              </button>
            </li>
            <li>
              {!keycloak.authenticated ? (
                <button
                  className="text-white bg-black hover:bg-white hover:text-black rounded-md border-solid border-transparent px-4 py-2"
                  onClick={() => keycloak.login()}
                >
                  Connexion
                </button>
              ) : (
                <button
                  className="text-white bg-black hover:bg-white hover:text-black rounded-md border-solid border-transparent px-4 py-2"
                  onClick={() => keycloak.logout()}
                >
                  Déconnexion
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarSimple;
