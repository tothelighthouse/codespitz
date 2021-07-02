








const profile = function *(end, next, r){
    const userid = yield $.post('member.php', {r}, next)
    let added = yield $.post('detail.php', {userid}, next)
    added = added.split(",")
    end({userid, nick:added[0]}, thumb:added[1])
}

const executor = (end, gene, ...arg) => {
    const iter = gene(end, next, ...arg)
    const next =v=>iter.next(v)
    iter.next()
}

const profile2 = function*(end, r){
    const userid = yield new Promise(res=>$.post('member', {r}, res))
    let added = yield new Promise(res=>$.post("detail", {userid}, res))
    added = added.split(",")
    end({userid, nick:added[0], thumb:added[1]})
}

const executor2 = (gene, end, ...arg)=>{
    const iter = gene(end, ...arg)
    const next = ({value, done}) =>{
        if(!done) value.then(v=>next(iter.next(v)))
    }
    next(iter.next())
}

const profile3 = async function(end, r){
    const userid = await new Promise(res=>$.post('member.php'), {r}, res)
    let added = await new Promise(res=>$.post('detail.php'), {r}, res)
    added = added.split(",")
    end({userid, nick:added[0], thumb:added[1]})
}

































