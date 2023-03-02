import { useState, createContext, useContext, useEffect } from "react";
import {
  getDiosesRequest,
  createDiosRequest,
  deleteDiosRequest,
  getDiosRequest,
  updateDiosRequest,
} from "../api/dioses";

//Creamos el contexto - Ese es mi Provider
const diosContext = createContext();

export const useDios = () => {
  const context = useContext(diosContext);
  return context;
};

export const DiosProvider = ({ children }) => {
  const [dioses, setDioses] = useState([]);

  //Función para llamar el contenido de la base de datos
  const getDioses = async () => {
    const res = await getDiosesRequest();
    setDioses(res.data);
    //console.log(dioses);
  };
  //Funcion en el context para guardar un nuevo dios
  const createDios = async (dios, token) => {
    try {
      const res = await createDiosRequest(dios, token);
      setDioses([...dioses, res.data]);
      //console.log(res.data);
    } catch (error) {
      console.log(error)
      return error
    }
  };
  //Funcion para borrar
  const deleteDios = async (id, token) => {
    try {
      const res = await deleteDiosRequest(id, token);
      if (res.status === 204) {
      setDioses(dioses.filter((dios) => dios._id !== id));
    }
    } catch (error) {
      return error
    }
    
  };
  //Funcion para obtener un dios seleccionado
  const getDios = async (id) => {
    //console.log(id)
    const res = await getDiosRequest(id);
    //console.log(res);
    return res.data;
  };
  //Funcion para editar un dios
  const updateDios = async (id, dios, token) => {
    try {
      const res = await updateDiosRequest(id, dios, token);
      //console.log(res);
      setDioses(dioses.map((dios) => (dios._id === id ? res.data : dios)));
    } catch (error) {
      console.log(error)
      return error
    }
    
  };

  //useEffect
  useEffect(() => {
    getDioses();
  }, []);

  return (
    <diosContext.Provider
      value={{ dioses, getDioses, createDios, deleteDios, getDios, updateDios }}
    >
      {children}
    </diosContext.Provider>
  );
};
