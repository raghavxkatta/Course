const form=document.querySelector('#searchForm')
form.addEventListener('submit' , async function (e){
e.preventDefault();
/*this should give us the input value and we found out using console.dir(form) */
const searchTerm=form.elements.query.value
const res=await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
const img=document.createElement('IMG')
img.src=res.data[0].show.image.medium
document.body.append(img)
})