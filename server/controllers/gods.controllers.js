import Dios from "../models/Dios.js";
import {uploadImage, deleteImage} from '../libs/cloudinary.js'
import fs from 'fs-extra'

export const getGods = async (req, res) => {
  try {
    const dioses = await Dios.find();
    res.send(dioses);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const createGod = async (req, res) => {
    try {
    const { nombre, poder, mitologia, afiliacion, hogar, posesiones } = req.body;
    let image;

    if(req.files?.image){ //Con ese signo evitamos el error de cuando image es null.
        const resultado = await uploadImage(req.files.image.tempFilePath) //Como la función devuelve una promesa usamos await
        await fs.remove(req.files.image.tempFilePath) //Eliminará la imagen de nuestro server ya que la estaremos guardando en cloudinary
        //console.log(req.files)
        image = {
            url: resultado.secure_url,
            public_id: resultado.public_id
        }
    }

    const dios = new Dios({nombre, poder, mitologia, afiliacion, hogar, posesiones, image // Esto significa image: image. La propiedad image de nuestro nuevo dios con el valor obtenido de req.files.image
    });

    await dios.save();
    return res.json(dios);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateGod = async (req, res) => {
  try {
    const body = req.body
    if(req.files?.image){ //Con ese signo evitamos el error de cuando image es null.
      console.log("vino un File")
      const resultado = await uploadImage(req.files.image.tempFilePath) //Como la función devuelve una promesa usamos await
      await fs.remove(req.files.image.tempFilePath) //Eliminará la imagen de nuestro server ya que la estaremos guardando en cloudinary
     
      body.image = {
          url: resultado.secure_url,
          public_id: resultado.public_id
      }
    }
    const diosUpdated = await Dios.findByIdAndUpdate(req.params.id, body, {new: true}); //Literalmente busca un ID de tu DB y lo actualiza. El {}new: true me devuelve el nuevo objeto ya modificado
    return res.send(diosUpdated);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteGod = async (req, res) => {
  try {
    const diosToRemove = await Dios.findByIdAndDelete(req.params.id);

    if (!diosToRemove) return res.sendStatus(404);

    //Con esta linea de código le ordenamos que elimine la imagen alojada en Cloudinary
    if(diosToRemove.image.public_id){ //Si el objeto tiene imagen -> Bórrala mediante su id en Cloudinary
        await deleteImage(diosToRemove.image.public_id)
    }
    return res.sendStatus(204);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getGod = async (req, res) => {
  console.log(req.params)
  try {
    const dios = await Dios.findById(req.params.id);
    if (!dios) return res.sendStatus(404);
    return res.send(dios);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
