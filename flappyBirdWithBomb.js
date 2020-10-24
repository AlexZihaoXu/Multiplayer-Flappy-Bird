const SERVER_ADDRESS = 'ws://localhost:8080/';

function warn(message) {
    let element = document.getElementById('warn');
    element.hidden = false;
    element.textContent = message;
    console.warn(message);
}

function riseName() {
    document.getElementById('nameLabel').style.transform = "translateY(0)";
    document.getElementById('nameLabel').style.color = 'white';
}

function restoreName() {
    if (document.getElementById('name').value === '') {
        document.getElementById('nameLabel').style.transform = "translateY(25px)";
        document.getElementById('nameLabel').style.color = 'black';
    }
}

function now() {
    return new Date().getTime();
}


function checkValid() {
    let element = document.getElementById('name');
    let name = element.value;
    if (name === '') {
        warn("You can't leave the name blank!");
        element.style.borderBottomColor = "#ffbf00";
        return false;
    } else if (!('"'+name+'"').match('"[a-zA-Z0-9_]{1,12}"')) {
        if (name.length > 12) {
            warn("Name length can't be greater than 12!");
            element.style.borderBottomColor = "#ff3c00";
        } else {
            warn("You may only use english characters, numbers, and underscores as your name!");
            element.style.borderBottomColor = "#ff3c00";
        }
    } else {
        element.style.borderBottomColor = "#28cb00";
        document.getElementById('warn').hidden = true;
        return true;
    }
    return false;
}

function startGame() {
    let name = document.getElementById('name').value;
    if (!checkValid())
        return;
    console.log("Checking server ...");
    const client = new WebSocket(SERVER_ADDRESS);
    let valid = null;
    client.onopen = function () {
        client.send("LOGIN/" + name + "/TMP");
    }
    setTimeout(function () {
        if (valid === null)
            warn('Timeout.');
    }, 1500);
    client.onmessage = function (evt) {
        valid = evt.data === 'true';
        client.close();
        if (valid) {
            document.getElementById('content').style.transform = 'translateY(-1000px)';

            setTimeout(
                () => {
                    main(name)
                },
                200
            )
        } else {
            warn(name + ' is already in this server!');
        }
    }



}

// Load Assets and base structures

const RES = new Image();
RES.src = "bundle.png";
const RES_INFO = {"textures/number/scoreboard/1.png": {"x": 0, "y": 0, "w": 20, "h": 40}, "textures/number/scoreboard/9.png": {"x": 20, "y": 0, "w": 28, "h": 40}, "textures/number/scoreboard/8.png": {"x": 48, "y": 0, "w": 28, "h": 40}, "textures/number/scoreboard/7.png": {"x": 76, "y": 0, "w": 28, "h": 40}, "textures/number/scoreboard/6.png": {"x": 104, "y": 0, "w": 28, "h": 40}, "textures/number/scoreboard/5.png": {"x": 132, "y": 0, "w": 28, "h": 40}, "textures/number/scoreboard/4.png": {"x": 160, "y": 0, "w": 28, "h": 40}, "textures/number/scoreboard/3.png": {"x": 188, "y": 0, "w": 28, "h": 40}, "textures/number/scoreboard/2.png": {"x": 216, "y": 0, "w": 28, "h": 40}, "textures/number/scoreboard/0.png": {"x": 244, "y": 0, "w": 28, "h": 40}, "textures/grenade.png": {"x": 272, "y": 0, "w": 32, "h": 32}, "textures/number/game/1.png": {"x": 304, "y": 0, "w": 32, "h": 72}, "textures/number/game/9.png": {"x": 336, "y": 0, "w": 48, "h": 72}, "textures/number/game/8.png": {"x": 384, "y": 0, "w": 48, "h": 72}, "textures/number/game/7.png": {"x": 432, "y": 0, "w": 48, "h": 72}, "textures/number/game/6.png": {"x": 480, "y": 0, "w": 48, "h": 72}, "textures/number/game/5.png": {"x": 528, "y": 0, "w": 48, "h": 72}, "textures/number/game/4.png": {"x": 576, "y": 0, "w": 48, "h": 72}, "textures/number/game/3.png": {"x": 624, "y": 0, "w": 48, "h": 72}, "textures/number/game/2.png": {"x": 672, "y": 0, "w": 48, "h": 72}, "textures/number/game/0.png": {"x": 720, "y": 0, "w": 48, "h": 72}, "textures/new.png": {"x": 768, "y": 0, "w": 64, "h": 28}, "textures/birds/right/2/2.png": {"x": 832, "y": 0, "w": 68, "h": 48}, "textures/birds/right/2/1.png": {"x": 0, "y": 72, "w": 68, "h": 48}, "textures/birds/right/2/0.png": {"x": 68, "y": 72, "w": 68, "h": 48}, "textures/birds/right/1/2.png": {"x": 136, "y": 72, "w": 68, "h": 48}, "textures/birds/right/1/1.png": {"x": 204, "y": 72, "w": 68, "h": 48}, "textures/birds/right/1/0.png": {"x": 272, "y": 72, "w": 68, "h": 48}, "textures/birds/right/0/2.png": {"x": 340, "y": 72, "w": 68, "h": 48}, "textures/birds/right/0/1.png": {"x": 408, "y": 72, "w": 68, "h": 48}, "textures/birds/right/0/0.png": {"x": 476, "y": 72, "w": 68, "h": 48}, "textures/birds/left/2/2.png": {"x": 544, "y": 72, "w": 68, "h": 48}, "textures/birds/left/2/1.png": {"x": 612, "y": 72, "w": 68, "h": 48}, "textures/birds/left/2/0.png": {"x": 680, "y": 72, "w": 68, "h": 48}, "textures/birds/left/1/2.png": {"x": 748, "y": 72, "w": 68, "h": 48}, "textures/birds/left/1/1.png": {"x": 816, "y": 72, "w": 68, "h": 48}, "textures/birds/left/1/0.png": {"x": 884, "y": 72, "w": 68, "h": 48}, "textures/birds/left/0/2.png": {"x": 0, "y": 120, "w": 68, "h": 48}, "textures/birds/left/0/1.png": {"x": 68, "y": 120, "w": 68, "h": 48}, "textures/birds/left/0/0.png": {"x": 136, "y": 120, "w": 68, "h": 48}, "textures/pipes/up.png": {"x": 204, "y": 120, "w": 104, "h": 589}, "textures/pipes/down.png": {"x": 308, "y": 120, "w": 104, "h": 589}, "textures/logo.png": {"x": 412, "y": 120, "w": 384, "h": 88}, "textures/background/night.png": {"x": 0, "y": 709, "w": 436, "h": 644}, "textures/background/impossible.png": {"x": 436, "y": 709, "w": 436, "h": 644}, "textures/background/day.png": {"x": 0, "y": 1353, "w": 436, "h": 644}, "textures/ground.png": {"x": 0, "y": 1997, "w": 960, "h": 28}, "textures/bottom.png": {"x": 0, "y": 2025, "w": 960, "h": 50}};
const camera = {
    x: 0,
    y: -500,
    z: 0.6,
    target: {
        x: 0,
        y: 0,
        z: 1
    },
    update: function () {
        this.x += (this.target.x - this.x) / 15;
        this.y += (this.target.y - this.y) / 15;
        this.z += (this.target.z - this.z) / 15;
    }
}

function sleep(sleepDuration) {
    let now = new Date().getTime();
    while (new Date().getTime() < now + sleepDuration){}

}

// Constant Settings
const update_rate = 128;

// Initialization
let WIN_WIDTH = innerWidth;
let WIN_HEIGHT = innerHeight;
let GLOBAL_SCALE = 1.0;

// System Variables
let _last_loop = 0;
let _update_per_loop = 1;
let _display_fps = 0;
let fps = 0;
let playerColor = 0;
//

function Rect(x, y, w, h) {
    return {
        x: x,
        y: y,
        w: w,
        h: h,
        left: x,
        right: x + w,
        top: y,
        bottom: y + h,
        centerx: x - w / 2,
        centery: y - h / 2
    }
}

function rand(a, b) {
    return Math.floor(a + Math.random()*(b - a));
}

function switchColor() {
    playerColor = (playerColor + 1) % 3;
    document.getElementById("color").style.background = ['gold', '#add9f8', '#ff4800'][playerColor];
}

function imgRect(path, x, y) {
    let w = RES_INFO['textures/' + path]['w'];
    let h = RES_INFO['textures/' + path]['h'];
    return Rect(
        (x - camera.x - w/2) * GLOBAL_SCALE * camera.z + WIN_WIDTH / 2 * GLOBAL_SCALE,
        (y - camera.y - h/2) * GLOBAL_SCALE * camera.z + WIN_HEIGHT / 2 * GLOBAL_SCALE,
        w * GLOBAL_SCALE * camera.z,
        h * GLOBAL_SCALE * camera.z
    )
}

function trueX(x, extraZ=1) {
    return (x - camera.x) * GLOBAL_SCALE * camera.z * extraZ + WIN_WIDTH / 2 * GLOBAL_SCALE;
}

function trueY(y, extraZ=1) {
    return (y - camera.y) * GLOBAL_SCALE * camera.z * extraZ + WIN_HEIGHT / 2 * GLOBAL_SCALE;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function main(name) {
    console.log("Signed in as " + name);
    let all_elements = document.body.childNodes;

    for (let i = all_elements.length - 1; i >= 0 ;i--){
        document.body.removeChild(all_elements[i]);
    }

    const cvs = document.createElement("canvas");
    document.body.appendChild(cvs);
    const view = cvs.getContext('2d');

// Configure Page Outlook
    document.body.style.margin = '0';
    document.body.style.background = 'black';
    cvs.style.margin = 'auto';
    cvs.style.display = 'block';
    cvs.style.position = 'fixed';

    function render(path, x, y) {
        const rect = imgRect(path, x, y);
        view.drawImage(
            RES,
            RES_INFO['textures/' + path]['x'],
            RES_INFO['textures/' + path]['y'],
            RES_INFO['textures/' + path]['w'],
            RES_INFO['textures/' + path]['h'],
            rect.x,
            rect.y,
            rect.w,
            rect.h
        )
    }
    const pressing = {
        up: false,
        down: false,
        left: false,
        right: false,
        space: false,
        leftShift: false
    }
    let particles = [];

    const gameObj = {
        renderBg: function (x = 0, y = 0) {
            render('background/day.png', x, y);

        },
        renderGround: function (x = 0, y = 0) {
            render('ground.png', x, y);
        },
        particle: function (x, y, deltaX=0, deltaY=0, color='#ffffff', size=4, lifetime=1000) {
            return {
                x: x,
                y: y,
                deltaX: deltaX + (rand(0, 10) - 5) / 5,
                deltaY: deltaY + (rand(0, 10) - 5) / 5,
                color: color,
                birthday: now(),
                size: 4,
                lifetime: lifetime,
                render: function () {
                    const size = this.size * camera.z * GLOBAL_SCALE;
                    view.fillStyle = color;
                    view.fillRect(trueX(this.x), trueY(this.y), size, size);
                    this.size *= 0.99;
                },
                update: function () {
                    this.y += this.deltaY;
                    this.x += this.deltaX;

                    this.deltaX *= 0.98;
                    this.deltaY += 0.1;
                    if (this.y > 320) {
                        this.deltaY = -this.deltaY / 2;
                        this.y = 320;
                    }
                }
            }
        },
        border: {
            left: -2000,
            right: 2000,
            top: -2000
        },
        bird: function (name="Bird", x=0, y=0, color=0, health=1, direction=true) {
            return {
                name: name,
                x: x,
                y: y,
                direction: direction,
                color: color,
                hp: health,
                animateSpeed: 150,
                lag: 1,
                target: {
                    x: x,
                    y: y,
                },
                __enabled_time: now(),
                update: function () {
                    if (this.target.x > gameObj.border.right) {
                        this.target.x = gameObj.border.right - 1;
                    }
                    if (this.target.x < gameObj.border.left) {
                        this.target.x = gameObj.border.left + 1;
                    }
                    if (this.target.y < gameObj.border.top) {
                        this.target.y = gameObj.border.top + 1;
                    }

                    let deltaX = (this.target.x - this.x);
                    let deltaY = (this.target.y - this.y);
                    let ground = this === player ? 300: 290;
                    if (this !== player) {
                        deltaX *= 0.5;
                    }
                    if (this.y > ground && deltaY < -1) {
                        for (let i = 0; i < (this === player ?5:2); i++) {
                            particles.push(gameObj.particle(this.x, this.y + 20, deltaX, deltaY, ['gold', "#1ca3cb", "#cf320a"][this.color], 1, 5000));
                        }
                    }
                    if (this.y > ground && Math.abs(deltaX) > 1 && rand(0, 2) === 0)
                        particles.push(gameObj.particle(this.x, this.y+20, -deltaX, deltaY-1.4, rand(0, 3) === 0?['gold', "#1ca3cb", "#cf320a"][this.color]:"#944120", 2, 3000));
                    this.x += (this.target.x - this.x) / this.lag;
                    this.y += (this.target.y - this.y) / this.lag;
                },
                render: function () {
                    const frames = this.direction ? [
                        "birds/right/"+this.color.toString()+"/0.png",
                        "birds/right/"+this.color.toString()+"/1.png",
                        "birds/right/"+this.color.toString()+"/2.png",
                        "birds/right/"+this.color.toString()+"/1.png"
                    ] : [
                        "birds/left/"+this.color.toString()+"/0.png",
                        "birds/left/"+this.color.toString()+"/1.png",
                        "birds/left/"+this.color.toString()+"/2.png",
                        "birds/left/"+this.color.toString()+"/1.png"
                    ];
                    render(
                        frames[Math.floor((now() - this.__enabled_time) / this.animateSpeed) % 4],
                        this.x, this.y
                    );
                    gameObj.renderText(this.name, this.x, this.y - 35, 20);
                    gameObj.renderText(Math.floor(this.hp*100)+'%', this.x, this.y - 22, 13, '#55ff00');

                }
            };
        },
        renderText: function (text, x, y, size=16, color='white') {
            view.font = Math.round(size*GLOBAL_SCALE*camera.z)+"px PixelOperator8";
            const w = size * text.length;
            const h = size;
            view.fillStyle = 'grey';
            view.fillText(text, (x - camera.x - w/2) * GLOBAL_SCALE * camera.z + WIN_WIDTH / 2 * GLOBAL_SCALE,
                (y - camera.y - h/2) * GLOBAL_SCALE * camera.z + WIN_HEIGHT / 2 * GLOBAL_SCALE,);
            view.fillStyle = color;
            view.fillText(text, (x - camera.x - w/2 - 1) * GLOBAL_SCALE * camera.z + WIN_WIDTH / 2 * GLOBAL_SCALE,
                (y - camera.y - h/2 - 1) * GLOBAL_SCALE * camera.z + WIN_HEIGHT / 2 * GLOBAL_SCALE,);
        },
        localController: function() {
            return {
                bird: gameObj.bird(name, 0, 0, playerColor),
                deltaY: 0,
                deltaX: 0,
                update: function () {
                    camera.target.x = this.bird.target.x;
                    camera.target.y = this.bird.target.y;
                    if (this.bird.target.y > 300) {

                        this.bird.target.y = 300;
                        this.deltaY = this.deltaY > 0.3 ? -this.deltaY / 1.5:0;
                    }
                    if (pressing.left) {
                        this.deltaX = Math.max(this.deltaX - 0.1, -5.2);
                        this.bird.direction = false;
                    }
                    if (pressing.right) {
                        this.deltaX = Math.min(this.deltaX + 0.1, 5.2);
                        this.bird.direction = true;
                    }
                    if (pressing.up) {
                        this.deltaY = Math.min(this.deltaY - 0.11, 5);
                    }
                    if (pressing.down){
                        this.deltaY = Math.max(this.deltaY + 0.08, -3);
                    }
                    this.bird.animateSpeed += ((300 - Math.abs(Math.abs(this.deltaX) - 2.5) * 25) - this.bird.animateSpeed) / 60;
                    this.deltaY = Math.max(this.deltaY + 0.013 * (5.1-Math.abs(this.deltaX)), -3);

                    camera.target.z = 0.94 + (5.5 - Math.abs(this.deltaX)) * 0.03;

                    this.bird.target.y += this.deltaY;
                    this.bird.target.x += this.deltaX;
                    if (this.bird.target.y > 298) {
                        this.deltaX *= 0.95;
                                            }
                    else {
                        if (this.deltaX > 0) {
                            this.deltaX -= 0.01;
                        } else {
                            this.deltaX += 0.01;
                        }
                    }
                }
            }
        }
    };

    let stars = [];
    for (let i = 0; i < 100; i++) {
        stars.push({
            x: rand(gameObj.border.left, gameObj.border.right),
            y: rand(gameObj.border.top, gameObj.border.top - gameObj.border.top * 0.8),
            z: rand(80, 90) * 0.01,
        });
    }
    for (let i = 0; i < 100; i++) {
        stars.push({
            x: rand(gameObj.border.left, gameObj.border.right),
            y: rand(gameObj.border.top, gameObj.border.top - gameObj.border.top * 0.5),
            z: rand(80, 90) * 0.01,
        });
    }
    for (let i = 0; i < 100; i++) {
        stars.push({
            x: rand(gameObj.border.left, gameObj.border.right),
            y: rand(gameObj.border.top, gameObj.border.top - gameObj.border.top * 0.3),
            z: rand(80, 90) * 0.01,
        });
    }

    const controller = gameObj.localController();
    const player = controller.bird;
    let birds = [player];
    let birdsIndex = [player.name];
    const server = {
        client: new WebSocket(SERVER_ADDRESS),
        name: name,
        connect: async function () {
            const client = this.client;
            const name = this.name;
            this.client.onopen = async function () {
                client.send("LOGIN/"+name+"/"+player.color);
                let lastX = 0;
                let lastY = 0;
                let lastAnimateSpeed = 1;
                while (client.OPEN) {
                    await delay(1000/25);
                    if (lastX !== Math.round(player.x) || lastY !== Math.round(player.y) || lastAnimateSpeed !== Math.round(player.animateSpeed)) {
                        lastX = Math.round(player.x);
                        lastY = Math.round(player.y);
                        lastAnimateSpeed = Math.round(player.animateSpeed);
                        client.send("MOV/" + lastX + "/" + lastY + "/" + (player.direction?1:0).toString() + "/" + lastAnimateSpeed);
                    }
                }
                console.log("Stopped");
            }
            client.onmessage = function (evt) {
                const rawText = evt.data;
                const prefix = rawText.split('/')[0];
                const info = rawText.split('/').slice(1);
                if (prefix === 'LOG') {
                    console.log(info.join('/'));
                } else if (prefix === 'REG') {
                    let newBird = gameObj.bird(info[0], 0, 0, parseInt(info[1]));
                    newBird.lag = 5.5;
                    birds.push(newBird);
                    birdsIndex.push(info[0]);
                } else if (prefix === 'MOV') {
                    const updating = birds[birdsIndex.indexOf(info[0])];
                    updating.target.x = parseInt(info[1]);
                    updating.target.y = parseInt(info[2]);
                    updating.animateSpeed = parseInt(info[4]);
                    updating.direction = info[3] === '1';
                } else if (prefix === 'LEV') {
                    const index = birdsIndex.indexOf(info[0]);
                    birds.splice(index, 1);
                    birdsIndex.splice(index, 1);
                } else if (prefix === 'BDR') {
                    gameObj.border.left = parseInt(info[0]);
                    gameObj.border.right = parseInt(info[1]);
                    gameObj.border.top = parseInt(info[2]);
                }
            }
            client.onclose = function () {
                alert("You lost connection. ");
            }
        }
    }
    server.connect();

    window.addEventListener('keydown', function (evt) {
        switch (evt.code) {
            case "ArrowUp":
                pressing.up = true;
                break;
            case "ArrowDown":
                pressing.down = true;
                break;
            case "ArrowLeft":
                pressing.left = true;
                break;
            case "ArrowRight":
                pressing.right = true;
                break;
            case "Space":
                pressing.space = true;
                break;
            case "ShiftLeft":
                pressing.leftShift = true;
                break;
            default:
                break;
        }
    }, true)

    window.addEventListener('keyup', function (evt) {
        switch (evt.code) {
            case "ArrowUp":
                pressing.up = false;
                break;
            case "ArrowDown":
                pressing.down = false;
                break;
            case "ArrowLeft":
                pressing.left = false;
                break;
            case "ArrowRight":
                pressing.right = false;
                break;
            case "Space":
                pressing.space = false;
                break;
            case "ShiftLeft":
                pressing.leftShift = false;
                break;
            default:
                break;
        }
    }, true)

    function renderObjects() {
        for (const bird of birds) {
            bird.render();
        }
        for (const particle of particles) {
            particle.render();
        }
    }

    function draw() {
        let rect = imgRect('background/day.png', 0, 0)
        view.imageSmoothingEnabled = false;

        // Rendering Background
        // - Pure Color Background
        if (rect.bottom - 1 < cvs.height) {
            view.fillStyle = '#ded895';
            view.fillRect(
                0,
                rect.bottom - 1,
                cvs.width,
                cvs.height - rect.bottom
            );
        }
        function toHex(n) {
            let result = Math.floor(n).toString(16);
            return result.length === 1 ? '0' + result : result;
        }
        let brightness = Math.max(0, 1 + Math.max(0,rect.bottom - rect.h * 4 - player.y) / gameObj.border.top / 1.05);
        view.fillStyle = '#' + toHex(112 * brightness) + toHex(197 * brightness) + toHex(Math.max(50, 206 * brightness));
        view.fillRect(
            0,
            0,
            cvs.width,
            rect.top + 1
        );
        let unitSize = 436;
        for (let i = 0; i < WIN_WIDTH / (unitSize * camera.z) + 1; i++) {
            gameObj.renderBg(unitSize * i + camera.x - (camera.x % unitSize), 0);
            gameObj.renderBg(-unitSize * i + camera.x - (camera.x % unitSize), 0);
        }
        unitSize = 960;
        for (let i = 0; i < WIN_WIDTH / (unitSize * camera.z) + 1; i++) {
            gameObj.renderGround(unitSize * i + camera.x - (camera.x % unitSize), 322 + 14);
            gameObj.renderGround(-unitSize * i + camera.x - (camera.x % unitSize), 322 + 14);
        }

        view.fillStyle = 'white';
        for (const star of stars) {
            view.fillRect(
                trueX(star.x, star.z),
                trueY(star.y),
                2,
                2
            )
        }

        renderObjects();
        // Border
        view.fillStyle = "#ff0000"+Math.max(10, (11+Math.floor(70 * (1 - (gameObj.border.right - player.x)/1000))));
        view.fillRect(trueX(gameObj.border.right), 0, cvs.width-trueX(gameObj.border.right), cvs.height);

        view.fillStyle = "#ff0000"+Math.max(10, (11+Math.floor(70 * (1 - (player.x - gameObj.border.left)/1000))));
        view.fillRect(0, 0, trueX(gameObj.border.left), cvs.height);

        view.fillStyle = "#ff0000"+Math.max(10, (11+Math.floor(70 * (1 - (player.y - gameObj.border.top)/1000))));
        view.fillRect(0, 0, cvs.width, trueY(gameObj.border.top));

        //
        view.font = Math.round(24*GLOBAL_SCALE)+"px PixelOperator8";
        view.fillStyle = 'grey';
        view.fillText("FPS: " + Math.round(_display_fps * 10) / 10, 6 * GLOBAL_SCALE, 36 * GLOBAL_SCALE);
        view.fillStyle = 'white';
        view.fillText("FPS: " + Math.round(_display_fps * 10) / 10, 5 * GLOBAL_SCALE, 35 * GLOBAL_SCALE);
    }

    function update() {
        cvs.width = innerWidth;
        cvs.height = innerHeight;
        GLOBAL_SCALE = cvs.height / 722;
        WIN_WIDTH = cvs.width / GLOBAL_SCALE;
        WIN_HEIGHT = cvs.height / GLOBAL_SCALE;
        _display_fps += (fps - _display_fps) / 10;
        controller.update();
        for (const bird of birds){
            bird.update();
        }
        let deletable = [];
        for (const particle of particles) {
            particle.update();
            if (now() - particle.birthday > particle.lifetime) {
                deletable.push(particle);
            }
        }
        while (deletable.length > 0) {
            particles.splice(particles.indexOf(deletable.pop()), 1);
        }
        camera.update();
    }

    function loop() {
        fps = 1000 / (now() - _last_loop);
        let update_count = fps * _update_per_loop;
        _last_loop = now();
        if (update_count < update_rate) {
            _update_per_loop++;
        } else {
            if (_update_per_loop > 1)
                _update_per_loop--;
        }
        for (let i = 0; i < _update_per_loop; i++) {
            update();
        }
        draw();


        requestAnimationFrame(loop);
    }

    function runGame() {
        requestAnimationFrame(loop);
    }

    runGame();
}