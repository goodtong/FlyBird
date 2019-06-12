// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    bird0: cc.Sprite = null;

    @property(cc.Sprite)
    bird1: cc.Sprite = null;

    @property(cc.Sprite)
    bird2: cc.Sprite = null;

    @property(cc.Sprite)
    bird3: cc.Sprite = null;

    @property(cc.Node)
    birdParent: cc.Node = null;

    @property(cc.Node)
    bg0: cc.Node = null;

    @property(cc.Node)
    bg1: cc.Node = null;

    time: number = 0; // 距离上次切换显示的小鸟，流逝的时间

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    update(dt: number) {
        this.time += dt;
        if (this.time > 0.5) {
            if (this.bird0.node.active) {
                this.bird0.node.active = false;
                this.bird1.node.active = true;
            } else if (this.bird1.node.active) {
                this.bird1.node.active = false;
                this.bird2.node.active = true;
            } else if (this.bird2.node.active) {
                this.bird2.node.active = false;
                this.bird3.node.active = true;
            } else if (this.bird3.node.active) {
                this.bird3.node.active = false;
                this.bird0.node.active = true;
            }
            this.time = 0;
        }

        this.birdParent.y -= 2;

        this.bg0.x -= 1;
        this.bg1.x -= 1;
        // if (this.bg0.x < )
    }
}
