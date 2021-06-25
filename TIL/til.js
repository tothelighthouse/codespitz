// 두문장은 같은 의미
let a, b;
const x2 = a ?? b
const x1 = (a !== null && a !== undefined) ? a : b;
// || 와 ?? 의 차이
const dd3 = a || b
const dd4 = (a !== null && a !== undefined && a !== 0) ? a : b


// *******************************************************
// export function getAmount(val) {
//   const s = val === undefined ? '' : val
//   const str = getInteger(s.toString())
//   let num = 0
//   let result = ''
//   for (let i = str.length - 1; i >= 0; i--) {
//     result = str[i] + result
//     if (num % 3 === 2 && i !== 0) {
//       result = ',' + result
//     }
//     num++
//   }
//   return result
// }

export function getAmount(val) {
    const str = (val ?? '').toString()
    let num = 1
    let result = ''
    for (let i = str.length - 1; i >= 0; ) {
        result = !(num++ % 3) && i !== 0 ? ',' : '' + str[i] + result
        i--
    }
    return result
}
// *******************************************************















