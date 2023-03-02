import React, { useState, useEffect } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useUser } from "../context/userContext";

function Navbar() {
  //Llamamos el context de usuario
  const { user, cerrarSesion, recuperarUsuario } = useUser();

  console.log(user);
  let [open, setOpen] = useState(false);

  useEffect(() => {
    recuperarUsuario()
  }, [])
  

  const handleCerrarSesion = () => {
    cerrarSesion();
  }

  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-zinc-900 py-4 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center text-white">
          Dioses Mitológicos
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-indigo-300 text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {open ? <IoClose /> : <IoMenu />}
        </div>
        <ul
          className={`md:flex md:items-center text-indigo-300 md:pb-0 pb-12 absolute md:static bg-zinc-900 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-300 ease-in ${
            open
              ? "top-10 opacity-100"
              : "top-[-490px] md:opacity-100 opacity-0"
          }`}
        >
          <li className="md:ml-8 text-md md:my-0 my-7 hover:text-indigo-100 duration-300">
            {Object.entries(user).length === 0 ? (
              <Link to={"/signup"}>Registrarse</Link>
              ): (
                <button onClick={() => handleCerrarSesion()}>Cerrar sesión</button>
              )}
          </li>
          <li className="md:ml-8 text-md md:my-0 my-7 hover:text-indigo-100 duration-300">
            {Object.entries(user).length === 0 ? (
              <Link to={"/login"}>Iniciar sesión</Link>
            ) : (
              <div className="flex flex-col items-center">
                <h5>
                  Bienvenido
                </h5>
                <strong>{user.name}</strong>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
