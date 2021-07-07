const Renderer = class {
    render({task, list}){
        const v = this._folder(task);
        this.subTask(this._parent(v, task), list)
    }
    subTask(parent, list){
        list.forEach(({task, list})=>{
            const v = this._task(parent, task);
            this.subTask(this._parent(v, this), list)
        })
    }
    _folder(task){throw 'override'}
    _parent(v, task){throw 'override'}
    _task(v, task){throw 'override'}
}


const DomRenderer = class extends Renderer{
    constructor(parent) {
        super()
        this._p = parent
    }

    _folder({_title:title}){
        const parent = document.querySelector(this._p);
        parent.innerHTML = '';
        parent.appendChild(el('h1', {innerHTML:title}))
        return parent
    }
    _parent(v, _){
        return v.appendChild(el('ul'))
    }
    _task(v, {_title:title}){
        const li = v.appendChild(el('li'))
        li.appendChild(el('div', {innerHTML:title}));
        return li
    }
}


const ConsoleRenderer = class extends Renderer{
    _folder({_title:title}){
        console.log('-------------')
        console.log('folder:', title)
        return '';
    }
    _parent(v, list){
        return v
    }
    _task(v, {_title:title}){
        console.log(v, title)
        return v+ '-'
    }
}







const DomRenderer1 = class {
    constructor(parent) {
        this._parent = parent
    }
    render(data){
        const {task:{_title:title}, list} = data
        const parent = document.querySelector(this._parent)
        parent.innerHTML = '';
        parent.appendChild(el('h1', {innerHTML:title}))
        parent.appendChild(this._render(el('ul'), list))

    }
    _render(parent, list) {
        list.forEach(({task:{_title:title}, list})=>{
            const li = parent.appendChild(el('li'));
            li.appendChild(el('div', {innerHTML:title}))
            li.appendChild(this._render(el('ul'), list))
        })
        return parent
    }
}


const ConsoleRenderer1 = class {
    render(data){
        const {task:{_title:title}, list} = data;
        console.log('-------------')
        console.log('folder : ', title)
        this._render('', list);
    }
    _render(indent, list){
        list.forEach(({task:{_title:title}, list})=>{
            console.log(indent + task._title)
            this._render(indent + '-', list)
        })
    }
}


















