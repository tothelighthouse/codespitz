const api = async(url, timeout = 5000, info = {})=>{
    try {
        let id = -1;
        const v = await Promise.race([
            new Promise(res=>id = window.setTimeout(_=>res(), timeout)),
            fetch(new Request(url, info))
        ]);
        if(v instanceof Response){
            clearTimeout(id);
            return v.status === 404 ? new Error("404") : await v.text();
        }else return new Error("timeout");
    }catch(e){
        return e;
    }
}

const api2 = async(url, timeout = 5000, info = {})=>{
    let id = -1;
    const v = await Promise.race([
        new Promise(res=>id = window.setTimeout(_=>res(), timeout)),
        fetch(new Request(url, info))
    ]);
    if(v instanceof Response){
        clearTimeout(id);
        if(v.status === 404) throw new Error("404");
        return await v.json();
    }else throw new Error("timeout");
};
const updateMember = ()=>{}
const updateFriends = ()=>{}
(async()=>{
    try {
        const {id, nick, thumb} = await api("/member");
        const [{name, email, sex}, friendsId] = await Promise.all([api(`/detail/${id}`), api(`/friends/${id}`)]);
        updateMember(nick, thumb, name, email, sex);
        updateFriends(
            (await Promise.all(friendsId.map(id => api(`/detail/${id}`)))).map((v, idx)=>({id:friendsId[idx], ...v}))
        );
    } catch (e) {
        console.log(e);
    }
})();