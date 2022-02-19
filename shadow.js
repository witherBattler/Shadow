var defaultStage
var stageMap = {}
var allObjects = []
var allRectObjects = []
var fullCanvas = false
var currentStage = "default"
//shadow
let shadowOverlay
let shadowOverlayContext
let gradient
let additionalLightSources = []
function InitializeShadows() {
    shadowOverlay = createGraphics(width, height);
    shadowOverlayContext = shadowOverlay.drawingContext;
    shadowOverlay.noStroke();
}
function SetCurrentStage(name) {
    if(typeof name == "string") {
        currentStage = name
    } else {
        throw new TypeError("You need to pass a string as the name parameter for setCurrentStage.")
    }
}




function Stage(name) {
    this.objects = []
    this.groups = []
    this.lightSources = [

    ]
    this.currentLight = {
        color: {
            r: 0,
            g: 0,
            b: 0
        },
        strength: 50
    }
    stageMap[name] = this
    return this
}

function RectObject(x, y, width, height) {
    this.lightSources = []
    this.objectType = "rect"
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.text = ""
    this.textOffsetX = 0
    this.textOffsetY = 0
    this.textColor = "black"
    this.textStroke = "blue"
    this.textStrokeWeight = 0
    this.textSize = 20
    this.textFont = "Candara"
    this.stroke = "black"
    this.strokeWeight = 0
    this.shapeColor = "grey"
    this.state = {}
    this.scale = 1
    this.addToStage = function(stage) {
        stage.objects.push(this)
    }
    this.addToGroup = function(group) {
        group.objects.push(this)
    }
    this.visible = true
    this.draw = function() {}
    allObjects.push(this)
    allRectObjects.push(this)
    return this
}
function Group() {
    this.objects = []
    this.addToStage = function(stage) {
        stage.groups.push(this)
    }
}
function CreateFullCanvas() {
    return createCanvas(window.innerWidth, window.innerHeight)
    fullCanvas = true;
}
function windowResized() {
    if(fullCanvas == true) {
        resizeCanvas(windowWidth, windowHeight);
    }
}
function drawStage(stage) {
    var objectsToDraw = []
    for(var i = 0; i != stage.groups.length; i++) {
        for(var t; t != stage.groups[i].objects.length; t++) {
            var workingObject = stage.groups[i].objects[t]
            objectsToDraw.push(workingObject)
        }
    }
    for(var i = 0; i != stage.objects.length; i++) {
        objectsToDraw.push(stage.objects[i])
    }
    for(var i = 0; i != objectsToDraw.length; i++) {
        drawObject(objectsToDraw[i])
    }
}
function drawObject(object) {
    if(object.visible){
        switch(object.objectType) {
            case "rect":
                drawRect(object)
                break;
            default:
                throw new Error("Wrong object type on object.")
                break;
        }
        for(var i = 0; i != object.lightSources.length; i++) {
            additionalLightSources.push(object.lightSources[i])
            additionalLightSources[i].x = object.x
            additionalLightSources[i].y = object.y
        }
    }
    drawTextForObject(object)
}
function drawRect(object) {
    stroke(object.stroke)
    strokeWeight(object.strokeWeight)
    fill(object.shapeColor)
    textAlign(CENTER)
    rectMode(CENTER)
    rect(object.x, object.y, object.width * object.scale, object.height * object.scale)
}
function drawTextForObject(object) {
    fill(object.textColor)
    stroke(object.textStroke)
    strokeWeight(object.textStrokeWeight)
    textSize(object.textSize)
    textFont(object.textFont)
    textAlign(CENTER, CENTER)
    text(object.text, object.x + object.textOffsetX, object.y + object.textOffsetY)
}
function updateShadows(stage) {
    shadowOverlay.clear();
    // Black, covering entire screen, foreground
    shadowOverlay.background(color(
        stage.currentLight.color.r,
        stage.currentLight.color.g,
        stage.currentLight.color.b,
        stage.currentLight.strength * 2.55
    ));
    shadowOverlay.push();
    shadowOverlay.blendMode(REMOVE);
    for(var i = 0; i != stage.lightSources.length; i++) {
        gradient = shadowOverlayContext.createRadialGradient(0, 0, 1, 0, 0, stage.lightSources[i].radius);
        gradient.addColorStop(0, "rgba(0,0,0,1)");
        gradient.addColorStop(0.5, "rgba(0,0,0,0.3)");
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        shadowOverlayContext.fillStyle = gradient;
        shadowOverlay.translate(stage.lightSources[i].x, stage.lightSources[i].y);
        shadowOverlay.circle(0, 0, stage.lightSources[i].radius * 2);
    }
    for(var i = 0; i != additionalLightSources.length; i++) {
        gradient = shadowOverlayContext.createRadialGradient(0, 0, 1, 0, 0, additionalLightSources[i].radius);
        gradient.addColorStop(0, "rgba(0,0,0,1)");
        gradient.addColorStop(0.5, "rgba(0,0,0,0.3)");
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        shadowOverlayContext.fillStyle = gradient;
        shadowOverlay.translate(additionalLightSources[i].x + additionalLightSources[i].offsetX, additionalLightSources[i].y + additionalLightSources[i].offsetY);
        shadowOverlay.circle(0, 0, additionalLightSources[i].radius * 2);
    }
    shadowOverlay.blendMode(BLEND);
    shadowOverlay.pop();
}
function Light(x, y, radius) {
    this.x = x
    this.y = y
    this.offsetX = 0
    this.offsetY = 0
    this.radius = radius
    this.addToStage = function(stage) {
        stage.lightSources.push(this)
    }
    this.attachToObject = function(object) {
        object.lightSources.push(this)
    }
    return this
}


function Update() {
    if(stageMap[currentStage] == undefined) {
        throw new TypeError("Invalid Stage.")
    } else {
        additionalLightSources = []
        drawStage(stageMap[currentStage])
        updateShadows(stageMap[currentStage])
        image(shadowOverlay, 0, 0, width, height);
    }
}
defaultStage = new Stage("default")

//" Deploy " 

