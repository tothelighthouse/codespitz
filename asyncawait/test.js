let asyncFunc1 = (msg) => {
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(`func1 : ${msg}`);
        }, 1000);
    })
};

let asyncFunc2 = (msg) => {
    new Promise((resolve) => {
        setTimeout((resolve) => {
            resolve(`func2 : ${msg}`);
        }, 1000)
    })
}
// 위와 같이 promise를 반환하면 함수 2개가 있다고 가정하자. 아래는 promise를 썼을 때의 예시이다.

function promiseMain() {
    asyncFunc1('Hello').then((result) => {
        console.log(result);
        return asyncFunc2('world')
    }).then((result) => {
        console.log(result);
    })
}

// 이번에는 async & await를 사용하였을 때의 코드이다.

    async function asyncMain() {
    let result = await asyncFunc1('Heello');
    console.log(result);
    result = await asyncFunc2('world');
    console.log(result);
}

// async & await 예제
function asyncItem() {
    return new Promise((resolve, reject) => {
        var item = [1, 2, 3];
        resolve(item);
    });
}

async function logItems() {
    var resultItem = await asyncItem();
    console.log(resultItem);
}



