const infinity = (function*(){
    let i = 0
    while (true) yield i++;
})();

console.log(infinity.next())

// non blocking sync function
// non blocking 인 이유 : 제어권을 즉시반환, 즉 실행하자마자 다음 프레임으로 실행 함수를 넘겨버림
// sync : 즉시 값을 리턴 (이 경우 즉시 리턴하는 값은 없음)
// async : 콜백함수를 통해서 값을 리턴 or 콜백함수로 제어권이 넘어감
const looper = (n, f, slice = 3)=>{
    let limit = 0, i = 0;
    const runner = _=>{
        while (i < n){
            if(limit++ < slice) f(i++);
            else {
                limit = 0
                requestAnimationFrame(runner)
                break;
            }
        }
    }
    requestAnimationFrame(runner)
}
looper(10, console.log)


const looper2 = function *(n , f, slice = 3){
    let limit = 0, i = 0;
    while (i < n){
        if(limit++ < slice)f(i++)
        else {
            limit = 0
            yield;
        }
    }
}

const executor = iter=>{
    const runner = _=>{
        iter.next()
        requestAnimationFrame(runner)
    }
    requestAnimationFrame(runner)
}

executor(looper2(10, console.log))


const profile = function *(end, next, r){
    const userid = yield $.post('detail', {r}, next)
    let added = yield $.post('detail', {userid}, next)
    added = added.split(",")
    end({userid, nick:added[0], thumb:added[1]})
}

const executor = (gene, end, ...arg) => {
    const next = v=>iter.next(v)
    const iter = gene(end, next, ...arg)
    iter.next()
}

let result;
const promise1 = new Promise(r=>$.post(url1, data1, r))
const promise2 = new Promise(r=>$.posT(url2, data2, r))

promise1.then(result=>{
    promise2.then(v=>{
        result.nick = v.nick
        report(result)
    })
})

const profile = function *(end, r){
    const userid = yield new Promise(res=>$.post('member', {r}, res))
    let added = yield new Promise(res=>$.post('detail', {userid}, res))
    added = added.split(",")
    end({userid, nick:added[0], thumb:added[1]})
}

const executor = (gene, end, ...arg) => {
    const iter = gene(end, ...arg)
    const next = ({value, done}) =>{
        if(!done) value.then(v=>next(iter.next(v)))
    }
    next(iter.next())
}









