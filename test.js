let canvas
let coolAnimation 
function setup() {
    canvas = CreateFullCanvas()
    InitializeShadows()
    coolAnimation = new Animation([
        "https://media.istockphoto.com/photos/small-shrinking-currency-dollar-in-inflation-on-white-background-picture-id174672992?b=1&k=20&m=174672992&s=170667a&w=0&h=b-CcObjDfgFS4qFbnJM5GEKwO9vSU3Ckanfo9nVI7o4=",
        "https://media.istockphoto.com/photos/big-and-small-picture-id172759822?b=1&k=20&m=172759822&s=170667a&w=0&h=kkmaR2OYuS14rTiEotbzXoBecwnRePNC79Jsgl3M4dY=",
        "https://yt3.ggpht.com/ytc/AKedOLStYivqi6PWtFuYblFWPmN7ec3UTDUx0Fp-Y_7N3A=s900-c-k-c0x00ffffff-no-rj",
    ], function() {
        square1.animation = coolAnimation
    })
}
let mainStage = new Stage("main stage")
SetCurrentStage("main stage")
let square1 = new SpriteObject(window.innerWidth / 2, window.innerHeight / 2, 200, 200)
square1.addToStage(mainStage)   
square1.speed = 5
square1.scale = 0.3

function draw() {
    background("white")
    square1.pointTowards(mouseX, mouseY)
    square1.movingTowards = {
        x: mouseX,
        y: mouseY
    }
    Update()
}