import axios from 'axios'

export const getDiosesRequest = async () => await axios.get('/api/dioses')

export const createDiosRequest = async (dios, token) => {
    const form = new FormData()

    for(let key in dios){
        form.append(key, dios[key])
    }

    return await axios.post('/api/dioses', form, {
        headers:{
            "Content-Type": "multipart/form-data",
            "x-access-token": token
        },
    });
}

export const deleteDiosRequest = async (id, token) => await axios.delete('/api/dioses/'+id, {
    headers:{
        "Content-Type": "application/json",
        "x-access-token": token
    }
})

export const getDiosRequest = async (id) => await axios.get('/api/dioses/'+id)

export const updateDiosRequest = async (id, modDios, token) => {
    
    if(modDios.image.hasOwnProperty("url")){
        
        return await axios.put(`/api/dioses/${id}`, modDios, {
            headers:{
                "Content-Type": "application/json",
                "x-access-token": token
            }
        })  
    }else{
        const form = new FormData()
    
        for(let key in modDios){
            form.append(key, modDios[key])
        }
        return await axios.put(`/api/dioses/${id}`, form, {
            headers:{
                "Content-Type": "multipart/form-data",
                "x-access-token": token
            }
        })
    }
}