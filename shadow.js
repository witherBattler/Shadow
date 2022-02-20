var defaultStage
var stageMap = {}
var allObjects = []
var allRectObjects = []
var allCircleObjects = []
var allAnimations = []
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





function CreateFullCanvas() {
    return createCanvas(window.innerWidth, window.innerHeight)
    fullCanvas = true;
}
function windowResized() {
    if(fullCanvas == true) {
        resizeCanvas(windowWidth, windowHeight);
    }
}

function updateShadows(stage) {
    shadowOverlay.clear();
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

