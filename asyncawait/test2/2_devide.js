const devide = (numA, numB) => {
    return new Promise((resolve, reject) => {
        if(numB === 0){
            reject("error")
        }else {
            resolve(numA/numB)
        }
    })
}

(async ()=>{
    try{
    console.log(await devide(1, 2))
    }catch(e) {
        console.log(e)
    }
})()