import { Navigate } from "react-router";
import {useAuth} from "../hooks/useAuth";

import React from 'react'

const protected = ({children}) => {

    const { loading, user } = useAuth()

    if(loading){
        return(<main>Loading Please Wait .......</main>)
    }
    if(!user){
        return <Navigate to={'/login'}></Navigate>
    }
  return children

}

export default protected
