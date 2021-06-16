// 1. dataLoader 원본
// const dataLoader = async function*(...aIters){
//     let prev;
//     for(const iter of aIters){
//         iter.update(prev);
//         prev = (await iter.load().next()).value
//         yield prev;
//     }
// }
// 2. dataLoader 개선

const dataLoader = async function*(...aIters) {
    const dataPass = new DataPass;
    for(const item of aIters){
        const v = await item.load(dataPAss.data).next();
        yield dataPass.data = v.value
    }
}


const render = async function(...aIters){
    for await(const json of dataLoader(...aIters)){
        console.log(json)
    }
}




















