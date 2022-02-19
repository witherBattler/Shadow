let canvas
function setup() {
    canvas = CreateFullCanvas()
    InitializeShadows()
}

let mainStage = new Stage("main stage")
SetCurrentStage("main stage")

let mainObject = new RectObject(window.innerWidth / 2, window.innerHeight / 2, 200, 200)
mainObject.text = "Wow!! This works!!"
mainObject.addToStage(mainStage)
let torch = new Light(mainObject.x, mainObject.y, 200)
torch.attachToObject(mainObject)

function draw() {
    background("white")
    if(keyIsDown(65)) {
        mainObject.x -= 5
    }
    if(keyIsDown(68)) {
        mainObject.x += 5
    }
    mainStage.currentLight.strength = mainObject.x / width * 100
    Update()
}

