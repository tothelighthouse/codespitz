//1

const Github = class {
    constructor(id, repo) {
        this._base = `http://api.git/${id}/${repo}/contents`
    }
    load(path){
        const id = 'callback' + Github._id++;
        const f = ({data:{contents}})=>{
            delete Github[id]
            document.head.removeChild(s)
            this._loaded(contents)
        }
        const s = document.createElement('script')
        s.src = `${this._base + path}?callback=Github.${id}`
        document.head.appendChild(s)
    }
    _loaded(contents){throw 'override'}
}



const ImageLoader = class extends Github{
    constructor(id, repo, target) {
        super(id, repo);
        this._target = target
    }
    _loaded(contents) {
        this._target.src = 'data:text/plain;base64' + v
    }
}




























