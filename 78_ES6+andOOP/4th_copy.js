const Stage = class {
    init(listener) {
        this.listener = listener
    }

    clear() {
        this.stage = 0
        this.next()
    }

    next() {
        if(this.stage++ < Stage.maxStage){
            this.speed = 500 - 450 * this.stage / Stage.maxStage;
            this.listener()
        }
    }
    [Symbol.toPrimitive](init){
        return `<div>Stage ${this.stage}</div>`;
    }
};
Stage.maxStage = 20


const Score = class  {
    init(listener){this.listener = listener}
    clear(){this.curr = this.total = 0;}
    add(line, stage){
        const score = parseInt((stage * 5) * (2 ** line));
        this.curr += score; this.total += score;
        this.listener()
    }
    [Symbol.toPrimitive]
}






























