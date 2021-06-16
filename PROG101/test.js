const recursive =v=> v > 1 ? v + recursive(v-1) : 1
const result = recursive(10)
console.log('result :: ', result)


const tailRecursive=(v, acc)=> v > 1 ? tailRecursive(v-1, v+acc) : acc + 1
const tailResult = tailRecursive(10, 0)
console.log('tailResult :: ', tailResult)


if(1){
    let v = 10;
    let acc = 0;
    for(let i = v;i > 1;i = i-1) acc = v+acc
    const result = acc + 1
    console.log('result!!! :: ', result)
}



if(1) {

    const stringCheck = [[],[],[],[],[]]
    const el = {
        number:v=>v.toString(),
        string:v=>stringCheck.reduce((acc, curr)=>acc.replace(curr[0], curr[1]), v),
        boolean:v=>v.toString(),
        stringyfy(v){
            return this[typeof v]?.(v) ?? 'null'
        }
    }
    const arrValidator =(arr)=> {if (!Array.isArray(arr)) throw "invalid arr";}
    const EMPTY = {}
    const recursive = (arr, acc, i)=> i < arr.length
        ? recursive(arr, acc + `[${el.stringyfy(arr[i])}]`, i + 1)
        : `[${acc.substr(1)}]`
    const iteration = (arr)=>{
        arrValidator(arr)

        let result = EMPTY
        if(arr.length === 0) result = []
        else{
            let acc = '', i = 0
            while(i < arr.length){
                acc = acc + `[${el.stringyfy(arr[i])}]`
                i = i + 1
            }
            result = `[${acc.substr(1)}]`
        }

        if(result === EMPTY) throw 'no processed'

        return result
    }
}



















