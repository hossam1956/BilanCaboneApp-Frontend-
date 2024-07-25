import { MoreVertical, ChevronLast, ChevronFirst,ChevronDown} from "lucide-react"
import {useState } from "react"
import keycloak from '../KeycloakConfig/keycloak';
const items = [
  { title: 'Item 1', subitems: ['Subitem 1.1', 'Subitem 1.2'] },
  { title: 'Item 2', subitems: ['Subitem 2.1', 'Subitem 2.2'] },
  { title: 'Item 3', subitems: ['Subitem 3.1', 'Subitem 3.2'] },
];
export default function Sidebar({ children }) {

 {/**Gestion des sections actives */}
  const [activeSection, setActiveSection] = useState(null);
  const toggleListSection = (indexSection) => {
    setActiveSection(indexSection === activeSection ? null : indexSection);
  };
  {/**Gestion des sections actives dans la section Facteurs */}
  const [activeIndexFacteur, setActiveIndexFacteur] = useState(null);
  const toggleListFacteur = (index) => {
    setActiveIndexFacteur(index === activeIndexFacteur ? null : index);
  };
   {/**Gestion des sections actives dans la section Utilisateurs */}
   const [activeIndexUser, setActiveIndexUser] = useState(null);
   const toggleListUser = (index) => {
     setActiveIndexUser(index === activeIndexUser ? null : index);
   };


  const [expanded, setExpanded] = useState(true)
  return (
    <aside className="min-h-screen">
      <nav className="h-full flex flex-col bg-stone-950 border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <a className='text-white font-bold' href="/">
          { expanded?'BILAN CARBONE':''}
          </a>
          <button
            onClick={() => setExpanded((a) => !a)}
            className="p-1.5 rounded-lg bg-gray-300 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        

        <div>
          <button className={`text-white p-4 w-full text-left py-2 px-4 flex justify-between hover:bg-gray-700 ${expanded ? 'block':'hidden' }`} onClick={()=>toggleListSection('Facteurs')} >
            Facteurs <ChevronDown/> 
          </button>
          {activeSection == "Facteurs" && (
          <div className="text-white p-4">
            {items.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => toggleListFacteur(index)}
                  className={`w-full text-left py-2 px-4 flex justify-between hover:bg-gray-700 ${expanded ? 'block':'hidden' }`}
                >
                  {item.title}{<ChevronDown/>}
                </button>
                {activeIndexFacteur === index && (
                  <ul className="pl-4">
                    {item.subitems.map((subitem, subindex) => (
                      <li key={subindex} className="py-2 hover:bg-gray-700">
                        {subitem}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>)}
          <button className={`text-white p-4 w-full text-left py-2 px-4 flex justify-between hover:bg-gray-700 ${expanded ? 'block':'hidden' }`} onClick={()=>toggleListSection('Users')} >
            Utilisateurs <ChevronDown/> 
          </button>
          {activeSection == "Users" && (
          <div className="text-white p-4">
            {items.map((item, index) => (
              <div key={index}>
                <button
                  onClick={() => toggleListUser(index)}
                  className={`w-full text-left py-2 px-4 flex justify-between hover:bg-gray-700 ${expanded ? 'block':'hidden' }`}
                >
                  {item.title}{<ChevronDown/>}
                </button>
                {activeIndexUser === index && (
                  <ul className="pl-4">
                    {item.subitems.map((subitem, subindex) => (
                      <li key={subindex} className="py-2 hover:bg-gray-700">
                        {subitem}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>)}

        </div> 
          
        <div className="border-t flex p-3">
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-10">
              <span className="text-white">Bonjour, <span className="text-white font-bold text-xl ">{keycloak.tokenParsed?.preferred_username}</span></span> 
              <button className=" text-black bg-white hover:bg-gray-300 rounded-md border-solid border-transparent px-2 py-1" onClick={() => keycloak.logout()}>Déconnexion</button>
            </div>
            <MoreVertical className="text-white" size={20}/>
          </div>
        </div>
      </nav>
    </aside>
  )
}

