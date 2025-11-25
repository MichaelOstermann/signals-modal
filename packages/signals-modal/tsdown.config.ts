import fn from "@monstermann/unplugin-fn/rolldown"
import signals from "@monstermann/unplugin-signals/rolldown"
import { defineConfig } from "tsdown"

export default defineConfig({
    clean: true,
    dts: true,
    entry: ["./src/index.ts"],
    format: "esm",
    unbundle: true,
    plugins: [
        fn({}),
        signals({
            getPath: path => path.replace("src", "@signals-modal"),
        }),
    ],
})
