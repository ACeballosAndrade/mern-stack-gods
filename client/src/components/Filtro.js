import React from "react";

export default function Filtro({onChange}) {


  return (
    <div>
      <form className="focus:outline-none">
        <select 
          name="mitologia" id="mitologia" 
          onChange={onChange} 
          className="bg-zinc-900 text-white w-full px-3 py-2 rounded-lg">
            <option value="">Selecciona una mitología...</option>
            <option value="Griega">Griega</option>
            <option value="Nórdica">Nórdica</option>
            <option value="Egipcia">Egipcia</option>
            <option value="Celta">Celta</option>
            <option value="Sumeria">Sumeria</option>
            <option value="Japonesa">Japonesa</option>
            <option value="Hindú">Hindú</option>
        </select>
      </form>
    </div>
  );
}
