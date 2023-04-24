<template>
  <MonacoEditor
    :style="{
      minHeight: `${19 * (Array.from(code.matchAll(/\n/g)).length + 1) + 12}px`, // 19 is the height of one line, 12 is the horizontal scrollbar
    }"
    v-model="code"
    :options="{
      theme: 'vs-dark',
      readOnly: true,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      lineNumbers: 'off',
    }"
    lang="wotw-logic"
  />
</template>

<script setup lang="ts">
const props = defineProps<{ code: string }>();

const code = props.code.trim();

const monaco = useMonaco();
if (monaco) {
  monaco.editor.defineTheme("vs-dark", {
    base: "vs-dark",
    colors: {},
    inherit: true,
    rules: [
      {
        token: "identifier",
        foreground: "DCDCAA",
      },
      {
        token: "requirement",
        foreground: "CE9178",
      },
      {
        token: "requirement.meta",
        foreground: "4FC1FF",
      },
      {
        token: "refill",
        foreground: "4FC1FF",
      },
      {
        token: "placeholder",
        foreground: "404040",
      },
    ],
  });
  monaco.languages.register({
    id: "wotw-logic",
  });
  monaco.languages.onLanguage("wotw-logic", () => {
    monaco.languages.setLanguageConfiguration("wotw-logic", {
      comments: { lineComment: "#" },
      wordPattern: /\w+(\.\w+)?/,
      // couldn't get the indentation rules to work...
    });

    monaco.languages.setMonarchTokensProvider("wotw-logic", {
      keywords: [
        "anchor",
        "requirement",
        "region",
        "at",
        "nospawn",
        "tprestriction",
      ],
      connectionTypes: ["state", "quest", "pickup", "conn"],
      difficulties: ["moki", "gorlek", "kii", "unsafe"],
      energySkills: [
        "Blaze",
        "Bow",
        "Flash",
        "Grenade",
        "Sentry",
        "Shuriken",
        "Spear",
      ],
      skills: [
        "Bash",
        "Burrow",
        "Dash",
        "DoubleJump",
        "Flap",
        "Glide",
        "Grapple",
        "Hammer",
        "Launch",
        "Regenerate",
        "Seir",
        "Sword",
        "WallJump",
        "WaterBreath",
        "WaterDash",
        "Water",
      ],
      glitchesWithAmount: [
        "BlazeSwap",
        "GrenadeRedirect",
        "SentryJump",
        "SwordSJump",
        "HammerSJump",
        "SentryBreak",
        "SentryBurn",
        "SentryRedirect",
        "SentrySwap",
        "ShurikenBreak",
        "SpearJump",
      ],
      resources: [
        "Damage",
        "Danger",
        "Energy",
        "Health",
        "Keystone",
        "Ore",
        "ShardSlot",
        "SpiritLight",
      ],
      shards: [
        "Arcing",
        "Catalyst",
        "Deflector",
        "EnergyHarvest",
        "Fracture",
        "LifeHarvest",
        "Magnet",
        "Overflow",
        "Sticky",
        "TripleJump",
        "Thorn",
        "UltraBash",
        "UltraGrapple",
      ],
      teleporters: [
        "BurrowsTP",
        "DenTP",
        "DepthsTP",
        "EastPoolsTP",
        "EastWastesTP",
        "EastWoodsTP",
        "GladesTP",
        "HollowTP",
        "InnerRuinsTP",
        "MarshTP",
        "OuterRuinsTP",
        "ReachTP",
        "ShriekTP",
        "WellspringTP",
        "WestPoolsTP",
        "WestWastesTP",
        "WestWoodsTP",
        "WillowTP",
      ],
      glitches: [
        "BowCancel",
        "FlashSwap",
        "GlideHammerJump",
        "GlideJump",
        "GrenadeCancel",
        "GrenadeJump",
        "HammerBreak",
        "HammerJump",
        "LaunchSwap",
        "PauseHover",
        "RemoveKillPlane",
        "SpearBreak",
        "SwordJump",
        "Wavedash",
      ],
      enemy:
        /Mantis|Slug|WeakSlug|BombSlug|CorruptSlug|SneezeSlug|ShieldSlug|Lizard|Bat|Hornbug|Skeeto|SmallSkeeto|Bee|Nest|Crab|SpinCrab|Tentacle|Balloon|Miner|MaceMiner|ShieldMiner|CrystalMiner|ShieldCrystalMiner|Sandworm|Spiderling|EnergyRefill/,
      identifier: /\w+(?:\.\w+)?/,
      tokenizer: {
        root: [
          [/#.*/, "comment"],
          [/\[...\]/, "placeholder"],
          [/\w+\.\w+/, "identifier"],
          [/OR|[,:]/, "keyword.flow"],
          [/-?\d+, *-?\d+/, "number"],
          [
            /(\w+)=\d+/,
            {
              cases: {
                "$1@energySkills": "requirement",
                "$1@glitchesWithAmount": "requirement",
                "$1@resources": "requirement",
                "$1~Boss|BreakWall": "requirement",
              },
            },
          ],
          [/\b(free|Impossible)\b/, "requirement.meta"],
          [/\bCombat=((\d+x)?(@enemy)\+)*(\d+x)?(@enemy)\b/, "requirement"],
          [/refill/, "keyword", "@refill"],
          [
            /\w+/,
            {
              cases: {
                "@keywords": "keyword",
                "@difficulties": "requirement.meta",
                "@connectionTypes": "type",
                "@energySkills": "requirement",
                "@skills": "requirement",
                "@shards": "requirement",
                "@teleporters": "requirement",
                "@glitches": "requirement",
                "\bBreakCrystal\b": "requirement",
                "@default": "identifier",
              },
            },
          ],
        ],
        refill: [
          [/ +(Full|Checkpoint|(Energy|Health)=\d+)/, "refill", "@pop"],
          ["", "", "@pop"],
        ],
      },
    });
  });
}
</script>
