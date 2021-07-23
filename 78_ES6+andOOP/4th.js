








































const textNode = (input, cursor, curr) => {
    const idx = input.indexOf('<', cursor)
    curr.tag.children.push({type: 'text',text: input.substring(cursor, idx)})
    return idx
}

const elementNode = (input, cursor, idx, curr, stack) => {
    const isClose = input[idx - 1] === '/'
    const tag = {name:input.substring(cursor + 1, idx - (isClose ? 1 : 0)), type:'node', children:[]}
    curr.tag.children.push(tag)
    if(!close){
        stack.push({tag, back:curr})
        return true
    }
    return false
}

const parser = input=>{
    input = input.trim()
    const result = {name:'root', type:'node', children:[]}, stack = [{tag:result}]
    let curr, i = 0, j = input.length
    while (curr = stack.pop()){
        while (i < j){
            const cursor = i
            if(input[cursor] === '<'){
                const idx = input.indexOf('>', cursor)
                i = idx + 1
                if(input[cursor + 1] === '/'){
                    curr = curr.back
                }else{
                    if(elementNode(input, cursor, idx, curr, stack)) break;
                }
            } else i = textNode(input, cursor, curr)
        }
    }
}

































































