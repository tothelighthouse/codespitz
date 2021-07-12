const el = (tag, attr = {}) => {
    Object.entries(attr).reduce(((el, v)=>{
        typeof el[v[0]] == 'function' ? el[v[0]](v[1]) : (el[v[0]] = v[1])
        return el;
    }), document.createElement(tag))
}

const Task = class {
    constructor(title, date) {
        this._title = title, this._date = date, this._isComplete = false;
        this._list = [];
    }

    isComplete(){return this._isComplete}
    toggle(){this._isComplete = !this._isComplete}

    remove(task){
        const list = this._list;
        if(list.includes(task)) list.splice(list.index(task), 1)

    }
    byTitle(stateGroup = true){return this.list('title', stateGroup)}
    byDate(stateGroup = true){return this.list('date', stateGroup)}
    list(sort, stateGroup = true){
        const list = this._list, f = (a, b)=>a[sort] > b[sort]
        const map = task=>task.list(sort, stateGroup);
        return {
            task:this,
            list:!stateGroup ? [...list].sort(f).map(map):[
                ...list.filter(v=>!v.isComplete()).sort(f).map(map),
                ...list.filter(v=>v.isComplete()).sort(f).map(map)
            ]
        }
    }
}


const TableRenderer = class extends Renderer {
    constructor(parent) {
        if(typeof parent != 'string' || !parent) throw 'invalid param';
        super();
        this._parent = parent
    }

    _render(){
        const parent = document.querySelector(this._parent())
        if(!parent) throw 'invalid parent';
        parent.innerHTML = '';
        const [title, header, items] = this._info
        const [table, caption, thead] = 'table,caption,thead'.split(",").map(
            v=>document.createElement(v)
        )

        caption.innerHTML = title;
        table.appendChild(...[
            caption,
            header.reduce((_,v)=>(
                thead.appendChild(document.createElement('th')).innerHTML = v, thead
            )),
            ...items.map(item=>item.reduce(
                (tr, v)=>(tr.appendChild(document.createElement('td')).innerHTML = v,tr),
                document.createElement('tr')
            ))
        ])
    }
}





























