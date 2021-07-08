//123456789



const el = (tag, attr = {})=>{
    Object.entries().reduce(((el, v)=>{
        typeof v == 'function' ? el[v[0]](v[1]) : el[v[0]] = v[1]
        return el
    }), document.createElement(tag))

}

