import { useState, createContext, useContext } from "react";
import {signupRequest, loginRequest} from '../api/authUsers'

//Creamos el contexto - Provider
const userContext = createContext();

export const useUser = () => {
  const context = useContext(userContext);
  return context;
};

//Creamos y exportamos el Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [logueado, setLogueado] = useState(false);

  //Función para registrarse
  const signup = async (user) => {
    try {
      const res = await signupRequest(user);
      setUser(res.data);
      setLogueado(true)
      localStorage.setItem('usuario', JSON.stringify({ //Guardamos la sesión en el local storage
        name:res.data.name,
        token: res.data.token
      }))
    } catch (error) {
      console.log(error);
    }
  };

  //Función para ingresar
  const login = async (user) => {
    try {
        const res = await loginRequest(user);
        setUser(res.data)
        setLogueado(true)
        localStorage.setItem('usuario', JSON.stringify({ //Guardamos la sesión en el local storage
          name:res.data.name,
          token: res.data.token
        }))
    } catch (error) {
        console.log(error)
    }
  }

  //Funcion para recuperar usuario de localstorage
  const recuperarUsuario = () => {
    if(localStorage.getItem('usuario')){
      setUser(JSON.parse(localStorage.getItem('usuario')))
      setLogueado(true)
    }
  }

  //Función para cerrar sesión 
  const cerrarSesion = () => {
    localStorage.removeItem('usuario')
    setUser({})
    setLogueado(false)
  }


  return (
    <userContext.Provider
        value={{user, logueado, signup, login, recuperarUsuario, cerrarSesion}}>
        {children}
    </userContext.Provider>
  )
};
