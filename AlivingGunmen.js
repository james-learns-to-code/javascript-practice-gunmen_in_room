
var EMPTY_SPACE = 0
var WALL = 1
var GUNMAN = 2
var DEAD_ZONE = 3

var testInput = [
    [WALL,        WALL,        WALL,        EMPTY_SPACE], 
    [EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE], 
    [EMPTY_SPACE, WALL,        EMPTY_SPACE, EMPTY_SPACE], 
    [WALL,        WALL,        WALL,        EMPTY_SPACE]
];

var testRoomOutput = [
    [WALL,        WALL,        WALL,        EMPTY_SPACE], 
    [EMPTY_SPACE, GUNMAN,      EMPTY_SPACE, EMPTY_SPACE], 
    [GUNMAN,      WALL,        GUNMAN,      EMPTY_SPACE], 
    [WALL,        WALL,        WALL,        GUNMAN     ]
];
var testOutput = 4;

var exampleInput = [
    [EMPTY_SPACE, WALL,        EMPTY_SPACE,  WALL,        EMPTY_SPACE, WALL,        EMPTY_SPACE, WALL       ], 
    [EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE,  EMPTY_SPACE, EMPTY_SPACE, WALL,        EMPTY_SPACE, EMPTY_SPACE], 
    [WALL,        EMPTY_SPACE, WALL,         EMPTY_SPACE, EMPTY_SPACE, WALL,        EMPTY_SPACE, WALL       ], 
    [EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE,  EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE], 
    [EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE,  WALL,        EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE], 
    [EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE,  EMPTY_SPACE, EMPTY_SPACE, WALL,        EMPTY_SPACE, WALL       ], 
    [EMPTY_SPACE, WALL,        EMPTY_SPACE,  EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE], 
    [EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE,  EMPTY_SPACE, WALL,        EMPTY_SPACE, WALL,        EMPTY_SPACE] 
];

// MARK: Main
function getMaximumGunmenIn(givenRoom) {
    var room = placeGunmanEfficientlyIn(givenRoom);
    var num = getNumOfGunmanIn(room);
    return num
}

// MARK: Implementation

function placeGunmanEfficientlyIn(room) {
    var n = room.lenth;
    var maximumNumOfOccupiedPlace = (n * n);
    var unreachableNumOfOccupiedPlace = maximumNumOfOccupiedPlace + 1;
    while(true) {
        var smallestNum = unreachableNumOfOccupiedPlace;
        var smallestPlace = undefined;
        for (var row = 0; row < n; row++) {
            for (var col = 0; col < n; col++) {
                var place = getPlaceAt(row, col);
                var num = getNumOfOccupiedPlaceIn(place, room);

                if (smallestNum > num) {
                    smallestNum = num;
                    smallestPlace = place;
                }
            }
        }
        if (smallestPlace == undefined) {
            break;
        }
        placeGunmanAt(smallestPlace, room);
    }
    return room;
}

function getPlaceAt(row, column) {
    var place = {row: row, column: column}
    return place
}

function getNumOfOccupiedPlaceIn(place, room) {

    return 0
}
function placeGunmanAt(place, room) {

}

function getNumOfGunmanIn(room) {

    return 0
}

// MARK: Test

function testplaceGunmanEfficientlyInGivenRoom() {
    console.log("Input is %s", testInput.join());

    console.log("Expected Output is %s", testRoomOutput.join());

    var room = placeGunmanEfficientlyIn(testInput);
    console.log("Output is %s", room);

    if(testRoomOutput.join() === room.join()) {
        console.log("Test Passed");
    }else {
        console.log("Test Failed");
    }
}

function testGetMaximumGunmenInGivenRoom() {
    console.log("Input is %s", testInput.join());

    console.log("Expected Output is %s", testOutput);

    var num = getMaximumGunmenIn(testInput);
    console.log("Output is %s", num);

    if(num === testOutput) {
        console.log("Test Passed");
    }else {
        console.log("Test Failed");
    }
}

testplaceGunmanEfficientlyInGivenRoom();

testGetMaximumGunmenInGivenRoom();