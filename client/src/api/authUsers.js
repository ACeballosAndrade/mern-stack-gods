import axios from "axios";

export const signupRequest = async (nuevoUser) => {
    const form = new FormData()

    for(let key in nuevoUser){
      form.append(key, nuevoUser[key])
    }
    return await axios.post('/api/auth/signup', form, {
      headers:{
        "Content-Type": "application/json"
      },
    });
}

export const loginRequest = async (user) => {
  const form = new FormData()

  for(let key in user){
    form.append(key, user[key])
  }
  return await axios.post('/api/auth/signin', form, {
    headers:{
      "Content-Type": "application/json"
    }
  })
}