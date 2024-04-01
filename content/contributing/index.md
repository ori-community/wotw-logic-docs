---
title: Contributing
---

![:origlow:](/media/origlow.png){:height=48}

Writing a high-quality randomizer logic requires many hours of work. We are only able to provide features
such as difficulties, trick toggles and random spawn because of the help of our volunteers. To continue
improving our logic, we do our best to help anyone interested in contributing.

While not required, we recommend you join the [development discord](https://discord.com/invite/cMJJ8E3eqH).
You can always ask questions there. Helping someone to start working on logic is never a waste of time for us.

## Volunteer coordination

We have no particular preference for which channel you use to contribute. Use what you are comfortable with!

### Choosing a topic

Currently the main topics under active development are paths from the kii and unsafe [difficulties](/difficulties).
If you're not sure what you want to work on exactly, you can ask for a suggestion in the development discord.
Even if you've already decided on something, it's a good idea to mention it there to make sure no one else is
working on the same thing.

### Pathfinding

Pathfinding is the process of documenting entirely new paths. Most difficulties already have paths written,
but if you want to contribute to the unsafe difficulty, pathfinding is the best way to do so. Unsafe is still
missing a lot of paths.

### Validation

Validation means to look over paths another person has written previously and making sure they are possible and
appropriate for their intended difficulty. During validation you may also notice additional paths the previous
person didn't think about and add them. If you want to contribute to the kii difficulty, it can still benefit
from additional validation.

### Using Discord

For a simple option, you can upload your work to the development discord. Start by downloading the latest
[areas.wotw](https://github.com/ori-community/wotw-seedgen/blob/dev/wotw_seedgen/areas.wotw). Please download
the latest version from scratch everytime you start a new piece of work. If you work on an outdated version,
we might not be able to merge your changes in easily.

Once you're done with whatever you wanted to do, upload the changed file to the discord and we will merge it
with any other changes that may have happened in the meantime.

### Using GitHub

If you like git, this is the least work for us.

You can always open pull requests to [areas.wotw](https://github.com/ori-community/wotw-seedgen/blob/dev/wotw_seedgen/areas.wotw).
Please start your work from the `dev` branch and also target the `dev` branch when opening your pull request. If you base your work
off the `main` branch, in some cases we might not be able to merge your work easily.

Please keep in mind that the logic may change frequently, please sync your fork before starting any piece of work and try not
to wait too long before opening your pull request. It's better to make smaller, faster pull request than bigger, slower ones.

### Playtesting

Always feel free to mention if you notice anything that feels wrong about the logic while playing. Here are some
remarks on what you could look for in particular:

- The kii difficulty still isn't very polished. It may contain tricks that are actually harder than kii is intended
to be. If a trick's difficulty seems out of place, please do make a mention.
- The unsafe difficulty is not supposed to be complete. If you notice something is missing in unsafe, feel free to
- add it to the logic yourself, but it's not really worth posting about.

If you want to do more targetted playtesting, try paying close attention to the in-logic filter during your seeds.
This way you can notice more easily if something is wrong about the logic.
