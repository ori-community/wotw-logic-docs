---
title: Syntax
---

We have a custom syntax used for our [Logic File](/syntax/logic-files#areaswotw).

The recommended way to work with this syntax is using the [VSCode extension](/tools/language-extension)

## Comments

Everything after a `#` until the end of the line is a comments. These are ignored by the seed generator, they only exist as notes for the Pathfinders.

:logic-code{code="
# This file defines all the requirements a player has to fulfill in order to reach a given pickup on the map.
# The pickup names and locations are defined in loc_data.csv.
"}

## Outline

The logic file contains three types of content:

- `anchor`
- `requirement`
- `region`

For most pathfinding work, you only have to interact with anchors.

## Anchors

Each anchor is a point on the map.

:logic-code{code="
anchor MarshSpawn.Main at -799, -4310:  # spawn location / inkwater well
  [...]
"}

This anchor is called `MarshSpawn.Main`. The name will be used when other anchors connect to this one.

It is placed at the in-game coordinates `-799, -4310` (x, y). This is used when spawning on the anchor and to [Visualize the Graph](/tools/logic-graph-visualizer).

If you are adding a new anchor and have to figure out your coordinates, there is a command in the [Randomizer Wheel](https://wiki.orirando.com/features/custom-wheel) to show them in-game.

An anchor can have any amount of outwards connections.

Connections can lead to:

- World States (`state`)
- Pickups (`pickup`)
- Quests (`quest`)
- Other anchors (`conn`)

### Anchor -> State

:logic-code{code="
anchor MarshSpawn.Main at -799, -4310:  # spawn location / inkwater well
  [...]
  state MarshSpawn.LogBroken: free
  state MarshSpawn.ToOpherBarrier:
    moki: BreakWall=16
    kii: MarshSpawn.RainLifted, Bash, Damage=10  # lure the mantis
  state NonGladesTeleporter: free
  [...]
"}

States are permanent changes to the world, such as pulling levers or breaking walls.

They can be used as requirements for other connections. For instance, the connection to `state MarshSpawn.ToOpherBarrier` (The wall to the right of spawn) has a solution relying on another state, `MarshSpawn.RainLifted` (because the Mantis only spawns once you lift the rain by visiting Sword tree).

For most Pathfinding work, you only need to edit existing state connections. If you do have to add a new state, you should also edit the [State Definitions](/syntax/logic-files#state_datacsv)

### Anchor -> Pickup

Pickups are places where the seed generator may place an item.

:logic-code{code="
anchor MarshSpawn.Main at -799, -4310:  # spawn location / inkwater well
  [...]
  pickup MarshSpawn.RockHC: free
  pickup MarshSpawn.FirstPickupEX: free
  pickup MarshSpawn.GrappleHC:
    moki: Grapple, DoubleJump OR Launch
  [...]
"}

If you're not sure which pickup a name refers to, you can use the [Pickup Names toolseed](/tools/toolseeds#pickup-names)

### Anchor -> Quest

Quests are Pickups and States at the same time. The seed generator may place an item there, but they also permanently progress a world state and can be used in other connections

:logic-code{code="
anchor MarshSpawn.Cave at -707, -4419:  # At Tokk in the Cave
  [...]
  quest MarshSpawn.CaveKS:
    moki:
      DoubleJump, Dash OR Grapple
      Bash, DoubleJump OR Dash OR Glide OR Grapple  # day and night both have a slime here
      Launch
      MarshSpawn.CaveFight
  quest MarshSpawn.TokkKeystoneQuest:
    moki: MarshSpawn.CaveKS
  [...]
"}

For instance, `MarshSpawn.CaveKS` is used as a requirement for `MarshSpawn.TokkKeystoneQuest` (in the questline, you have to first collect the keystone, then talk to Tokk)

### Anchor -> Anchor

:logic-code{code="
anchor MarshSpawn.Main at -799, -4310:  # spawn location / inkwater well
  [...]
  conn Teleporters: free
  conn MarshSpawn.BurrowFightArena:
    moki:
      Water, Burrow, DoubleJump OR Glide OR Launch
      Water, Burrow, Dash, Bash, Grenade=1
  conn MarshPastOpher.MillView:
    moki: MarshSpawn.ToOpherBarrier
  [...]
"}

Connect to another anchor by using its name. If you want connections in both directions, you can specify the backwards connection in the other anchor.

:logic-code{code="
anchor MarshSpawn.Main at -799, -4310:  # spawn location / inkwater well
  [...]
  conn MarshPastOpher.MillView:
    moki: MarshSpawn.ToOpherBarrier
  [...]
anchor MarshPastOpher.MillView at -596, -4293:  # Standing next to Opher, looking at the Millstone
  [...]
  conn MarshSpawn.Main:
    moki, MarshSpawn.ToOpherBarrier:
      DoubleJump OR Launch
      Bash, Grenade=1
  [...]
"}

## Requirements

Each connection lists the requirements needed to solve it.

### free

The simplest Requirement is `free`. it describes that the player is able to solve the connection without needing anything.

Note that the player is always assumed to have core abilities such as Wall Jump. However, having any amount of starting health or energy is not assumed.

:logic-code{code="
anchor MarshSpawn.Main at -799, -4310:  # spawn location / inkwater well
  [...]
  pickup MarshSpawn.FirstPickupEX: free
  [...]
"}

### Skills

You may use any Skills as well as `Water` as requirements.

:logic-code{code="
anchor MarshSpawn.Main at -799, -4310:  # spawn location / inkwater well
  [...]
  pickup MarshSpawn.GrappleHC:
    moki: Grapple, DoubleJump OR Launch
  [...]
"}

### Difficulties

You may use the logical [Difficulties](/difficulties) as requirements. For better readability, we always write the difficulty in front of the other requirements.

:logic-code{code="
anchor MarshPastOpher.MillView at -596, -4293:  # Standing next to Opher, looking at the Millstone
  [...]
  conn MarshPastOpher.BowPath:
    moki: DoubleJump OR Dash OR Glide OR Launch
    gorlek: free
  [...]
"}

### Energy Skills

For Skills that consume energy, the syntax `Skill=x` is used to describe how many times the skill is used (not how much energy is consumed).

:logic-code{code="
anchor MarshPastOpher.UpperBowArea at -437, -4211:  # Between the eyestones
  [...]
  pickup MarshPastOpher.LeftEyestone:
    moki: Combat=Skeeto, Bow=1
    gorlek: Bow=1
  [...]
"}

### Refunding Energy Skills

In higher difficulties, paths may require to start aiming an energy skill, but then cancelling it to refund the energy. For this there are the special requirements `GrenadeCancel` and `BowCancel`.

:logic-code{code="
anchor GladesTown.AboveOpher at -212, -4133:  # On the platform above Opher
  [...]
  conn GladesTown.PlayfulMoki:
    unsafe: TuleyShop.SpringPlants, Grenade=1 OR GrenadeCancel  # increased height bounce
  [...]
"}

### Shards

Most Shards, such as damage buffs, are handled automatically by the seed generator. The only Shards that have to be used explicitely are:

- `TripleJump`
- `Bounty`
- `Magnet`
- `UltraGrapple`
- `Turmoil`
- `Sticky`
- `Deflector`
- `Fracture`
- `Arcing`

:logic-code{code="
anchor MarshSpawn.BeforeBurrows at -1006, -4497:  # On the island before the Burrows entry
  [...]
  conn MarshSpawn.PoolsBurrowsSignpost:
    gorlek: Bash, DoubleJump, TripleJump OR Glide OR Sword OR Hammer
  [...]
"}

### Teleporters

Teleporters are handled in the `Teleporters` anchor. There should never be a reason to use them elsewhere.

:logic-code{code="
anchor Teleporters:  # teleporter access
  [...]
  conn GladesTown.Teleporter:
    moki: GladesTP
  [...]
"}

### Damage

`Damage=x` describes taking x damage on normal in-game difficulty and without any modifiers. The seed generator will adjust the damage automatically if the player is playing on hard or has Resilience.

The in-game settings have a toggle to "Show Damage Values", turning it on is useful here.

:logic-code{code="
anchor LowerWastes.WestTP at 1456, -3997:  # At the Western Wastes TP
  [...]
  conn LowerWastes.SunsetView:
    gorlek: Bash, Grenade=1, Damage=30
  [...]
"}

### Resources

Most Resources are handled indirectly. The only explicit Resource requirements are `Ore=x` and `Keystone=x`

:logic-code{code="
anchor MarshSpawn.CaveEntrance at -588, -4393:  # before the door blocking regen tree
  [...]
  state MarshSpawn.KeystoneDoor:
    moki: Keystone=2
  [...]
"}

### BreakWall

`BreakWall=x` describes breaking a wall or object that has x health. The seed generator will expand this to all the possible different weapons as well as using shards to lower the energy cost.

:logic-code{code="
anchor MarshSpawn.BrokenBridge at -643, -4351:  # after dropping down the breaking bridge
  [...]
  pickup MarshSpawn.ResilienceShard:
    moki: BreakWall=16
  [...]
"}

### Combat

`Combat=x` describes killing one or more enemies. You can find all the enemy names in the [Enemy Index](https://docs.google.com/spreadsheets/d/1AE_ctym6WAwltGK-r6w58ARq0ym2MU4MzFiwg328kjM/edit?usp=sharing). You can describe multiple enemies using `Enemy+Enemy` and multiple of the same enemy like `3xEnemy`.

:logic-code{code="
anchor HowlsDen.Teleporter at -328, -4536:  # At the teleporter
  [...]
  state HowlsDen.DoubleJumpTreeCombat:
    moki: Combat=Mantis+2xLizard+SmallSkeeto  # The SmallSkeeto spawns in this arena if the player has Bash.
  [...]
"}

### Glitches

If any glitch is used, it has to be stated explicitely. This allows the seed generator to toggle glitches on or off.

Often Glitches also have convenience syntax, such as `SentryJump=x` to perform x Sentry Jumps, which will expand to `Sentry=x, Sword OR Hammer`.

[Available Glitches](/syntax/glitches)

### States

Any `state` can be used as a requirement. See [State Connections](/syntax#anchor-state) for details.

### DepthsLight

In Mouldwood Depths, we often use the `DepthsLight` macro to simplify going through a dark area. It is defined at the top of the file.

:logic-code{code="
requirement DepthsLight:
  moki: UpperDepths.ForestsEyes OR Flash=1
  gorlek: Bow=3  # should be good, right?
  [...]
anchor UpperDepths.FirstKSRoom at 223, -4420:  # Below the first firefly egg
  pickup UpperDepths.LeftEntryKS:
    moki: DepthsLight, Combat=Spiderling OR DoubleJump OR Bash OR Launch
    gorlek: DepthsLight
  [...]
"}

### More

Less frequently needed requirements are listed in the [Advanced Requirements](/syntax#more-requirements)

## Advanced

These topics are not necessary to understand for most pathfinding work. They are important for advanced tasks, such as adding new anchors.

### requirement macros

Using `requirement` you can define custom macros that expand to a group of requirements. This is used for the [DepthsLight](/syntax#depthslight) macro

### regions

Using `region` you can apply requirements to all connections within a region.

:logic-code{code="
region WillowsEnd:
  moki: Danger=60, Regenerate  # need more than 6 health and Regen to do ANYTHING in willow
  gorlek: Regenerate
  kii: Regenerate
  unsafe: free
"}

### Anchor metadata

For most Pathfinding work, you don't have to touch the anchor metadata. However, if you plan to add a new anchor, you should consider what metadata you have to add

#### refill

If the anchor provides an opportunity to refill Health or Energy, this is described with the `refill` syntax.

:logic-code{code="
anchor MarshSpawn.Main at -799, -4310:  # spawn location / inkwater well
  refill Full
  [...]
anchor MarshPastOpher.BowPath at -494, -4294:  # checkpoint climbing up to Bow tree
  refill Checkpoint
  refill Health=1
  refill Energy=1:
    moki: BreakCrystal
  [...]
"}

The possible values are:

- `refill Full`: Refill both Health and Energy to Full
- `refill Checkpoint`: Refill by dying or reloading on a Checkpoint
- `refill Health=x`: Refill by opening one or more Health Plants
- `refill Energy=x`: Refill by breaking an Energy Crystal

Careful: With `Health=x` the amount describes the number of Health plants (all Health Plants give the same number of Health drops). With `Energy=x` the amount describes the number of energy drops from one crystal, since there are different sizes of crystals. If there are multiple energy crystals, you can write multiple `Energy=x` refills.

#### nospawn

The Fully Random Spawn setting may choose any anchor it finds in the logic file. If an anchor is not a suitable spawn location, it needs the `nospawn` keyword

:logic-code{code="
anchor DenShrine at -328, -4569:
  nospawn
  [...]
"}

#### tprestriction

By default, the seed generator assumes you are always able to teleport away since the randomizer grants teleport anywhere by default. If it is impossible to teleport away from this anchor, it needs the `tprestriction` keyword

:logic-code{code="
anchor WestHollow.HollowDrainMiddle at -197, -4275:  # At the crystal below the purple eye
  # this anchor doesn't assume drained water because that should make it usable for weird dirty water swim paths
  tprestriction:
    moki: WestHollow.UpperDrainLeverPulled OR WestHollow.FullyDrained
  [...]
"}

### More Requirements

These requirements are only rarely needed

#### Impossible

`Impossible` describes that a connection is impossible.

:logic-code{code="
anchor HeaderStates:  # States you need to resolve by using the !!set command in headers and that you can't resolve through playing
  state SkipKwolok:  # Used to logically support skipping Kwolok's fight
    moki: Impossible
  [...]
"}

#### BreakCrystal

`BreakCrystal` describes breaking an energy crystal.

:logic-code{code="
anchor MarshPastOpher.MillView at -596, -4293:  # Standing next to Opher, looking at the Millstone
  [...]
  refill Energy=3:
    moki: BreakCrystal  # to the left
  [...]
"}

#### Boss

`Boss=x` describes dealing sufficient damage to defeat a Boss with x health. Required abilities, health etc. has to be described separately.

:logic-code{code="
anchor BeetleFight at -81, -4243:
  [...]
  state EastHollow.BeetleDefeated:  # Mantis and skeeto don't respawn when dying in the fight
    moki: Boss=250, Regenerate, Damage=45, Dash  # It isn't too difficult to avoid the beetle's attacks without Dash, but this is what the base game taught.
    gorlek: Boss=250, Regenerate, Damage=35, DoubleJump OR Launch
    unsafe: Boss=250
"}

#### Danger

`Danger=x` describes being able to take x Damage, but the health won't actually be reduced. This is used exclusively in [Region definitions](/syntax#regions) to give minimum health boundaries.

:logic-code{code="
region WoodsEntry:
  moki: Danger=40, Regenerate
  [...]
"}
