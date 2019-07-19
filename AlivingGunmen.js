// Mission
// Get the maximum number of gunmen in given room

// Conditions
// Room is built in 'n' rows and columns
// Gunman can see vertical & horizontal way, not diagonal
// Gunman cannot see over the wall
// If gunmen see each other, only one man will survive
// All gunmen in the room should be alive


// Idea

// In the given room, there can place a wall that block gunman.
// If there is no wall, i can put gunmen diagonal way,
// so maximum number of gunmen will be 'n'.
// But at the wall, space will remake.
// If gunman occupy specific place, 
// vertical and horizontal space would be his.
// I can call the space is 'Dead zone' 
// because other gunman could not surive.

// From above conditions, 
// i can assume that total occupied zone 
// when gunman occupy specific place.
// First, occupy vertical and horizontal space.
// Second, if there is a wall, remove space proper direction.
// Third, remove 'Dead zone'
// Then i can get a total occupied zone.

// Therefore, i can find the place that 
// 'smallest occupied zone'.
// If i place gunmen followed above logic, 
// the zone will occupied efficient way.


// Implementation

// Make two dimension array 'n' with predefined information.
// traverse room and get gunman occupied zone.
// Get 'smallest occupied zone' place.
// Place gunman at that place.
// Repeating till there is no available zone.
// Get the number of gunmen in the room.

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