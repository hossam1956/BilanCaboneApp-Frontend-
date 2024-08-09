import access_denied from "@/assets/access_denied.svg";
import { Button } from "@/Components/ui/button";
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-full w-full overflow-hidden">
      <img src={access_denied} alt="access_denied" className="w-full h-2/3 max-w-lg" />
      <h1 className="text-2xl font-bold mt-4">Cette page non autorisé </h1>
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
