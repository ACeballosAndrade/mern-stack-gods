import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    // cloud_name: "doz8t56ei",
    // api_key: "351719886896275",
    // api_secret: "VTCCbaDfWx1GpuQHX2MclLeut-Q"
    cloud_name: "ddeeb6n8f",
    api_key: "582946148914982",
    api_secret: "DhmV9aPfAAiyKwOB4vfNy2ofQQo"
})

//Función para subir imagen a Cloudinary
export const uploadImage = async filePath => {
    return await cloudinary.uploader.upload(filePath, {
        folder: 'dioses'
    })
}

//Funcion para "entrar" en Cloudinary y eliminar una imagen
export const deleteImage = async id => {
    return await cloudinary.uploader.destroy(id)
}