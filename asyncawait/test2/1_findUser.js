const findUser = (id) =>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log("waited 0.1 sec.");
            const user = {
                id,
                name: "user" + id,
                email: id + "@gmail.com"
            }
            resolve(user)
        }, 1000)
    })
}
let rst = "";

((async ()=>{
    // findUser(1).then(result=>{
    //     rst = result
    // })
    console.log(rst)
})()).then(result=>{
    console.log('111')
    console.log(result)
})
