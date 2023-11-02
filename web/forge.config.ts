import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerDMG } from "@electron-forge/maker-dmg";
import { MakerZIP } from "@electron-forge/maker-zip";
import { VitePlugin } from "@electron-forge/plugin-vite";

const config: ForgeConfig = {
  packagerConfig: {
    osxSign: {
      identity: "Apple Development: 奕泰 方 (963D9Q5ZCX)",
    },
  },
  rebuildConfig: {},
  makers: [
    new MakerDMG({}),
    new MakerZIP({}, ["darwin"]),
    new MakerSquirrel({
      authors: "SJ Food",
    }),
  ],
  plugins: [
    new VitePlugin({
      build: [
        {
          entry: "electron/main.ts",
          config: "vite.config.ts",
        },
        {
          entry: "electron/preload.ts",
          config: "vite.config.ts",
        },
      ],
      renderer: [
        {
          name: "main_window",
          config: "vite.config.ts",
        },
      ],
    }),
  ],
};

export default config;
