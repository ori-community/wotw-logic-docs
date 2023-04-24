---
title: Contributing
---

The logic is the backbone of all seed generation, yet it is also by far the most effortful aspect to develop.

We still have many plans to expand on the logic to allow higher difficulties and more glitches, so every piece of help is welcome.

Here's how you can help.

## Pathfinding

The biggest chunk of work is on Pathfinding.

When Pathfinding, you will go through a portion of the [Logic File](/syntax/logic-files#areaswotw) and add new paths to it. Maybe you're adding paths for a new difficulty, or for a new glitch.

If you have any questions while Pathfinding or just need someone to explain the concept in practice, any and all questions can go to the [Development Discord](https://discord.gg/cMJJ8E3eqH).

We write paths in two steps: Pathfinding, then Validation. By having two independent people look over the paths, we minimize the amount of errors that end up sneaking into the logic.

If you are new to Pathfinding, it is recommended to start with the first step, finding new paths for a glitch or difficulty that's not part of the logic yet, so someone more experienced can validate your work later.

We also organize Pathfinders to avoid conflicts with different groups working on the same area at once.

If you want to work on something (be it alone or in a group with someone else), please first visit the Development Discord. In the `#areas-dot-wotw` channel, you can ask whether a certain area is free or which areas currently need work. If you want to check yourself, there will also often be a pinned post outlining which areas are currently being worked on by someone.

Before working on anything, please post in that channel describing what you're working on to avoid conflicts with others.

If you want to help with Pathfinding, you will have to learn the [Syntax](/syntax) we use to write down logic.

## Playtesting

After logic is written, it has to be tested. You can do this by playing with the [Logic Helper](https://wiki.orirando.com/features/logic-helper). Just playing normally helps already, but if you want to be especially efficient, you can try to look out whenever you find a new skill whether everything looks correct.

For this, it is recommended to enable the "Show Transparent Icons" feature in the randomizer settings. This will still show you all the out-of-logic pickups in transparent, so you can check whether anything is out of logic that should probably be in logic.

Of course you can play what you want, but the most efficient setting to test the logic is Fully Random Spawn, since it can run into some rare edge cases.

Playtesting is not only about catching mistakes where we accidentally write impossible paths or forget about possibilities, but also about the difficulty. Difficulty in a platformer is very hard to grasp, and usually in a new difficulty some paths will end up being too difficult.

If you find any case where a pickup in logic seems too difficult or impossible, or something seems easy to get but shows out of logic, you can post about it in the [Development Discord](https://discord.gg/cMJJ8E3eqH).

Sometimes there may not actually be an issue, but even if we get 3 false positives for each actual issue, that's worth it.
