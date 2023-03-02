import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useDios } from "../context/diosContext";
import { useUser } from "../context/userContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

export function DiosForm() {
  //Contexto
  const { createDios, getDios, updateDios } = useDios();
  const {user, logueado} = useUser();
  //Navegador
  const navigate = useNavigate();
  const params = useParams();
  //State del dios seleccionado
  const [dios, setDios] = useState({
    nombre: "",
    poder: "",
    mitologia: "",
    afiliacion: "",
    hogar: "",
    posesiones: "",
    image: null
  });

  //En esta ocasion se usa el useEffect de esta manera (dentro de una funcion anonima porque async-await no puede ser usado dentro de useEffect)
  useEffect(() => {
    (async () => {
      if (params.id) {
        const data = await getDios(params.id);
        setDios(data);
      }
    })();
  }, [params.id]);

  return (
    <div className="flex items-center justify-center">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">
        <header className="flex justify-between items-center py-4">
          <h3 className="text-xl text-white">Nuevo Dios</h3>
          <Link to="/" className="text-gray-400 text-sm hover:text-gray-300">
            Regresar
          </Link>
        </header>
        <Formik
          initialValues={dios}
          onSubmit={async (values, actions) => {
            if (params.id) {
              const res = await updateDios(params.id, values, user.token);
                if(typeof res !== 'undefined'){
                  toast.error(res.response.data.message)
                }
            } else {
              const res = await createDios(values);
            }
            actions.setSubmitting(false)
            navigate("/");
          }}
          validationSchema={Yup.object({
            nombre: Yup.string().max(30, 'Demasiado largo!').required("El nombre es requerido"),
            poder: Yup.string().max(30, 'Demasiado largo!').required("El poder es requerido"),
            mitologia: Yup.string().max(30, 'Demasiado largo!').required("La mitología es requerida"),
            afiliacion: Yup.string().max(30, 'Demasiado largo!').required("La afiliación es requerida"),
            hogar: Yup.string().max(30, 'Demasiado largo!').required("El hogar es requerido"),
            posesiones: Yup.string().required("Las posesiones son requeridas")
          })}
          enableReinitialize //Con esta propiedad de Formik, reinicia los campos que en un principio son vacíos, después de la petición, los llena.
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (//El Formik nos proporciona la funcion de handleSubmit y por eso agregamos el formulario Form dentro de una funcion
            <Form onSubmit={handleSubmit}>
              <label
                htmlFor="nombre"
                className="text-sm block font-bold text-gray-400"
              >
                Nombre
              </label>
              <Field
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4"
                name="nombre"
                placeholder="Nombre"
              />
              <ErrorMessage
                className="text-red-400"
                component="p"
                name="nombre"
              />

              <label
                htmlFor="poder"
                className="text-sm block font-bold text-gray-400"
              >
                Atributo o Poder
              </label>
              <Field
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4"
                name="poder"
                placeholder="Ej: Dios de la guerra"
              />
              <ErrorMessage
                className="text-red-400"
                component="p"
                name="poder"
              />

              <label
                htmlFor="mitologia"
                className="text-sm block font-bold text-gray-400"
              >
                Escoge una mitología:
              </label>
              <Field
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4"
                name="mitologia"
                as="select"
              >
                <option value="">Selecciona...</option>
                <option value="Griega">Griega</option>
                <option value="Nórdica">Nórdica</option>
                <option value="Egipcia">Egipcia</option>
                <option value="Celta">Celta</option>
                <option value="Sumeria">Sumeria</option>
                <option value="Japonesa">Japonesa</option>
                <option value="Hindú">Hindú</option>
              </Field>
              <ErrorMessage
                className="text-red-400"
                component="p"
                name="mitologia"
              />

              <label
                htmlFor="afiliacion"
                className="text-sm block font-bold text-gray-400"
              >
                Afiliación
              </label>
              <Field
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4"
                name="afiliacion"
                placeholder="Grupo o sociedad al que pertenece el dios. Ej: Aesir"
              />
              <ErrorMessage
                className="text-red-400"
                component="p"
                name="afiliacion"
              />

              <label
                htmlFor="hogar"
                className="text-sm block font-bold text-gray-400"
              >
                Hogar
              </label>
              <Field
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4"
                name="hogar"
                placeholder="Dónde vive el dios. Ej: Olimpo"
              />
              <ErrorMessage
                className="text-red-400"
                component="p"
                name="hogar"
              />

              <label
                htmlFor="posesiones"
                className="text-sm block font-bold text-gray-400"
              >
                Posesiones o animal representativo
              </label>
              <Field
                component="textarea"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                name="posesiones"
                placeholder="Posesiones, animales u objetos por las cuales el dios es reconocido"
              />
              <ErrorMessage
                className="text-red-400"
                component="p"
                name="posesiones"
              />

              <label
                htmlFor="posesiones"
                className="text-sm block font-bold text-gray-400"
              >
                Imagen
              </label>
              <input 
                type="file" 
                name="image"  
                className="px-3 py-2 focus:outliane-none rounded-none text-white w-full mb-4"
                onChange={(e) => setFieldValue('image', e.target.files[0])} />

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 focus:outline-none disabled:bg-indigo-400 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting? (
                  <AiOutlineLoading3Quarters className="animated-spin h-5 w-5"/>
                ) : 'Guardar'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
