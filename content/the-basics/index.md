---
title: The Basics
---

To generate seeds, we have to know what abilities the player needs to get to each pickup on the map.

To make this possible, we split the world up into countless small connections.

![Burrows Graph](/media/burrows_graph.png)

In this image, each white dot is the start or end point of a connection.  
Green lines connect different points on the map  
Dotted green lines only connect in one direction  
Dotted blue lines connect to pickups, these are always only in one direction

In the logic, each of these lines has a set of abilities attached that the player needs in order to traverse that connection. If there are multiple ways to solve the connection, all the variants are specified.

This way, seed generation can figure out which items the player needs in order to progress.

We have a custom [Syntax](/syntax) to write down all these connections and their attached requirements.

You can get yourself an image like the one above for the full map using the [Logic Graph Visualizer](/tools/logic-graph-visualizer)
