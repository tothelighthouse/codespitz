const AIter = class {
    update(v){}
    async *load(){throw "override"}
}

const Url = class extends AIter {
    #url;#opt;

    constructor(url, opt) {
        super();
        this.#url = url;
        this.#opt = opt;
    }

    update(v) {
        if(json)this.#opt.body = JSON.stringify(json)
    }

    async* load() {
        console.log('body', this.#opt.body)
        yield await (await fetch(this.#url, this.#opt)).json()
    }
}

const url = (u, opt = {method:"POST"})=>new Url(u, opt)

const Urls = class extends AIter{
    #urls;#body

    constructor(...urls) {
        super();
        this.#urls = urls;
    }

    update(json) {
        this.#body = json
    }

    async* load() {
        const r = []
        for(const url of this.#urls){
            url.update(this.#body)
            r.push((await url.load().next()).value)
        }
        yield r
    }
}

const urls = (...urls) => new Urls(...urls.map(Url))

const Start = class extends AIter{
    async *load(){yield "load start"}
}

const End = class extends AIter{
    async *load(){yield "load end"}
}

const START = new Start
const END = new End

const dataLoader = async function*(aIters){
    let prev;
    for(const iter of aIters){
        iter.update(prev)
        prev = (await iter.load().next()).value
        yield prev
    }
}

const render = async function(...aIters){
    for await (const json of dataLoader(...aIters)){
        console.log(json)
    }
}




















