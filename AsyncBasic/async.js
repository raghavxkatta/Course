
    const delayedColorChange= (newColor,delay,newFxn)=>{
setTimeout(()=>{
document.body.style.backgroundColor=newColor},delay)
    }
    delayedColorChange('green',1000,()=>{
        delayedColorChange('teal',1000,()=>{
            delayedColorChange('red',1000,()=>{})
        })
    })