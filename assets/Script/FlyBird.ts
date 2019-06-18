// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    bird0: cc.Sprite = null

    @property(cc.Sprite)
    bird1: cc.Sprite = null

    @property(cc.Sprite)
    bird2: cc.Sprite = null

    @property(cc.Sprite)
    bird3: cc.Sprite = null

    @property(cc.Node)
    birdParent: cc.Node = null

    @property(cc.Node)
    bg0: cc.Node = null

    @property(cc.Node)
    bg1: cc.Node = null

    @property(cc.Node)
    pipeParent0: cc.Node = null

    @property(cc.Node)
    pipeParent1: cc.Node = null

    @property(cc.Node)
    pipeParent2: cc.Node = null

    @property(cc.Label)
    Source: cc.Label = null

    @property(cc.Node)
    gameOver: cc.Node = null

    @property(cc.Button)
    Start: cc.Button = null

    time: number = 0 // 距离上次切换显示的小鸟，流逝的时间
    speed: number = 0
    source: number = 0
    isGameStart: boolean = false

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        // cc.director.loadScene('helloworld') // 场景切换
        // const url = 'https://easy-mock.com/mock/5cf0b076d205e36f67612985/test/testXhr'
        // var xhr = cc.loader.getXMLHttpRequest()
        // xhr.onreadystatechange = () => {
        //     if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
        //         var response = xhr.responseText
        //         console.log(JSON.parse(response))
        //     }
        // }
        // xhr.open("GET", url, true)
        // xhr.send()

        let pipeStartOffsetX: number = 426
        let spaceX = (800 + 52) / 3
        this.pipeParent0.x = pipeStartOffsetX + spaceX * 0
        this.pipeParent1.x = pipeStartOffsetX + spaceX * 1
        this.pipeParent2.x = pipeStartOffsetX + spaceX * 2
    }

    update(dt: number) {
        this.time += dt
        if (this.time > 0.5) {
            if (this.bird0.node.active) {
                this.bird0.node.active = false
                this.bird1.node.active = true
            } else if (this.bird1.node.active) {
                this.bird1.node.active = false
                this.bird2.node.active = true
            } else if (this.bird2.node.active) {
                this.bird2.node.active = false
                this.bird3.node.active = true
            } else if (this.bird3.node.active) {
                this.bird3.node.active = false
                this.bird0.node.active = true
            }
            this.time = 0
        }

        if (this.isGameStart === false) {
            this.Start.node.active = true
            return
        } else {
            this.Start.node.active = false
        }

        // this.birdParent.y -= 2
        this.speed -= 0.1
        this.birdParent.y += this.speed
        this.birdParent.angle = this.speed * 10

        this.moveBg(this.bg0)
        this.moveBg(this.bg1)

        this.movePipe(this.pipeParent0)
        this.movePipe(this.pipeParent1)
        this.movePipe(this.pipeParent2)

        this.collisionDetection(this.birdParent, this.pipeParent0)
        this.collisionDetection(this.birdParent, this.pipeParent1)
        this.collisionDetection(this.birdParent, this.pipeParent2)
    }

    moveBg(bg: cc.Node) {
        bg.x--
        if (bg.x < -800) {
            bg.x = bg.x + 800 * 2
        }
    }

    movePipe(pipe: cc.Node) {
        pipe.x -= 3
        if (pipe.x < -427) {
            pipe.x = pipe.x + 800 + 52
            pipe.y = Math.random() * 200 - 100
            this.source++
            this.Source.string = this.source.toString()
        }
    }

    onButtonClick() {
        this.speed = 5
    }

    collisionDetection(bird: cc.Node, pipe: cc.Node) {
        if (bird.x + 17 < pipe.x - 26) {
            return
        }
        if (bird.x - 17 > pipe.x + 26) {
            return
        }
        if ((bird.y + 24 < pipe.y + 100) && (bird.y - 24 > pipe.y - 100)) {
            return
        }
        this.over()
    }

    onStartClick() {
        this.isGameStart = true
        this.reset()
    }

    over() {
        this.isGameStart = false
        this.gameOver.active = true
        this.Start.node.active = true
    }

    reset() {
        this.gameOver.active = false
        this.Start.node.active = false

        this.source = 0
        this.Source.string = this.source.toString()

        this.birdParent.x = 0
        this.birdParent.y = 0
        this.speed = 0

        let pipeStartOffsetX: number = 426
        let spaceX = (800 + 52) / 3
        this.pipeParent0.x = pipeStartOffsetX + spaceX * 0
        this.pipeParent1.x = pipeStartOffsetX + spaceX * 1
        this.pipeParent2.x = pipeStartOffsetX + spaceX * 2
    }
}
