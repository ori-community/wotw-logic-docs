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

## Using Git

If you are familiar with git, you can clone the [Seedgen Repository](https://github.com/ori-community/wotw-seedgen) and work on the files there (in the `wotw_seedgen` folder). 
Please start your work from and Pull Request to the `dev` branch since only this branch always has the latest logic!

## Not using Git

If you are not familiar with git, you can work on your local copy of the files that gets installed with the randomizer.

Your local copy can be found in the randomizer install directory, at `/randomizer/areas.wotw`, `/randomizer/loc_data.csv` and `/randomizer/state_data.csv`.

Note that your local copy gets updated with every randomizer update, so if you want to work on it you should make a copy and put it elsewhere, so your work doesn't get overwritten!

Unlike with git, we won't be able to merge your changes automatically, since someone else might've made modifications to the part of logic that you're working on in the meantime.

To ensure we are always able to merge your changes, you should follow these practices:

- When you start working on some piece of logic (such as writing paths for an area), create one copy of the original file *and keep it unmodified*. Then make a second copy that you write your changes into. If we run into issues merging your changes, we can compare the two files to figure out what state you started your work in and which changes you actually made.
- When you are finished with that piece of logic, you can upload the two files to the development discord. We will merge it into the GitHub repository.
- After you have uploaded the finished files, it is recommended to delete both of your copies that you were working on. If you are starting a new piece of work, make new copies of the original files from your randomizer directory. This gives you all the updates others have made in the meantime and reduces the chance you are working on an outdated logic file, which is important so we are able to merge your changes.
