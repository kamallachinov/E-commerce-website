import React, { useState } from "react";
import { createContext } from "react";



export const FavouriteContext = createContext()


const FavouriteProvider = ({ children }) => {
    const [fav, setFav] = useState([])
    const [favCounter, setFavCounter] = useState(0)

    const data = { fav, setFav, favCounter, setFavCounter }

    return <FavouriteContext.Provider value={data}>{children}</FavouriteContext.Provider>
}

export default FavouriteProvider