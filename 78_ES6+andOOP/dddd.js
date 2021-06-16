

// 사용자 반복 처리기
const loop = (iter, f) => {
    // iterable 이라면 iterator를 얻음
    if(typeof iter[Symbol.iterator] == 'function'){
        iter = iter[Symbol.iterator]();
    }

    // iteratorObject가 아니라면 건너뜀
    if(typeof iter.next != 'function') return;

    do{
        const v = iter.next()
        if(v.done) return;
        f(v.value);
    }while (true)
}

const iter = {
    arr:[1,2,3,4],
    [Symbol.iterator](){return this},
    next(){
        return {
            done:this.arr.length === 0,
            value:this.arr.pop()
        }
    }
}
loop(iter, console.log)





// 제곱을 요소로 갖는 가상컬렉션
const N2 = class {
    constructor(max) {
        this.max = max
    }
    [Symbol.iterator]() {
        let cursor = 0, max = this.max;
        return {
            done: false,
            next() {
                if(cursor > max){
                    this.done = true;
                }else {
                    this.value = cursor * cursor
                    cursor++
                }
                return this
            }
        }
    }
}
// Iterator 의 구현을 돕는 Generator
const generator = function *(max){
    let cursor = 0
    while (cursor < max){
        yield cursor * cursor
        cursor ++
    }
}
console.log([... new N2(5)])


console.log([...generator(5)])
for(const v of generator(5)){
    console.log(v)
}





















