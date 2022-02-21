function drawStage(stage) {
    var objectsToDraw = []
    for(var i = 0; i != stage.groups.length; i++) {
        for(var t; t != stage.groups[i].objects.length; t++) {
            
            var workingObject = stage.groups[i].objects[t]
            if(workingObject.objectType == "SpriteObject") {
                manageSpritePosition(stage.objects[i])
            }
            objectsToDraw.push(workingObject)
        }
    }
    for(var i = 0; i != stage.objects.length; i++) {
        if(stage.objects[i].objectType == "SpriteObject") {
            manageSpritePosition(stage.objects[i])
        }
        objectsToDraw.push(stage.objects[i])
    }
    for(var i = 0; i != objectsToDraw.length; i++) {
        drawObject(objectsToDraw[i])
    }
}
function drawObject(object) {
    if(object.visible){
        switch(object.objectType) {
            case "RectObject":
                drawRect(object)
                break;
            case "CircleObject":
                drawCircle(object)
                break;
            case "SpriteObject":
                manageSprite(object)
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
        drawTextForObject(object)
    }
    
}


function manageSprite(object) {
    if(object.animation != null) {
        if(object.currentAnimationFrameUpdate == object.animation.framesForChange) {
            console.log(object.animation.imageFrames.length + "a")
            console.log(object.currentAnimationFrame + "b")
            if(object.currentAnimationFrame == object.animation.imageFrames.length - 1) {
                object.currentAnimationFrame = 0
            } else {
                object.currentAnimationFrame++
            }
            object.currentAnimationFrameUpdate = 0
        }
        object.currentAnimationFrameUpdate++;
        push()
        translate(object.x + object.animation.offsetX, object.y + object.animation.offsetY)
        angleMode(DEGREES)
        rotate(object.rotation)
        imageMode(CENTER)
        image(
            object.animation.imageFrames[object.currentAnimationFrame],
            0,
            0,
            object.animation.imageFrames[object.currentAnimationFrame].width * object.scale,
            object.animation.imageFrames[object.currentAnimationFrame].height * object.scale,
        )
        pop()
    } else {
        push()
        fill(object.shapeColor)
        angleMode(DEGREES)
        rotate(object.rotation)
        rectMode(CENTER)
        translate(object.x, object.y)
        rect(0, 0, object.defaultWidth, object.defaultHeight)
        pop()
    }
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

function manageSpritePosition(object) {
    object.x += object.velocityX
    object.y += object.velocityY
    object.rotation += object.rotationSpeed
    if(object.movingTowards != null) {
        var  deltaX = object.movingTowards.x - object.x;
        var  deltaY = object.movingTowards.y - object.y;
        var  theta = atan(deltaY / deltaX)
        var  compX = cos(theta); 
        var  compY = sin(theta); 
        object.x += compX * (deltaX < 0 ? -1 : 1) * object.speed
        object.y += compY * (deltaX < 0 ? -1 : 1) * object.speed
    }
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