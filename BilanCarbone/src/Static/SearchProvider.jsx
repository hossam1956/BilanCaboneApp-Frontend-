import { createContext, useState } from "react";

export const SearchContext=createContext()

const SearchProvider=({children})=>{
    const [searchValue, setSearchValue] = useState('');
    const handleSearching = (e) => {
        setSearchValue(e.target.value);
      };
      return(
        <SearchContext.Provider value={{searchValue,handleSearching}}>
            {children}
        </SearchContext.Provider>
      )
}
export default SearchProvider