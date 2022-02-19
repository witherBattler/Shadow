function CircleObject(x, y, diameter) {
    this.lightSources = []
    this.objectType = "circle"
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