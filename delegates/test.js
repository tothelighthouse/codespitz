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


