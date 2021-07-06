const Task = class{
    static title(a, b){return a.sortTitle(b);}
    static date(a, b){return a.sortDate(b);}
    constructor(title){
        if(!title) throw 'invalid title'; else this._title = title;
        this._list = [];
    }
    add(task){if(task instanceof Task) this._list.push(task); else throw 'invalid';}
    remove(task){
        const list = this._list;
        if(list.includes(task)) list.splice(list.indexOf(task), 1);
    }
    getResult(sort, stateGroup){
        const list = this._list;
        return {
            item:this._getResult(),
            children:(!stateGroup ? [...list].sort(sort) : [
                ...list.filter(v=>!v.isComplete()).sort(sort),
                ...list.filter(v=>v.isComplete()).sort(sort)
            ]).map(v=>v.getResult(sort, stateGroup))
        };
    }
    _getResult(){throw 'override';}
    isComplete(){throw 'override';}
    sortTitle(){throw 'override';}
    sortDate(){throw 'override';}
};

const TaskItem = class extends Task{
    constructor(title, date = Date.now()){
        super(title);
        this._date = date;
        this._isComplete = false;
    }
    _getResult(sort, stateGroup){return this;}
    isComplete(){return this._isComplete;}
    sortTitle(task){return this._title > task._title;}
    sortDate(task){return this._date > task._date;}
    toggle(){this._isComplete = !this._isComplete;}
};

const TaskList = class extends Task{
    constructor(title){super(title);}
    _getResult(){return this._title;}
    isComplete(){}
    sortTitle(){return this;}
    sortDate(){return this;}
    byTitle(stateGroup = true){return this.getResult(Task.title, stateGroup);}
    byDate(stateGroup = true){return this.getResult(Task.date, stateGroup);}
};

const el =(tag, ...attr)=>{
    const el = document.createElement(tag);
    for(let i = 0; i < attr.length;){
        const k = attr[i++], v = attr[i++];
        if(typeof el[k] == 'function') el[k](...(Array.isArray(v) ? v : [v]));
        else if(k[0] == '@') el.style[k.substr(1)] = v;
        else el[k] = v;
    }
    return el;
};

const DomRenderer = class {
    constructor(list, parent) {
        this._parent = parent;
        this._list = list;
        this._sort = 'title';
    }

    add(parent, title, date) {
        parent.add(new TaskItem(title, date));
        this.render();
    }

    remove(parent, task) {
        parent.remove(task);
        this.render();
    }

    toggle(task) {
        if (task instanceof TaskItem) {
            task.toggle();
            this.render();
        }
    }
    render(){
        const parent = this._parent;
        parent.innerHTML = '';
        parent.appendChild('title,date'.split(',').reduce((nav,c)=>(
            nav.appendChild(
                el('button', 'innerHTML', c,
                    '@fontWeight', this._sort == c ? 'bold' : 'normal',
                    'addEventListener', ['click', e=>(this._sort = Task[c], this.render())])
            ), nav
        ), el('nav')));
        this._render(parent, this._list, this._list.getResult(this._sort), 0);
    }
    _render(base, parent, {item, children}, depth){
        const temp = [];
        base.style.paddingLeft = depth * 10 + 'px';
        if(item instanceof TaskList){
            temp.push(el('h2', 'innerHTML', item._title));
        }else{
            temp.push(
                el('h3', 'innerHTML', item._title,
                    '@textDecoration', item.isComplete() ? 'line-through' : 'none'),
                el('time', 'innerHTML', item._date.toString(), 'datetime', item._date.toString()),
                el('button', 'innerHTML', item.isComplete() ? 'progress' : 'complete',
                    'addEventListener', ['click', _=>this.toggle(item)]
                ),
                el('button', 'innerHTML', 'remove',
                    'addEventListener', ['click', _=>this.remove(parent, item)]
                )
            )
        }
        const sub = el('section',
            'appendChild', el('input', 'type', 'text'),
            'appendChild', el('button', 'innerHTML', 'addTask',
                'addEventListener', ['click', e=>this.add(item, e.target.previousSibling.value)])
        );
        children.forEach(v=>{this._render(sub, item, v, depth + 1)});
        temp.push(sub);
        temp.forEach(v=>base.appendChild(v));
    }
}