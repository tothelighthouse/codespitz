if(1){

    const ee = {
        [Symbol.iterator](){return this},
        data:[],
        next(){
            let v;
            while (v = this.data.shift()){
                switch (true){
                    case Array.isArray(v): this.data.unshift(...v)
                    case v && typeof v == 'object': for (let k in v) this.data.unshift(v[k])
                    default: return {value:v, done:false}
                }
            }
            return {done:true}
        }

    }

}