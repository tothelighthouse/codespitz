const Task = class {
    static title(a, b){return a.sortTitle(b);}
    static date(a, b){return a.sortDate(b);}

    constructor(title) {
        if(!title) throw 'invalid title';else this._title = title;
    }

    add(task){
        if(task instanceof Task) this._list.push(task);else throw 'invalid'
    }

    remove(task){
        const list = this._list
        if(list.includes(task)) list.splice(list.indexOf(task), 1)
    }

    getResult(sort, stateGroup){
        const list = this._list
        return {
            item: this._getResult(),
            children:(!stateGroup ? [...list].sort(sort):[
                [...list].filter(v=>!v.isComplete()).sort(sort),
                [...list].filter(v=>v.isComplete()).sort(sort),
            ]).map(v=>v.getResult(sort, stateGroup))
        }
    }

    _getResult(){}
    isComplete(){}
    sortTitle(){}
    sortDate(){}
}

const TaskItem = class extends Task{
    constructor(title, date = Date.now()) {
        super(title);
        this._Date = date;
        this._title = title
    }
    _getResult(sort, stateGroup) {return this}
}












































