// // 두문장은 같은 의미
// let a, b;
// const x2 = a ?? b
// const x1 = (a !== null && a !== undefined) ? a : b;
// // || 와 ?? 의 차이
// const dd3 = a || b
// const dd4 = (a !== null && a !== undefined && a !== 0) ? a : b
//
//
// // *******************************************************
// // export function getAmount(val) {
// //   const s = val === undefined ? '' : val
// //   const str = getInteger(s.toString())
// //   let num = 0
// //   let result = ''
// //   for (let i = str.length - 1; i >= 0; i--) {
// //     result = str[i] + result
// //     if (num % 3 === 2 && i !== 0) {
// //       result = ',' + result
// //     }
// //     num++
// //   }
// //   return result
// // }
//
// export function getAmount(val) {
//     const str = (val ?? '').toString()
//     let num = 1
//     let result = ''
//     for (let i = str.length - 1; i >= 0; ) {
//         result = !(num++ % 3) && i !== 0 ? ',' : '' + str[i] + result
//         i--
//     }
//     return result
// }
// // *******************************************************
//
//
//
//


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


YYYYMMDD = "(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])";
YYYYMMDDHH = "(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])(0[0-9]|1[0-9]|2[0-3])";
YYYYMMDDHHMI = "(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])(0[0-9]|1[0-9]|2[0-3])([0-5][0-9])";
YYYYMMDDHHMISS = "(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])(0[0-9]|1[0-9]|2[0-3])([0-5][0-9])([0-5][0-9])";
HH= "(0[0-9]|1[0-9]|2[0-3])";
MMDD = "(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])";
HHMI = "(0[0-9]|1[0-9]|2[0-3])([0-5][0-9])";
dddd = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
dddd1 = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w_\.-]*)*\/?$/

※ 패스워드 규칙검사 예제

1. (?=.*[A-Z]) → 대문자 검사

- 대문자 1개 앞에 아무거나 있거나 없거나 (.*)

- 앞에 뭐가 있던 상관없고 대문자가 1개라도 있어야 true가 되기 때문에 대문자 검사식이 됨

2. ​(?=.*[a-z]) → 소문자 검사

3. (?=.*[0-9]) → 숫자 검사

4. (?=.*[\\W^\\s]) → 공백이 아닌 (문자,숫자가 아닌)문자(특수문자) 검사

5. [\\S^\\\\]{8,} → 허용 문자 및 최소 횟수 설정

- 공백이 아니면서 역슬레쉬가 아닌 문자가 8개 이상 연속돼야 함




