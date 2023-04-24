---
title: Visualizing the Graph
---

You can visualize the Logic Graph using the Devtools in the Randomizer Launcher.

## Enabling the Visualizer

If you don't have the Developer Tools enabled, these are the steps:

- Go to "Settings"
- Press `Ctrl` 5 times
- In the bottom right of the Settings, a new section "Developer Tools" should appear. If you see this, you have enabled the Developer Tools.

If you have the Developer Tools enabled, a new tab should be visible below the Settings tab:

![Rando Devtools Tab](/media/dev_tools.png)

Click it to open the Devtools.  
In the devtools, there will be a tab called "areas.wotw map", this is the Logic Visualizer.

This Visualizer uses your local copy of the logic file, found at `randomizer/areas.wotw` in your randomizer install directory. If you work on this file, any changes you make will be reflected in real time.

## Limitations

The visualizer may not always use the latest version of seedgen. If you see error messages complaining about invalid syntax in the logic file, the visualizer may be behind on the latest syntax features.
