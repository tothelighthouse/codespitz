const timeout =(f, ms)=>new Promise(res=>setTimeout(_=>res(f()), ms));
const f1 =_=>"abc";
const f2 =_=>"def";
const start = performance.now();
(()=>{
    timeout(f1, 500)
        .then(v=>{
            console.log(v, performance.now() - start);
            return timeout(f2, 1000);
        })
        .then(v=>console.log(v, performance.now() - start));
})();
(async ()=>{
    console.log(
        await timeout(f1, 500), performance.now() - start,
        await timeout(f2, 1000), performance.now() – start
);
})();

(async ()=>{
    const [v1, v2] = await Promise.all([timeout(f1, 500), timeout(f2, 1000)]);
    console.log(v1, v2, performance.now() - start);
})();
(async ()=>{
    const v = await Promise.race([timeout(f1, 500), timeout(f2, 1000)]);
    console.log(v, performance.now() - start);
})();

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

(async()=>{
    const v = await api("200.html", 1);
    if(v instanceof Error) console.log(`error : ${v}`);
    else console.log(`contents : ${v}`);
})();

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
        const [{name, email, sex}, friendsId] = await Promise.all([
            api(`/detail/${id}`),
            api(`/friends/${id}`)
        ]);
        updateMember(nick, thumb, name, email, sex);
        updateFriends(
            (await Promise.all(friendsId.map(id => api(`/detail/${id}`))))
                .map((v, idx)=>({id:friendsId[idx], ...v}))
        );
    } catch (e) {
        console.log(e);
    }
})();


const infinity = async function*(cat){
    let page = -1;
    do {
        try {
            const {nextPage, items}
                = await api2(`/list/${cat}/${page === -1 ? "" : page}`);
            page = nextPage;
            yield items;
        }catch(e){
            return;
        }
    }while(page !== -1);
};
const notice = infinity("notice");

(async()=>{
    const {value, done} = await notice.next();
    if(!done) console.log(value);
})();

document.querySelector("#next").onclick = async()=>{
    const {value, done} = await notice.next();
    if(!done) console.log(value);



// **************************************************************










// **************************************************************


    const prop = (target, key, delegator)=> {
        Object.defineProperty(target, key, {
            get() {
                return delegator.getValue(this, key);
            },
            set(v) {
                delegator.setValue(this, key, v);
            }
        });
    };
    const by = (cls)=>{
        Object.entries(cls)
            .filter(([, v])=>typeof v.getValue == "function" && typeof v.setValue == "function")
            .reduce((proto, [key, delegator])=>{
                Object.defineProperty(proto, key, {
                    get(){
                        return delegator.getValue(this, key);
                    },
                    set(v){
                        delegator.setValue(this, key, v);
                    }
                });
                return proto;
            }, cls.prototype)
        return cls;
    };

    const Test = by(class{
        static name = new TestDelegate;
        static company = new TestDelegate;
        map = new Map;
    });


    class TestDelegate{
        getValue(target, k){
            return target.map.get(k) ?? `no ${k}`;
        }
        setValue(target, k, v){
            target.map.set(k, v);
        }
    }

// **************************************************************

    const lazy =f=>{
        let v;
        return {
            getValue(target, k){
                return v ?? (v = f(target));
            },
            setValue(target, k, v){}
        };
    };
    const Test = by(class{
        static name = lazy(_=>"hika");
        map = new Map;
    })
// <body>
// <main></main>
// <script>
//     const test = new Test2("#test");
//     document.querySelector("main").innerHTML = `<div id="test">test</div>`;
//     console.log(test.element.innerHTML);
// </script>
// </body>
    const Test2 = by(class{
        static element = lazyClass(({selector})=>document.querySelector(selector));
        selector;
        constructor(selector){
            this.selector = selector;
        }
    });
    const lazyClass =(_=>{
        class Lazy{
            #f;
            #v;
            constructor(f){
                this.#f = f;
            }
            getValue(target, k){
                return this.#v ?? (this.#v = this.#f(target));
            }
            setValue(target, k, v){}
        }
        return f=>new Lazy(f);
    })();
// **************************************************************

// **************************************************************

    const by = (cls)=>{
        Object.entries(cls)
            .filter(([, v])=>typeof v.getValue == "function" && typeof v.setValue == "function")
            .reduce((proto, [key, delegator])=>{
                Object.defineProperty(proto, key, {
                    get(){
                        return delegator.getValue(this, key);
                    },
                    set(v){
                        delegator.setValue(this, key, v);
                    }
                });
                return proto;
            }, cls.prototype)
        return cls;
    };
    const observe =(_=>{
        class Observer{
            #value;
            #observer;
            constructor(value, observer){
                this.#value = value;
                this.#observer = observer;
            }
            getValue(target, k){return this.#value;}
            setValue(target, k, v){
                this.#observer(target, k, this.#value, this.#value = v);
            }
        }
        return (value, observer)=>new Observer(value, observer);
    })();
// <input id="name">
//     <input id="company">
//         <button id="log">log</button>
//         <script>
//             const test = new Test;
//             document.querySelector("#name").onchange =({target:{value}})=>test.name = value;
//             document.querySelector("#company").onchange =({target:{value}})=>test.company = value;
//             test.name = "hika"
//             document.querySelector("#log").onclick =_=>console.log(test.name, test.company);
//         </script>
    const Test1 = by(class{
        static name = observe("", (target, key, old, v)=>{
            if(old === v) return;
            document.querySelector("#name").value = v;
        });
        static company = observe("", (target, key, old, v)=>{
            if(old === v) return;
            document.querySelector("#company").value = v;
        });
    });


// **************************************************************


// **************************************************************
    class NetDelegate{
        static loaded = new Map;
        #url;
        constructor(url){
            this.#url = url;
        }
        async getValue(target, k){
            if(!NetDelegate.loaded.has(this.#url)){
                NetDelegate.loaded.set(this.#url, await (await fetch(this.#url)).json());
            }
            return NetDelegate.loaded.get(this.#url)[k] ?? "no data";
        }
        setValue(target, k, v){}
    }
// test.json
// {
//     "name": "hika",
//     "company": "bsidesoft"
// }
    (async()=> {
        const test = new Test();
        console.log(await test.name, await test.company);
    })()
// **************************************************************
