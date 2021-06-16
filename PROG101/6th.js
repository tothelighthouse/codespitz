
const rNum= /^s*([0-9]+)\s*,?/

const parser = (str, acc, stack) => {
    const v = str.trim()
    if(!v) return acc
    switch (v[0]) {
        case "[":
            stack.push(acc)
            return  parser(v.substr(1), [], stack)
        case "]":
            const prev = stack.pop()
            prev.push(acc)
            return  parser(v.substr(1), prev, stack)
        default:
            const value = rNum.exec(v)
            if(!value) throw 'invalid value:' + v
            acc.push(parseFloat(value[1]))
            return  parser(v.substr(value[0].length), acc, stack)
    }


}


const param= '[ 100000    ,   2    ,[3,4,5,[7,8,[101010,10101010]]]]'
console.log(parser(param, [],[]))