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
            case "circle":
                drawCircle(object)
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
        object.draw()
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
function drawCircle(object) {
    stroke(object.stroke)
    strokeWeight(object.strokeWeight)
    fill(object.shapeColor)
    textAlign(CENTER)
    rectMode(CENTER)
    ellipse(object.x, object.y, object.diameter * object.scale)
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