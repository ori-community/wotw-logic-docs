---
title: Introduction
---

The "**seed generator**" is an algorithm that decides how everything should be shuffled. This is an item
randomizer, which means we're only shuffling items around. However, we're still always placing items in
locations where originally some item existed. We call those "**item locations**" or "**pickup locations**".

The seed generator regularly asks "which pickup locations can the player reach with these abilities and
resources". This is necessary to guarantee that every seed is possible to complete.

To answer this question, we document what exactly is needed to reach every pickup location on the map.
We write all the requirements in a specific syntax which the seed generator can understand.

This may not be obvious at first, but simply writing down all the possibilities to get from spawn to
every pickup on the map directly is not realistic. This has two reasons:

- This game has lots of movement options. For far away pickups there might be hundreds of possibilities
that can get you there. It's unreasonable to try and figure them all out in your head.
- This randomizer supports spawning in a great variety of different spawn locations (hundreds!). You'd
have to write down the requirements for each spawn separately

To solve this problem, randomizers usually document requirements in small steps, we call them
"**connections**". Each connection goes from one point of the map to another, usually a nearby one. We
call these points on the map "**anchors**". Once we are near a pickup location, we write another small
connection to there. With this approach, the seed generator can use all these small connections in
sequence to determine the total requirements of getting any pickup location. Additionally, every anchor
can be used as a spawn location without issues.

The image below shows an example.

- Anchors and pickup locations are white dots
- Green lines connect between two anchors
- Blue lines connect between an anchor and a pickup location
- Dotted lines only connect in one direction, continuous lines in both

The ability requirements for each connection are not represented in this image, it only shows the structure
of logic in this area. But as a reminder, every line has a set of requirements associated with it that allow
the player to travel along that line.

![Burrows Graph](/media/burrows_graph.png)

Dividing logic into small connections helps, but writing it still requires a lot of time and effort. We are
only able to provide detailed difficulty settings because many volunteers are helping us to write the
necessary logic. If you want to help as well, visit [Contributing](/contributing).
