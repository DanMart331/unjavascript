import { createContext } from "react";

export const AppContext  = createContext({
    listOfColleges:[],
    updateListOfColleges: (colleges:any) => {

    },
    getCookie: (cname:string) : string =>  {
        return "";
    },
    getColleges: async () => {
        
    }
})