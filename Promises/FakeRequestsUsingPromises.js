fakeRequestPromise('hero.com')
.then(()=>{
console.log('worked')
return fakeRequestPromise('hero.com')
})
.then(()=>{
    console.log('worked')
    return fakeRequestPromise('hero.com')
    })
    .then(()=>{
        console.log('worked')
        return fakeRequestPromise('hero.com')
        })
       .then(()=>{
            console.log('worked')
            return fakeRequestPromise('hero.com')
            })
            .then(()=>{
                console.log('worked')
                return fakeRequestPromise('hero.com')
                })
                .catch(()=>{
                console.log('error found')
                })