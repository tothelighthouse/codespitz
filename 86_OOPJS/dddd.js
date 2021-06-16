const dataLoader = async function*(...aIters){
    let prev;
    for(const iter of aIters){
        iter.update(prev);
        prev = (await iter.load().next()).value;
        yield prev;
    }
};
const render = async function(...aIters){
    for await(const json of dataLoader(...aIters)){
        console.log(json)
    }
};