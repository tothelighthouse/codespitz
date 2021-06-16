
const objEntries = function*(obj){
    for(const k in obj) if(obj.hasOwnProperty(k)) yield [k, obj[k]]
}

const convert =v=>"" + v

const accuToString = (isObject, acc)=>{
    const [START, END] = isObject ? "{}": "[]"
    let result = ""
    if(acc.prev){
        let curr = acc;
        do{
            result = "," + (
                isObject ? `"${curr.value[0]}" : "${convert(curr.value[1])}"`
                    : convert(curr.value)
            ) + result
        } while (curr = curr.prev)
        result = result.substr(1)
    }
    return START + result + END
}



//12345678910
//12345678910
//12345678910
//

const recursive = (iter, isObject, accu, prev) => {
    const {done, value} = iter.next()
    if(!done) {
        const v = isObject ? value[1] :value
        switch (true){
            case Array.isArray(v):
                return recursive(
                    v[Symbol.iterator](),
                    false,
                    null,
                    {
                        target:iter,
                        isObject,
                        k:isObject ? value[0]:"",
                        accu,
                        prev}
                )
            case v && typeof v == 'object':
                return recursive(
                    objEntries(v),
                    true,
                    null,
                    {
                        target: iter,
                        isObject,
                        accu,
                        prev,
                        k: isObject ? value[0] : ""
                    }
                )
            default:
                return recursive(iter, isObject, {prev:accu, value}, prev)
        }
    } else {
        let accuStr = accuToString(isObject, accu)
        if(prev){
            return recursive(
                prev.target,
                prev.isObject,
                {prev:prev.accu,
                    value:prev.isObject ? [prev.k, accuStr] : accuStr},
                prev.prev
            )
        }else{
            return accuStr
        }
    }
}

const stringify = (v) =>recursive(
    Array.isArray(v) ? v[Symbol.iterator]() : objEntries(v),
    !Array.isArray(v),
    null,
    null)
console.log(stringify({a:1, b:2, c:[1,3,4]}))

































