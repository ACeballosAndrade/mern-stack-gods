import { useDios } from "../context/diosContext";
import {useUser} from '../context/userContext'
import { VscEmptyWindow, VscAdd } from "react-icons/vsc";
import { IoAddCircleOutline } from "react-icons/io5"
import { Link } from "react-router-dom";
import { GodCard } from "../components/GodCard";
import Filtro from "../components/Filtro";
import { useState, useEffect } from "react";

export function HomePage() {
  const { dioses } = useDios();  

  //Metodo para filtrar mitologia
  const [filtro, setFiltro] = useState("");
  const [isfiltrado, setIsFiltrado] = useState(false);

  const onChange = (mito) => {
    
    if(mito.target.value !== ""){
      setFiltro(mito.target.value)
      setIsFiltrado(true);
    }else{
      setIsFiltrado(false)
    }
  };

  if (dioses.length === 0)
    return (
      <>
      <div className="text-indigo-600 flex flex-col justify-center items-center">
        <Link to={"/nuevo"}>
          <button className="text-white px-6 py-2 rounded-lg font-bold flex felx-row justify-between items-center transition ease-in-out delay-150 bg-indigo-900 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-800 duration-300">
            Crear nuevo Dios
            <div className="px-1"></div>
            <VscAdd className="w-5 h-5" />
          </button>
        </Link>
        <h1>There are no Gods</h1>
        <VscEmptyWindow className="w-48 h-48" />
      </div>
      </>
      
    );

  return (
    <div className="text-white">
      <div className="flex felx-row justify-between py-4">
        <Link to={"/nuevo"}>
          <button className="md:py-2 md:px-6 rounded-3xl md:rounded-lg font-bold flex felx-row justify-between items-center transition ease-in-out delay-150 bg-gradient-to-r from-cyan-500 to-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-800 duration-300">
            
            <h3 className="max-md:hidden">Crear nuevo Dios</h3>
            <div className="max-md:hidden px-1"></div>
            <IoAddCircleOutline className="w-10 h-10 md:w-6 md:h-6"/>
          </button>
        </Link>
        <Filtro onChange={(mito) => onChange(mito)} />
      </div>
      <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-1 container mx-auto">
        {isfiltrado
          ? dioses
              .filter((dios) => dios.mitologia === filtro)
              .map((dios) => <GodCard dios={dios} key={dios._id} />)
          : dioses.map((dios) => <GodCard dios={dios} key={dios._id} />)}
      </div>
    </div>
  );
}
