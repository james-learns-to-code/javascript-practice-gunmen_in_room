
// MARK: Main
function getMaximumGunmenIn(givenRoom) {
    var room = placeGunmanEfficientlyIn(givenRoom);
    var num = getNumOfGunmanIn(room);
    return num;
}

// MARK: Implementation

// Place Type
const EMPTY_SPACE = 0
const WALL = 1
const GUNMAN = 2
const DEAD_ZONE = 3

// For traverse 4 direction, Up, Left, Right, Down
var directions = [[0, -1], [-1, 0], [1, 0], [0, 1]]; 

function placeGunmanEfficientlyIn(room) { 
    while(true) {
        var smallestPlace = getSmallestPlaceIn(room)
        if (smallestPlace == undefined) {
            break;
        }
        placeGunmanAt(smallestPlace, room);
        makeDeadZoneAt(smallestPlace, room);
    }
    return room;
}

function getSmallestPlaceIn(room) { 
    var n = room.length; 
    var smallestNum = undefined;
    var smallestPlace = undefined;
    for (var col = 0; col < n; col++) {
        for (var row = 0; row < n; row++) {
            var place = getPlaceAt(row, col, room);
            if (place.type == EMPTY_SPACE) {
                var num = getNumOfOccupiedPlaceIn(place, room); 
                if ((smallestNum == undefined) || (smallestNum > num)) {                
                    smallestNum = num;
                    smallestPlace = place;
                }
            }
        }
    }
    return smallestPlace;
}

function getPlaceTypeAt(row, column, room) { 
    var type = room[column][row];
    return type;
}

function getPlaceAt(row, column, room) {
    var type = getPlaceTypeAt(row, column, room);
    var place = {row: row, column: column, type: type} 
    return place;
}

function getNumOfOccupiedPlaceIn(place, room) {
    var total = 0;
    directions.forEach(function(direction) {
        var traversedPlace = place;
        while (true) {
            traversedPlace = getNextRoomFrom(traversedPlace, room, direction);
            if ((traversedPlace == undefined) || (traversedPlace.type == WALL)) {
                break;
            }
            if (traversedPlace.type == EMPTY_SPACE) {
                total++;
            }
        } 
    }); 
    return total;
}

function makeDeadZoneAt(place, room) {
    directions.forEach(function(direction) {
        var traversedPlace = place;
        while (true) {
            traversedPlace = getNextRoomFrom(traversedPlace, room, direction);
            if ((traversedPlace == undefined) || (traversedPlace.type == WALL)) {
                break;
            }
            makeDeadPlaceAt(traversedPlace, room);
        }
    });
}

function getNextRoomFrom(place, room, direction) {
    var n = room.length; 
    var xShift = direction[0];
    var yShift = direction[1];
    var row = place.row + xShift;
    var col = place.column + yShift;
    if ((row < 0) || (col < 0)) {  // reached end
        return undefined;
    }else if ((row >= n) || (col >= n)) {
        return undefined;
    }
    var place = getPlaceAt(row, col, room);
    return place;
}

function makeDeadPlaceAt(place, room) {
    room[place.column][place.row] = DEAD_ZONE;
}

function placeGunmanAt(place, room) {
    room[place.column][place.row] = GUNMAN;
}

function getNumOfGunmanIn(room) {
    var count = 0
    var n = room.length; 
    for (var col = 0; col < n; col++) {
        for (var row = 0; row < n; row++) {
        var type = getPlaceTypeAt(row, col, room);
            if (type == GUNMAN) {
                count++;
            }
        }
    }
    return count
}

// MARK: Test

const testInput = [
    [WALL,        WALL,        WALL,        EMPTY_SPACE], 
    [EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE], 
    [EMPTY_SPACE, WALL,        EMPTY_SPACE, EMPTY_SPACE], 
    [WALL,        WALL,        WALL,        EMPTY_SPACE]
];

const testRoomOutput = [
    [WALL,        WALL,        WALL,        GUNMAN     ], 
    [EMPTY_SPACE, GUNMAN,      EMPTY_SPACE, EMPTY_SPACE], 
    [GUNMAN,      WALL,        GUNMAN,      EMPTY_SPACE], 
    [WALL,        WALL,        WALL,        EMPTY_SPACE]
];
const testSmallestPlaceOutput = {row: 0, column: 2, type: EMPTY_SPACE}
const testOutput = 4;

const exampleInput = [
    [EMPTY_SPACE, WALL,        EMPTY_SPACE,  WALL,        EMPTY_SPACE, WALL,        EMPTY_SPACE, WALL       ], 
    [EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE,  EMPTY_SPACE, EMPTY_SPACE, WALL,        EMPTY_SPACE, EMPTY_SPACE], 
    [WALL,        EMPTY_SPACE, WALL,         EMPTY_SPACE, EMPTY_SPACE, WALL,        EMPTY_SPACE, WALL       ], 
    [EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE,  EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE], 
    [EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE,  WALL,        EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE], 
    [EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE,  EMPTY_SPACE, EMPTY_SPACE, WALL,        EMPTY_SPACE, WALL       ], 
    [EMPTY_SPACE, WALL,        EMPTY_SPACE,  EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE], 
    [EMPTY_SPACE, EMPTY_SPACE, EMPTY_SPACE,  EMPTY_SPACE, WALL,        EMPTY_SPACE, WALL,        EMPTY_SPACE] 
];

function testGetSmallestPlaceInGivenRoom() {
    console.log("testGetSmallestPlaceInGivenRoom");

    let input = copyTwoDimensionArray(testInput);
    console.log("Input is %s", input.join());
    console.log("Expected Output is %s", testSmallestPlaceOutput); 

    var smallestPlace = getSmallestPlaceIn(input)
    console.log("Output is %s", smallestPlace); 

    if((testSmallestPlaceOutput.row === smallestPlace.row) && 
    (testSmallestPlaceOutput.column === smallestPlace.column)) {
        console.log("Test Passed");
    }else {
        console.log("Test Failed");
    }
}

function testPlaceGunmanEfficientlyInGivenRoom() {
    console.log("testPlaceGunmanEfficientlyInGivenRoom");

    let input = copyTwoDimensionArray(testInput);
    console.log("Input is %s", input.join());
    console.log("Expected Output is %s", testRoomOutput.join());

    var room = placeGunmanEfficientlyIn(input);
    room = removeDeadzoneIn(room)
    console.log("Output is %s", room.join());

    if(testRoomOutput.join() === room.join()) {
        console.log("Test Passed");
    }else {
        console.log("Test Failed");
    }
}

function testGetMaximumGunmenInGivenRoom() {
    console.log("testGetMaximumGunmenInGivenRoom");

    let input = copyTwoDimensionArray(testInput);
    console.log("Input is %s", input.join());
    console.log("Expected Output is %s", testOutput);

    var num = getMaximumGunmenIn(input);
    console.log("Output is %s", num);

    if(num === testOutput) {
        console.log("Test Passed");
    }else {
        console.log("Test Failed");
    }
}

function getMaximumGunmenInExampleRoom() {
    console.log("getMaximumGunmenInExampleRoom");

    let input = copyTwoDimensionArray(exampleInput);
    console.log("Input is %s", input.join());

    var num = getMaximumGunmenIn(input);
    console.log("Output is %s", num);
}

// Utility for testing

function removeDeadzoneIn(room) {
    var n = room.length; 
    for (var col = 0; col < n; col++) {
        for (var row = 0; row < n; row++) {
            var type = getPlaceTypeAt(row, col, room);
            if (type == DEAD_ZONE) {
                var place = getPlaceAt(row, col, room);
                makeEmptyPlaceAt(place, room);
            }
        }
    }
    return room;
}

function makeEmptyPlaceAt(place, room) {
    room[place.column][place.row] = EMPTY_SPACE;
}

function copyTwoDimensionArray(array) {
    var newArray = [];
    array.forEach(function(element, i) {
        newArray[i] = element.slice()
    });
    return newArray;
}

testGetSmallestPlaceInGivenRoom();

testPlaceGunmanEfficientlyInGivenRoom();

testGetMaximumGunmenInGivenRoom();

// MAIN
getMaximumGunmenInExampleRoom();