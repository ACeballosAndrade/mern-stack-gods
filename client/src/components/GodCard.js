import React from "react";
import toast from "react-hot-toast";
import { useDios } from "../context/diosContext";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";

export function GodCard({ dios }) {



  //Usamos el contexto
  const { deleteDios } = useDios();  
  const {user, logueado} = useUser();


  //Navigate
  const navigate = useNavigate();

  const handleDelete = (id) => {
    
    if(logueado === true){
      toast((t) => (
          <div>
            <p className="text-white">
              ¿Estás seguro que deseas eliminar <strong>{id}</strong>?
            </p>
            <div className="text-white">
              <button
                className="bg-red-500 hover:bg-red-400 px-3 py-2 text-sm rounded-sm mx-2"
                onClick={async () => {
                  const data = await deleteDios(id, user.token);
                  toast.dismiss(t.id);
                  if(typeof data !== 'undefined'){
                    toast.error(data.response.data.message)
                  }
                  
                }}
              >
                Eliminar
              </button>
              <button
                className="bg-slate-400 hover:bg-slate-500 px-3 py-2  rounded-sm mx-2"
                onClick={() => toast.dismiss(t.id)}
              >
                Cancelar
              </button>
            </div>
          </div>
        ),
        {
          style: {
            background: "#202020",
          },
        }
      );
    }else{
      toast.error("Acción no permitida. Debes registrarte")
    }

  };

  return (
    <div className=" rounded-lg"
    // {dios.mitologia == 'Griega'
    //   ? "border-sky-500 border-4 rounded-lg"
    //   : dios.mitologia == 'Nórdica'
    //   ?"border-indigo-500 border-4 rounded-lg"
    //   :dios.mitologia == 'Egipcia'
    //   ? "border-yellow-500 border-4 rounded-lg"
    //  : dios.mitologia == 'Celta'
    //  ? "border-green-500 border-4 rounded-lg"
    //  : dios.mitologia == 'Sumeria'
    //  ? "border-orange-500 border-4 rounded-lg"
    //  : dios.mitologia == 'Japonesa'
    //  ? "border-red-500 border-4 rounded-lg"
    //  :"border-zinc-50 border-4 rounded-lg"}
     >
    <div className="shadow-2xl shadow-black rounded-lg text-white bg-gradient-to-r from-violet-500 to-slate-800" >
      <div>
        <div className="h-96">
            {dios.image && (
            <img className="w-full h-full object-cover object-top" src={dios.image.url} />
             )}
        </div>
        <div className="rounded-lg">
          <table className="border-collapse w-full h-full">
            <thead>
                <tr>
                    <th colSpan={2} className="border border-violet-500 bg-zinc-900 font-bold text-center text-2xl">{dios.nombre}</th>
                </tr>
            </thead>
            <tbody className="h-56">
                <tr className="bg-violet-500 rounded-lg mx-1 my-1 flex flex-col">
                  <td className="text-sm text-violet-200">Poder o título</td>
                  <td className="font-bold text-lg flex justify-center">{dios.poder}</td>
                </tr>
                <tr className="bg-violet-500 rounded-lg mx-1 my-1 flex flex-col">
                  <td className="text-sm text-violet-200">Mitología</td>
                  <td className="font-bold text-lg flex justify-center">{dios.mitologia}</td>
                </tr>
                <tr className="bg-violet-500 rounded-lg mx-1 my-1 flex flex-col">
                  <td className="text-sm text-violet-200">Grupo o afiliación</td>
                  <td className="font-bold text-lg flex justify-center">{dios.afiliacion}</td>
                </tr>
                <tr className="bg-violet-500 rounded-lg mx-1 my-1 flex flex-col">
                  <td className="text-sm text-violet-200">Hogar</td>
                  <td className="font-bold text-lg flex justify-center">{dios.hogar}</td>
                </tr>
                <tr className="bg-violet-500 rounded-lg mx-1 my-1 flex flex-col">
                  <td className="text-sm text-violet-200">Posesiones</td>
                  <td className="font-bold text-lg flex justify-center">{dios.posesiones}</td>
                </tr>
            </tbody>
          </table>

          <div className="grid grid-cols-2 bg-violet-500 rounded-lg">
            <button
              className={logueado 
                ? "border border-cyan-500 font-bold bg-zinc-900 hover:bg-cyan-500 text-sm px-5 rounded-lg py-2 text-cyan-400 mr-1 hover:text-white"
                : "border border-cyan-400 font-bold bg-zinc-800 text-sm px-5 rounded-lg py-2 text-cyan-300 mr-1"}
              onClick={() => { logueado 
                ? navigate(`/dioses/${dios._id}`)
                : toast.error("Acción no permitida. Debes registrarte");
              }}
            >
              Editar
            </button>
            <button
              className={logueado
                ? "border border-red-500 font-bold bg-zinc-900 hover:bg-red-600 text-sm px-2 rounded-lg py-2 text-red-500 hover:text-white"
                : "border border-red-400 font-bold bg-zinc-800 text-sm px-2 rounded-lg py-2 text-red-400"}
              onClick={(e) => {
                // e.stopPropagation();
               handleDelete(dios._id);
              }}
            >
              Eliminar
            </button>
            
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
