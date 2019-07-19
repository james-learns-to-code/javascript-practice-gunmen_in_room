
const EMPTY_SPACE = 0
const WALL = 1
const GUNMAN = 2
const DEAD_ZONE = 3

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

// MARK: Main
function getMaximumGunmenIn(givenRoom) {
    var room = placeGunmanEfficientlyIn(givenRoom);
    var num = getNumOfGunmanIn(room);
    return num;
}

// MARK: Implementation

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
            if (place.type != EMPTY_SPACE) {
                continue;
            }
            var num = getNumOfOccupiedPlaceIn(place, room); 
            if ((smallestNum == undefined) || (smallestNum > num)) {                
                smallestNum = num;
                smallestPlace = place;
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
    var total = 1;  // Include standing place

    // Have to traverse 4 direction, Above, Left, Right, Below
    var directions = [[0, -1], [-1, 0], [1, 0], [0, 1]];
    var stopIf = WALL;
    var countIf = EMPTY_SPACE;
    for (var i = 0; i < directions.length; i++) {
        var direction = directions[i];
        var num = getNumOfBlockIn(place, room, direction, stopIf, countIf);
        total = total + num;
    }
    return total;
}

function getNumOfBlockIn(place, room, direction, stopIf, countIf) {
    var n = room.length; 
    var num = 0; 
    var xShift = direction[0];
    var yShift = direction[1];
    var row = place.row;
    var col = place.column;
    while (true) {
        row = row + xShift;
        col = col + yShift;
        if ((row < 0) || (col < 0)) {  // reached end
            break;
        }
        if ((row >= n) || (col >= n)) {
            break;
        }
        var type = getPlaceTypeAt(row, col, room);
        if (type == stopIf) {
            break;
        } else if (type == countIf) {
            num++;
        }
    } 
    return num;
}

function makeDeadZoneAt(place, room) {
    // Have to traverse 4 direction, Above, Left, Right, Below
    var directions = [[0, -1], [-1, 0], [1, 0], [0, 1]];
    var stopIf = WALL;
    var makeIf = EMPTY_SPACE;
    for (var i = 0; i < directions.length; i++) {
        var direction = directions[i];
        makeDeadPlaceIn(place, room, direction, stopIf, makeIf);
    }
}

function makeDeadPlaceIn(place, room, direction, stopIf, makeIf) {
    var n = room.length; 
    var xShift = direction[0];
    var yShift = direction[1];
    var row = place.row;
    var col = place.column;
    while (true) {
        row = row + xShift;
        col = col + yShift;
        if ((row < 0) || (col < 0)) {  // reached end
            break;
        }
        if ((row >= n) || (col >= n)) {
            break;
        }
        var type = getPlaceTypeAt(row, col, room);
        if (type == stopIf) {
            break;
        } else if (type == makeIf) {
            var place = getPlaceAt(row, col, room);
            makeDeadPlaceAt(place, room);
        }
    }  
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

function testGetSmallestPlaceInGivenRoom() {
    console.log("testGetSmallestPlaceInGivenRoom");

    let input = copyTwoDimensionArray(testInput);
    console.log("Input is %s", input.join());
    console.log("Expected Output is %s", testSmallestPlaceOutput); 

    var smallestPlace = getSmallestPlaceIn(input)
    console.log("Output is %s", smallestPlace); 

    if((testSmallestPlaceOutput.row === smallestPlace.row) && (testSmallestPlaceOutput.column === smallestPlace.column)) {
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

// For testing

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
    for (var i = 0; i < array.length; i++)
        newArray[i] = array[i].slice();
    return newArray;
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

testGetSmallestPlaceInGivenRoom();

testPlaceGunmanEfficientlyInGivenRoom();

testGetMaximumGunmenInGivenRoom();

// MAIN
getMaximumGunmenInExampleRoom();