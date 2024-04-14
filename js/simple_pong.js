// ノードを取得
const canvas = document.getElementById("pongcanvas");
// 2dの描画コンテキストにアクセスできるように
// キャンバスに描画するために使うツール
const ctx = canvas.getContext("2d");
var state = 1;
var ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    dx: 2,
    dy: 2,
    Radius: 10,
};
//右
var paddle1 = {
    x: (canvas.width - 10),
    y: (canvas.height - 75) / 2,
    Height: 75,
    Width: 10,
};
// 左
var paddle2 = {
    x: 0,
    y: (canvas.height - 75) / 2,
    Height: 75,
    Width: 10,
};
function mouseMoveHandler(e) {
    // relativeYはマウスの相対的な位置->特定の要素内でのカーソルの位置
    // e.clientYはマウスの絶対的な位置->Webページの左端からカーソルまで
    var relativeY = e.clientY - canvas.offsetTop;
    if (relativeY > 0 && relativeY < canvas.height) {
        paddle1.y = relativeY - paddle1.Width / 2;
        paddle2.y = relativeY - paddle2.Width / 2;
    }
}
function drawBall(obj) {
    ctx.beginPath();
    ctx.arc(obj.x, obj.y, obj.Radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}
function drawPaddle(obj) {
    ctx.beginPath();
    ctx.rect(obj.x, obj.y, obj.Width, obj.Height);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}
function collisionDetection() {
    // この関数をpaddleに当たったかを判定する関数に修正する
    // canvasの左半分か右半分かで処理を分岐する
    // 左
    if (ball.x - ball.Radius < paddle2.Width) {
        // paddle2の幅の範囲内にballがあるかを確認する
        if (ball.y > paddle2.y && ball.y < paddle2.y + paddle2.Height) {
            ball.dx = -ball.dx;
        }
        else {
            state = 0;
        }
    }
    // 右
    else if (ball.x + ball.Radius > canvas.width - paddle1.Width) {
        if (ball.y > paddle1.y && ball.y < paddle1.y + paddle1.Height) {
            ball.dx = -ball.dx;
        }
        else {
            state = 0;
        }
    }
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(ball);
    drawPaddle(paddle1);
    drawPaddle(paddle2);
    if (state === 1) {
        collisionDetection();
    }
    if (ball.y + ball.dy > canvas.height - ball.Radius ||
        ball.y + ball.dy < ball.Radius) {
        ball.dy = -ball.dy;
    }
    if (ball.x < ball.Radius || ball.x > canvas.width - ball.Radius) {
        alert('GAME OVER');
        // document.location.reload();
        clearInterval(interval);
    }
    ball.x += ball.dx;
    ball.y += ball.dy;
}
// document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);
// マウスの動きを検知する
document.addEventListener('mousemove', mouseMoveHandler, false);
var interval = setInterval(draw, 10);
