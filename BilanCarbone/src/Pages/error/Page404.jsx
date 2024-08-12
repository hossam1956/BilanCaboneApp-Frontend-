import page_not_found from "@/assets/page_not_found.svg";
import { Button } from "@/Components/ui/button";
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-full w-full">
      <img src={page_not_found} alt="page-not-found" className="w-full h-auto max-w-lg max-h-lvh" />
      <h1 className="text-2xl font-bold mt-4">Cette page n'existe pas</h1>
      <p className="text-lg mt-2">Il semble que vous soyez perdu.</p>
      <div className="mt-4">
        <Button 
          onClick={() => navigate(-1)} 
          className="px-4 py-2 mr-2"
          variant="secondary"

        >
          Retourner
        </Button>
        <Button 
          onClick={() => navigate('/')} 
          className="px-4 py-2"
        >
          Accueil
        </Button>
      </div>
    </div>
  );
};

export default Page404;
