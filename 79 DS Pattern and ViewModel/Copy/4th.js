

//123456789

const DomRenderer = class {
    constructor(parent) {
        this._parent = parent
    }

    render(data){
        const {task:{_title:title}, list} = data
        const parent = document.querySelector(this._parent)
        parent.innerHTML = ''
        parent.appendChild(el('h1', {innerHTML:title}))
        parent.appendChild(this._render(el('ul'), list))
    }
    _render(parent, list){
        list.forEach(({task:{_title:title}, list})=>{
            const li = parent.appendChild(el('li'))
            li.appendChild(el('div', {innerHTML:title}))
            li.appendChild(this._render(el('ul'), list))
        })
        return parent
    }
}






