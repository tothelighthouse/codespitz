if(1){

    const stringCheck = [['',''], ['',''] ,['',''] ['','']];
    const el = {
        number: v=>v.toString(),
        boolean: v=>v.toString(),
        string:v=>stringCheck.reduce((acc, curr)=>
            acc.replace(curr[0], curr[1]), v
        ),
        stringify(v){
            return this[typeof v]?.(v) ?? 'null';
        }
    }
    const arrValidator = arr=>{if(!Array.isArray(arr)) throw 'invalid arr';}
    const EMPTY = {};

    const recursive = (arr, acc, i) => i < arr.length ? recursive(arr, acc + `,${el.stringify(arr[i])}`, i + 1 ) : `[${acc.substr(1)}]`;

    const stringify = arr=>{
        arrValidator(arr);

        let result = EMPTY;

        if(arr.length === 0) result = '[]';
        else{
            let acc = '', i=0;
            while(i < arr.length){
                acc = acc + `,${el.stringify(arr[i])}`
                i = i + 1
            }
            result = `[${acc.substr(1)}]`
        }

        if(result === EMPTY) throw 'no processed';

        return result;
    }

    const result = stringify([1,2,3])
    console.log(result)
}





