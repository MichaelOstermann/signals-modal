import geometry from "@monstermann/unplugin-geometry/rolldown"
import signals from "@monstermann/unplugin-signals/rolldown"
import { defineConfig } from "tsdown"

export default defineConfig({
    clean: true,
    dts: true,
    entry: ["./src/index.ts"],
    format: "esm",
    unbundle: true,
    plugins: [
        geometry({}),
        signals({
            getPath: path => path.replace("src", "@signals-modal"),
        }),
    ],
})
