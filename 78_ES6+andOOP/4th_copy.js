





























//12
const textNode = (input, cursor, curr) => {
    const idx = input.indexOf('<', cursor)
    curr.tag.children.push({
        type:'text',
        name: input.substring(cursor + 1, idx)
    })
    return idx
}

const elementNode = (input, cursor, curr, idx, stack) => {
    // 완전태그 인지 확인
    const isClose = input[idx - 1] === '/'

    if(!isClose){
        stack.push({tag, back:curr})
        return true
    }
    return false

}








































