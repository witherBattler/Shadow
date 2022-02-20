let canvas
let coolAnimation 
function setup() {
    canvas = CreateFullCanvas()
    InitializeShadows()
    coolAnimation = new Animation([
        "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80",
        "https://www.logoworks.com/wp-content/uploads/2014/03/fruit-vegetable-logos-templates-logo-designs-037-1.png",
    ], 30, function() {
        console.log("wow..")
    })
}

let mainStage = new Stage("main stage")
SetCurrentStage("main stage")

let square1 = new CircleObject(window.innerWidth / 2, window.innerHeight / 2, 200, 200)
square1.text = "Heck yeah!! square1"
square1.addToStage(mainStage)
let square2 = new RectObject(window.innerWidth / 2, window.innerHeight / 2, 200, 200)
square2.text = "Wow!! square2"
square2.addToStage(mainStage)


function draw() {
    background("white")
    Update()
}

