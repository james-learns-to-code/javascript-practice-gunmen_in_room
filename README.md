# Mission
Get the maximum number of gunmen in given room

# Conditions
Room is built in 'n' rows and columns
Gunman can see vertical & horizontal way, not diagonal
Gunman cannot see over the wall
If gunmen see each other, only one man will survive
All gunmen in the room should be alive


# Idea

In the given room, there can place a wall that block gunman.
If there is no wall, i can put gunmen diagonal way,
so maximum number of gunmen will be 'n'.
But at the wall, space will remake.
If gunman occupy specific place, 
vertical and horizontal space would be his.
I can call the space is 'Dead zone' 
because other gunman could not surive.

From above conditions, 
i can assume that total occupied zone 
when gunman occupy specific place.
First, occupy vertical and horizontal space.
Second, if there is a wall, remove space proper direction.
Third, remove 'Dead zone'
Then i can get a total occupied zone.

Therefore, i can find the place that 
'smallest occupied zone'.
If i place gunmen followed above logic, 
the zone will occupied efficient way.


# Implementation

Make two dimension array 'n' with predefined information.
traverse room and get gunman occupied zone.
Get 'smallest occupied zone' place.
Place gunman at that place.
Repeating till there is no available zone.
Get the number of gunmen in the room.
