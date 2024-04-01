---
title: Logic Files
---

Our logic is defined in three parts:

- Connections and Requirements (`areas.wotw`)
- Pickup definitions (`loc_data.csv`)
- State definitions (`state_data.csv`)

For most pathfinding work, you will only have to use `areas.wotw`

## areas.wotw

[areas.wotw on GitHub](https://github.com/ori-community/wotw-seedgen/blob/dev/wotw_seedgen/areas.wotw)

This is the main logic file. It defines all the connections across the world and what the player needs to traverse them. It uses a custom [Syntax](/syntax).

It may reference all [Pickup definitions](/syntax/logic-files#loc_datacsv) using the `pickup` or `quest` syntax and all [State definitions](/syntax/logic-files#state_datacsv) using the `state` or `quest` syntax.

## loc_data.csv

[loc_data.csv on GitHub](https://github.com/ori-community/wotw-seedgen/blob/dev/wotw_seedgen/loc_data.csv)

This defines all the Pickup locations in the csv format (comma separated values). These represent everything the seed generator is alolwed to place an item on.

Usually there is no reason to edit this file.

## state_data.csv

[state_data.csv on GitHub](https://github.com/ori-community/wotw-seedgen/blob/dev/wotw_seedgen/state_data.csv)

This defines all the permanent world states that may be aquired while traversing the logic, such as pulled levers or opened doors.

If you want to add a new `state` that hasn't been tracked before, you should create an entry for it in this file. The columns `UberGroup`, `UberId` and `UberStateValue` are identifiers that the game uses internally to track the world state. If you're not sure how to find the correct values for your world state, feel free to request someone else to fetch them in the [Development Discord](https://discord.gg/cMJJ8E3eqH).
