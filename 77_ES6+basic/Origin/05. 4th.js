if(1){
    // 최초
    const dd = {
        [Symbol.iterator](){return this;},
        data:[{a:[1,2,3,4,], b:'-'}, [5,6,7], 8,9],
        next(){
            let v;
            while (v = this.data.shift()) {
                switch (true) {
                    case Array.isArray(v): this.data.unshift(...v);break;
                    case v && typeof v == 'object': for (var k in v) this.data.unshift(v[k]);break;
                    default: return {value: v, done: false}
                }
            }
            return {done: true}
        }
    }
}

if(1){
    // ES6 문법을 사용해 간략화
    const dd = {
        [Symbol.iterator](){return this;},
        data:[{a: [1, 2, 3, 4,], b: '-'}, [5, 6, 7], 8, 9],
        next(){
            let v;
            while (v = this.data.shift()) {
                if (!(v instanceof Object)) return {value:v}
                if (!Array.isArray(v)) v = Object.values(v)
                this.data.unshift(...v)
            }
            return {done: true}
        }
    }
}

if(1){
    // 재사용을 위해 클래스로 정의
    const Compx = class {
        constructor(data) {
            this.data = data;
        }
        [Symbol.iterator]() {
            const data = JSON.parse(JSON.stringify(this.data))
            return {
                next(){
                    let v;
                    while (v = this.data.shift()) {
                        if (!(v instanceof Object)) return {value:v}
                        if (!Array.isArray(v)) v = Object.values(v);
                        this.data.unshift(...v)
                    }
                    return {done: true}
                }
            }
        }

    }
}

// 팩토리 + 컴포지트
if(1) {
    const Operator = class {
        static factory(v) {
            if (v instanceof Object) {
                if (!Array.isArray(v)) v = Object.values(v);
                return new ArrayOp(v.map(v => Operator.factory(v)))
            } else return new PrimaOp(v)
        }

        constructor(v) {
            this.v = v
        }

        operation(f) {
            throw 'override'
        }
    }
    const PrimaOp = class extends Operator{
        constructor(v) {super(v);}
        operation(f){f(this.v)}
    }

    const ArrayOp = class extends Operator{
        constructor(v) {super(v);}
        operation(f){for(const v of this.v)v.operation(f)}
    }

    Operator.factory([1,2,3, {a:4, b:5}, 6,7]).operation(console.log)

}


















