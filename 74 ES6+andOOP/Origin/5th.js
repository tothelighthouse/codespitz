const Stage = class{
    clear(){
        this.stage = 0;
        this.next();
    }
    _speed(){this.speed = 500 - 450 * this.stage / Stage.max;}
    _count(){this.count = 10 + 3 * this.stage;}
    next(){
        if(this.stage++ < Stage.max){
            this._speed();
            this._count();
        }
    }
    [Symbol.toPrimitive](h){return this.stage;}
};
const Score = class{
    clear(){this.curr = this.total = 0;}
    add(line, stage){
        const score = parseInt((stage * 5) * (2 **line));
        this.curr += score, this.total += score;
    }
    [Symbol.toPrimitive](h){return `${this.curr},${this.total}`;}
};

// ==================================================================================
// ==================================================================================

const Block =(_=>{
    const s =v=>v.split(',').map(v=>v.split('|').map(v=>v.split('')));
    const c =(c,b)=>class extends Block{constructor(){super(c, b);}};
    const Block = class{
        static block(){
            return new (this.blocks[parseInt(Math.random() * this.blocks.length)]);
        }
        constructor(color, blocks){
            Object.assign(this, {color:'#'+color, blocks:s(blocks), rotate:0});
        }
        left(){if(--this.rotate < 0) this.rotate = 3;}
        right(){if(++this.rotate > 3) this.rotate = 0;}
        get block(){return this.blocks[this.rotate];}
    };
    Block.blocks = [
        '00C3ED-1|1|1|1,1111,1|1|1|1,1111',
        'FBD72B-11|11,11|11,11|11,11|11',
        'B84A9C-010|111,10|11|10,111|010,01|11|01',
        '00FF24-011|110,10|11|01,011|110,10|11|01',
        'FF1920-110|011,01|11|10,110|011,01|11|10',
        '2900FC-100|111,11|10|10,111|001,01|01|11',
        'FD7C31-001|111,10|10|11,111|100,11|01|01'
    ].map(v=>c(...v.split('-')));
    return Block;
})();

// ==================================================================================
// ==================================================================================

const Data = class extends Array{
    constructor(r, c){super();Object.assign(this, {r, c})}
    cell(r, c, color, test){
        if(r > this.r || c > this.c || r < 0 || c < 0 || color == '0') return this;
        const row = this[r] || (this[r] = []);
        if(color && row[c]) test.isIntersacted = true;
        row[c] = color;
        return this;
    }
    row(row, ...color){return color.forEach((v, i)=>this.cell(row, i, v)), this;}
    all(...rows){return rows.forEach((v, i)=>this.row(i, ...v)), this;}
};
// ==================================================================================
// ==================================================================================

// data
// ?????????????????? ??? ????????????
const Renderer = class{
    constructor(col, row, base, back){
        Object.assign(this, {col, row, base, back, blocks:[]});
    }
    clear(){throw 'override';}
    render(v){
        if(!(v instanceof Data)) throw 'invalid';
        this._render(v);
    }
    _render(v){throw 'override';}
};
// ==================================================================================
// ==================================================================================

const TableRenderer =(_=>{
    const el = v=>document.createElement(v);
    const add = (p, c)=>p.appendChild(typeof c == 'string' ? el(c) : c);
    const back = (s, v)=>s.backgroundColor = v;
    return class extends Renderer{
        constructor(col, row, back){
            super(col, row, el('table'), back);
            const {base, blocks} = this;
            let {row:i} = this;
            while(i--){
                const curr = [], tr = add(base, 'tr');
                let j = col;
                blocks.push(curr);
                while(j--) curr.push(add(tr, 'td').style);
            }
        }
        clear(){this.blocks.forEach(v=>v.forEach(s=>back(s, this.back)));}
        _render(v){this.blocks.forEach((c,i)=>c.forEach((s,j)=>back(s, v[i][j])));}
    };
})();

// ==================================================================================
// ==================================================================================
const t = new TableRenderer(5, 5,'#000');
t.base.style.cssText = `
width:100px;height:100px;border:0px;
border-spacing:0;border-collapse:collapse
`;
document.body.appendChild(t.base);
t.render(new Data(5,5).all(
    ['#0f0','#f00','#00f','#ff0', '#0ff'],
    ['#00f','#f00','#ff0', '#0ff','#0f0'],
    ['#f00','#ff0', '#0ff','#0f0','#00f'],
    ['#ff0', '#0ff','#0f0','#f00','#00f'],
    ['#f00','#0f0','#ff0', '#0ff','#00f']
));
// ==================================================================================
// ==================================================================================
const Panel = class{
    static get(game, init, render){
        const p = new Panel();
        return p.init(game, init(game), render), p;
    }
    init(game, base, r){
        Object.assign(this, {base, game, r});
    }
    render(v){this.r(this.game, v);}
};
// <div id="stageIntro">
//     <div>Stage</div>
//     <div class="stage"></div>
// </div>
Panel.get(game,
    game=>sel('#stageIntro'),
    (game, v)=>{
        sel('#stageIntro .stage').innerHTML = v;
        setTimeout(_=>game.setState(Game.play), 500);
    }
);
// ==================================================================================
// ==================================================================================

const s = {}; 'title,stageIntro,play,dead,stageClear,clear,ranking'.split(',').forEach(v=>s[v] = Symbol()); const Game = class{ constructor(base, col, row, ...v){ tetris
    Object.assign(this, {base, col, row, state:{}, curr:'title', score:new Score, stage:new Stage});
    let i = 0;
    while(i < v.length) this.state[v[i++]] = Panel.get(this, v[i++], v[i++]);
}
    setState(state){
        if(!Object.values(s).includes(state)) throw 'invalid';
        this.curr = state;
        const {state:{[this.curr]:{base:el}}} = this;
        this.base.innerHTML = '';
        this.base.appendChild(el);
        el.style.display = 'block';
        this[this.curr]();
    }
    _render(v){
        const {state:{[this.curr]:base}} = this;
        base.render(v);
    }
};
Object.entries(s).forEach(([k,v])=>Game[k]=v);
Object.freeze(Game);
// [s.title](){
//     this.stage.clear();
//     this.score.clear();
// }
// [s.stageIntro](){
//     this._render(this.stage.stage);
// }
// [s.play](){}
// [s.stageClear](){}
// [s.dead](){}
// [s.clear](){}
// [s.ranking](){}
// ==================================================================================
// ==================================================================================

const sel = s=>document.querySelector(s);
const game = new Game(
    sel('body'), 10, 20,
    Game.title,
    game=>{
        sel('#title .btn').onclick =_=>game.setState(Game.stageIntro);
        return sel('#title');
    },
    null,
    Game.stageIntro,
    game=>sel('#stageIntro'),
    (game, v)=>{
        sel('#stageIntro .stage').innerHTML = v;
        setTimeout(_=>game.setState(Game.play), 500);
    }
);
game.setState(Game.title);

const game = new Game(
    sel('body'), 10, 20,...
        Game.play,
    game=>{
        const t = new TableRenderer(game.col, game.row, '#000');
        sel('#play').appendChild(t.base);
        sel('#play').renderer = t;
        return sel('#play');
    },
    v=>{
        switch(true){
            case v instanceof Data:sel('#play').renderer.render(v); break;
            case v instanceof Block:
                v = v.block;
                const t = new TableRenderer(
                    v.reduce((p,v)=>v.length > p ? v.length : p, 0),
                    v.length,
                    'rgba(0,0,0,0)'
                );
                sel('#play .next').innerHTML = t.base.outHTML;
                t.render(new Data(5,5).all(...v.map(v=>v=='0'?'0':v.color)));
                break;
        }
    }
);
game.setState(Game.title);
// ==================================================================================
// ==================================================================================
