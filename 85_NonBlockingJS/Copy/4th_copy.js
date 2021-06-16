const AIter = class {
    update(v){}
    async * load(){throw "override"}
}

const AsyncItem = class {
    static #dataPass; static #items;
    static iterable(dataPass, ...items){
        AsyncItem.#dataPass = dataPass
        AsyncItem.#items = items
        return AsyncItem
    }
    static async *[Symbol.asyncIterator](){
        const dataPass = new AsyncItem.#dataPass;
        for(const item of AsyncItem.#items){
            const v = await item.load(dataPass.data).next()
            yield dataPass.data = v.values
        }
    }
    async *load(v){throw "override"}
}

const dataLoader = async function*(pass, ...aIters){
    const dataPass = new Pass
    for(const item of aIters){
        const v = await item.load(dataPass.data).next()
        yield dataPass.data = v.value
    }
}

const Renderer = class {
    #dataPass;
    constructor(dataPass) {
        this.#dataPass = dataPass
    }
    set dataPass(v){this.#dataPass = v}
    async render(...items){
        const iter = AsyncItem.iterable(this.#dataPass, ...items);
        for await (const v of iter) console.log("**", v)
    }
}

const renderer = new Renderer(PrevPass)

























