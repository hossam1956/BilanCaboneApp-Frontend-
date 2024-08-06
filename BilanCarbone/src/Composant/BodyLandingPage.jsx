import { useState } from "react";
import bgImage from '../images/forest-3622519_1920.jpg';

const BodyLandingPage = () => {
  const [extendText, setExtendText] = useState(false);

  return (
    <div className="bg-[url('src/images/forest-3622519_1920.jpg')] bg-cover bg-center h-screen md:h-screen">
      <div className="flex justify-center">
        <div className="w-1/2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-11">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
              Bilan Carbone
            </h5>
            <div className="flex justify-between">
              <div className="block"> 
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify">
                Découvrez l'empreinte carbone de votre entreprise avec BilanCarbone ! Notre outil de calcul avancé vous permettra d'évaluer précisément vos émissions de CO2 et de prendre des mesures significatives pour réduire votre impact environnemental. Chez BilanCarbone, nous sommes engagés à vous accompagner dans votre démarche de développement durable. Calculez votre bilan carbone dès maintenant et engagez-vous pour un avenir plus respectueux de l'environnement avec BilanCarbone.
              </p>
              <p className={`mb-3 font-normal text-gray-700 dark:text-gray-400 text-justify ${extendText ? '' : 'hidden' }`}>
              Notre équipe d'experts vous propose des solutions personnalisées pour optimiser votre empreinte carbone et mettre en place des pratiques durables. Grâce à BilanCarbone, transformez vos données en actions concrètes pour un impact positif sur l'environnement. Rejoignez-nous dans cette démarche écologique et contribuez à construire un avenir plus vert pour tousNotre équipe d'experts vous propose des solutions personnalisées pour optimiser votre empreinte carbone et mettre en place des pratiques durables. 
              </p>
              </div>
            </div>   
          <button
            onClick={() => setExtendText(!extendText)}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {extendText ? 'Read Less <-' : 'Read More ->' }
  
          </button>
        </div>
      </div>
    </div>
  );
};

export default BodyLandingPage;
