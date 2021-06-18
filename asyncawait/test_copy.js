let asyncFunc1 = (msg) => {
    new Promise((resolve)=>{
        setTimeout(()=>{
            resolve('func1')
        }, 1000)
    })
}

let aynscFunc2 = (msg) =>{
    new Promise((resolve => {
        setTimeout(()=>{
            resolve('func2')
        }, 1000)
    }))
}

const promiseMain = () =>{
    asyncFunc1('dfdf').then((result)=>{
        const result1 = result
        return asyncFunc2('dfdf')
    }).then((result)=>{
        const result2 = result
        console.log(result)
    })
}


// 1. asyncFunc1('dfdf').then((result)=>{ 삭제
// asyncFunc1('dfdf') 위치 이동 -> result 가 있는 곳으로
// await 앞에 붙여 주기
// 2.  return asyncFunc2('dfdf')
//     }).then((result)=>{ 삭제
// asyncFunc2('dfdf') 위치 이동 -> result 가 있는 곳으로
// await 앞에 붙여 주기
const promiseMain = async () =>{
        const result1 = await asyncFunc1('dfdf')
        const result2 = await asyncFunc2('dfdf')
}

// 반대로
// await 삭제
// asyncFunc1('dfdf') 아랫줄로 이동 + then()
// asyncFunc2('dfdf') 를 then 스코프 안으로 이동
// then 추가
const promiseMain = async () =>{
    let result1
    let result2
        asyncFunc1('dfdf').then(result=>{
            result1 = result
            return asyncFunc2('dfdf')
        }).then(result1=>{
            result2 = result1
        })

}
























