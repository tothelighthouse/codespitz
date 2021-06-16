if(1) {
// 1. dataLoader 원본
// const dataLoader = async function*(...aIters){
//     let prev;
//     for(const iter of aIters){
//         iter.update(prev);
//         prev = (await iter.load().next()).value
//         yield prev;
//     }
// }
// 2. dataLoader 개선
    const dataLoader = async function* (...aIters) {
        const dataPass = new DataPass;
        for (const item of aIters) {
            const v = await item.load(dataPass.data).next();
            yield dataPass.data = v.value;
        }
    }

    const render = async function (...aIters) {
        for await(const json of dataLoader(...aIters)) {
            console.log(json)
        }
    }
}
// =============================== 시작 ==============================
// =============================== DataPass 도입 ==============================
if(1) {
    const DataPass = class {
        get data() {
            throw "override";
        }

        set data(v) {
            throw "override";
        }
    };
    const PrevPass = class extends DataPass {
        #data;
        get data() {
            return this.#data;
        }

        set data(v) {
            this.#data = v;
        }
    };
    const IncPass = class extends DataPass {
        #data = [];
        get data() {
            return this.#data;
        }

        set data(v) {
            this.#data.push(v);
        }
    }
    const dataLoader = async function* (pass, ...aIters) {
        const dataPass = new pass;
        for (const item of aIters) {
            const v = await item.load(dataPass.data).next();
            yield dataPass.data = v.value;
        }
    }
    const render = async function (...aIters) {
        for await(const json of dataLoader(PrevPass, ...aIters)) {
            console.log(json)
        }
    };
}
// =============================== DataPass 도입 ==============================
// =============================== 끝 ==============================


// ========================== 시작 ==============================
// =============================== AIter AsyncItem 도입 ==============================
if(1) {
    const DataPass = class {
        get data() {
            throw "override";
        }

        set data(v) {
            throw "override";
        }
    };
    const PrevPass = class extends DataPass {
        #data;
        get data() {
            return this.#data;
        }

        set data(v) {
            this.#data = v;
        }
    };
    const IncPass = class extends DataPass {
        #data = [];
        get data() {
            return this.#data;
        }

        set data(v) {
            this.#data.push(v);
        }
    }

    const AIter = class{
        update(v){}
        async *load(){throw "override";}
    };

    const AsyncItem = class{
        static #dataPass; static #items;
        static iterable(dataPass, ...items){
            AsyncItem.#dataPass = dataPass;
            AsyncItem.#items = items;
            return AsyncItem;
        }
        static async *[Symbol.asyncIterator](){
            const dataPass = new AsyncItem.#dataPass;
            for(const item of AsyncItem.#items){
                const v = await item.load(dataPass.data).next();
                yield dataPass.data = v.value;
            }
        }
        async *load(v){throw "override";}
    };
    const dataLoader = async function*(pass, ...aIters){
        const dataPass = new pass;
        for(const item of aIters){
            const v = await item.load(dataPass.data).next();
            yield dataPass.data = v.value;
        }
    }

    const Renderer = class{
        #dataPass;
        constructor(dataPass){
            this.dataPass = dataPass;
        }
        set dataPass(v){this.#dataPass = v;}
        async render(...items) {
            const iter = AsyncItem.iterable(this.#dataPass, ...items);
            for await(const v of iter) console.log("**", v);
        }
    };

    // const render = async function(...aIters){
    //     for await(const json of AsyncItem.iterable(PrevPass, ...aIters)){
    //         console.log(json)
    //     }
    // };
    const renderer = new Renderer(PrevPass);
    // renderer.render(...)
}
// =============================== AIter AsyncItem 도입 ==============================
// =============================== 끝 ==============