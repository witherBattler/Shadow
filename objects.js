function CircleObject(x, y, diameter) {
    this.lightSources = []
    this.objectShape = "circle"
    this.x = x
    this.y = y
    this.diameter = diameter
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
    allCircleObjects.push(this)
    return this
}
function RectObject(x, y, width, height) {
    this.lightSources = []
    this.objectShape = "rect"
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
        strength: 0
    }
    stageMap[name] = this
    return this
}

function Group() {
    this.objects = []
    this.addToStage = function(stage) {
        stage.groups.push(this)
    }
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

function CheckCollision(object1, object2) {
    var collisionType = object1.objectShape + object2.objectShape
    switch(collisionType) {
        case "rectrect":
        //Thanks to https://happycoding.io/tutorials/processing/collision-detection    
        if (object1.x + object1.width > object2.x && object1.x < object2.x + object2.width && object1.y + object1.height > object2.y && object1.y < object2.y + object2.height) {
                return true
            } else {
                return false
            }
            break;
        case "circlecircle":
            if((object1.diameter + object2.diameter) / 2 > dist(object1.x, object1.y, object2.x, object2.y)) {
                return true
            } else {
                return false
            }
            break;
        case "rectcircle":
            return intersects(object1, object2)
            break;
        case "circlerect":
            return intersects(object2, object1)
            break;
        default:
            throw new Error(`Impossible to detect collision between [${object1.type}] and [${object2.type}].`)
    }
}
//Thanks to https://gist.github.com/vonWolfehaus/5023015#file-circlevsrect-js-L19
function intersects(circle, rect) {
    var circleDistance = {};
    circleDistance.x = Math.abs(circle.x - rect.x);
    circleDistance.y = Math.abs(circle.y - rect.y);
    if (circleDistance.x > (rect.width/2 + circle.diameter / 2)) { return false; }
    if (circleDistance.y > (rect.height/2 + circle.diameter / 2)) { return false; }
    if (circleDistance.x <= (rect.width / 2)) { return true; } 
    if (circleDistance.y <= (rect.height / 2)) { return true; }
    cornerDistanceSq = Math.sqrt(circleDistance.x - rect.width / 2) + Math.sqrt(circleDistance.y - rect.height/2);
    return (cornerDistanceSq <= (Math.sqrt(circle.diameter / 2)));
}

function SpriteObject(x, y) {
    this.objectShape = "rect"
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.velocityX = 0
    this.velocityY = 0
    this.rotation = 0
    this.pointTowards = function(x, y) {

    }
    this.state = {}
    this.draw = function() {}
    this.speed = 0
    this.rotationSpeed
    this.scale = 0
    this.animation = null
    this.currentAnimationFrame = 0
    this.currentAnimaitonFrameUpdate = 0
}

function Animation(picturesArray, name, callback = function() {}) {
    var newAnimation = {
        imageFrames: [],
        name: name,
        loadingFinished: false,
        offsetX: 0,
        offsetY: 0,
        framesForChange: 250,
        animationRepeat: true,
    }
    for(var i = 0; i != picturesArray.length; i++) {
        loadImage(picturesArray[i], function(img) {
            newAnimation.imageFrames.push(img)
            if(newAnimation.imageFrames.length == picturesArray.length) {
                callback()
            }
        }, function() {
            throw new Error(picturesArray[i].toString() + " link not found. Make sure the image is in the directory you specified.")
        })
    }
    allAnimations.push(newAnimation)
    return newAnimation;
}