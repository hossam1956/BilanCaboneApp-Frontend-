export default function Footer(){
    return(
        <footer className="bg-slate-950 w-full h-full bottom-0" id="footer_Id">
            <p>-</p>
            <p className="flex justify-center text-white mx-auto my-8 text-4xl ">Contactez nous : </p>
            {/*Mail button */}
            <a href="mailto:BilanCarbone@norsys.fr" className="flex mx-auto  items-center border bg-slate-100 rounded-full hover:bg-white px-3 py-2 w-fit" >
            <img src="/envelope-solid.svg" className="w-5 h-5 mr-2"/>
            BilanCarbone@norsys.fr
            </a>
            <div className="flex justify-center space-x-4 my-5 mb-0">
                <a href="#" className="border bg-slate-100 hover:bg-white rounded-full p-2"> <img src="/instagram-brands-solid.svg" className="w-5 h-5 "/> </a>
                <a href="#" className="border bg-slate-100 hover:bg-white rounded-full p-2"> <img src="/linkedin.svg" className="w-5 h-5 "/> </a>
                <a href="#" className="border bg-slate-100 hover:bg-white rounded-full p-2"> <img src="/github.svg" className="w-5 h-5 "/> </a>
            </div>
            <p className="flex text-white justify-center  text-xs p-2 " >© Copyright 2024 NORSYS AFRIQUE.Tous droits sont réservés.</p>
        </footer>
    );
}