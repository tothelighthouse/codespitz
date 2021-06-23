// 1

const ex1 = {
    [Symbol.iterator](){return this;},
    data: [],
    next(){
        let v;
        while (v = this.data.shift()){
            switch (true){
                case Array.isArray(v): this.data.unshift(...v);break
                case v && typeof v == 'object': for(const k in v) this.data.unshift(v[k]);break
                default :return {value : v, done: false}
            }
        }
        return {done:true}
    }
}

const ex2 = {
    [Symbol.iterator](){return this;},
    data:[],
    next(){
        let v;
        while (v = this.data.shift()){
            if (!(v instanceof Object)) return {value: v}
            if (!Array.isArray(v)) v = Object.values(v)
            this.data.unshift(...v)
        }
        return {done:true}
    }

}
























