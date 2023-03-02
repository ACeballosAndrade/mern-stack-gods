import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";


export function Login() {
  //Contexto de usuario
  const {login} = useUser();//Signin
  //Navegador
  const navigate = useNavigate()


  return (
    <div className="flex items-center justify-center">
      <div className="bg-slate-900 p-10 shadow-md shadow-black md:w-96">
        <header className="flex justify-between items-center py-4">
          <h3 className="text-xl text-white">Registrarse</h3>
        </header>
        <Formik 
            initialValues={{ 
              email: "", 
              password: "" 
            }}
            validationSchema={Yup.object({
                email: Yup.string().email("Email no válido").required("El email es requerido"),
                password: Yup.string().required("La contraseña es requerida")
            })}
            onSubmit={async (values, actions) => {
                await login(values);
                navigate("/")
            }}
        >
          <Form>
            <label
              htmlFor="email"
              className="text-sm block font-bold text-gray-400"
            >
              Email
            </label>
            <Field
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4"
                name="email"
                type="email"
              />
              <ErrorMessage
                className="text-red-400"
                component="p"
                name="email"
              />
              <label
              htmlFor="password"
              className="text-sm block font-bold text-gray-400"
            >
              Contraseña
            </label>
            <Field
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4"
                name="password"
                type="password"
              />
              <ErrorMessage
                className="text-red-400"
                component="p"
                name="password"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 focus:outline-none disabled:bg-indigo-400 text-white"
              >
                Iniciar seción
              </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
