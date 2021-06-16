const rNum = /^\s*([0-9]+)\s*[,]?/
const rKey = /^\s*"((?:[^"]|\\")+)"\s*:\s*/
// ************************* if(1) *************************

//12

const parse = (str, acc, k, stack) => {
    let v = str.trim()
    if(!v.length) return acc
    switch (v[0]) {
        case "[":case "{":
            stack.push({acc, k})
            return parse(v.substr(1), v[0] == "[" ? [] : {}, null, stack)
        case "]":case "}":
            if (!stack.length) throw "!111"
            const {acc:prev, k:key} = stack.pop()
            if (!prev) return acc
            else {
                if (prev instanceof Array) prev.push(acc)
                else prev[key] = acc
                v = v.substr(1).trim()
                if (v[0] == ','){
                    v = v.substr(1).trim()
                    if ("}]".indexOf(v[0]) != -1)throw "3333333"
                }
                return parse(v, prev, null, stack)
            }
        default:
            if (acc instanceof Array){
                const value = rNum.exec(v)
                if(!value) throw "44444444"
                acc.push(parseFloat(value[1]))
                return parse(v.substr(value[0].length), acc, null, stack)
            }else {
                if(k == null){
                    const key = rKey.exec(v)
                    if(!key) throw "44444444"
                    return parse(v.substr(key[0].length), acc, key[1], stack)
                }else {
                    const value = rNum.exec(v)
                    if(!value) throw "44444444"
                    acc[k] = parseFloat(value[1])
                    return parse(v.substr(value[0].length), acc, null, stack)
                }

            }
    }

}





















// ************************* if(1) *************************
console.log(parse(`{"a":[1,2], "b":[1,2]}`, null, null, []))
console.log(parse(`{"a":[1,2,[3,4],5], "b":{"a":123, "b":456}}`, null, null, []))

































