fetch('https://swapi.dev/api')
.then((response)=>{
    console.log('it worked',response)
    return response.json()
})
.then((data)=>{                             
    console.log("worked",data)
    return fetch('https://swapi.dev/api')
})
.then((response)=>{
    console.log('2nd Request Resolved',response)
    return response.json()
})
.then((data)=>{                             
    console.log("worked",data)
})
.catch((err)=>{
console.log('ERROR!!!!!',err)
})