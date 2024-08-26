const fakeRequestCallback= (url,success,failure)=>{
const delay = Math.floor(Math.random()*4500)+500;
setTimeout(()=>{
    if (delay>4000){
    failure('connection:timeout')
}
else{
    success(`Here is your data from ${url}`)
}
},delay)
}

fakeRequestCallback('books.com',function(response){
    console.log('It worked')
    console.log(response)
    fakeRequestCallback('books.com',function(response){
        console.log('It worked (2nd Requesttt)')
        console.log(response)
        fakeRequestCallback('books.com',function(response){
            console.log('It worked(3rddd Responsee')
            console.log(response)
},function(err){
    console.log('Errorrrr (3rd requesstttt)')
console.log(err)
});``
},
function(err){
    console.log('Errorrrr (2nd requesttt)')
console.log(err)
})
},
function(err){
    console.log('Errorrrr')
console.log(err)
});
