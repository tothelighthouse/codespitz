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






const textNode = (text, target)=>{
    if(text.length) target.push({type:'TEXT', text});
    return '';
};


const elementNode = (input, cursor, text, stack, stacks)=>{
    const char = input[cursor++];
    let isBreak = false;
    if(char === '<'){
        text = textNode(text, stack.tag.children);
        if(input[cursor++] !== '/'){
            let name = input.substring(cursor - 1, cursor = input.indexOf('>', cursor));
            const isClose = input[cursor] === '/';
            if(isClose) name = name.substr(0, name.length - 1);
            const tag = {name, type:'NODE', children:[]};
            cursor++;
            stack.tag.children.push(tag);
            if(!isClose){
                stacks.push({tag, back:stack});
                isBreak = true;
            }
        }else if(stack.tag.name == input.substring(cursor, input.indexOf('>', cursor))){
            stack = stack.back;
        }
    }else text += char;
    return {cursor, text, isBreak, stack};
};

const parser = input=>{
    const result = {tag:{type:'ROOT', children:[]}}, stacks = [];
    let cursor = 0, stack = result;
    do {
        let text = '';
        while (cursor < input.length) {
            const v = elementNode(input, cursor, text, stack, stacks);
            ({cursor, text, stack} = v);
            if (v.isBreak) break;
        }
    }while(stack = stacks.pop());
    return result.tag.children;
};
console.log('<div>test</div>',parser('<div>test</div>'));
console.log('<div>test<img/></div>',parser('<div>test<img/></div>'));
console.log('<div>test<a>aa</a>bb</div>',parser('<div>test<a>aa</a>bb</div>'));



