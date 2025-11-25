import { INTERNAL, memo, signal, SILENT } from "@monstermann/signals"

export const $keysToGroups = signal<ReadonlyMap<string, ReadonlySet<string>>>(new Map(), SILENT)

export const $groupsToKeys = memo<ReadonlyMap<string, ReadonlySet<string>>>(() => {
    const map = new Map<string, Set<string>>()
    for (const [key, groups] of $keysToGroups()) {
        for (const group of groups) {
            if (!map.has(group)) map.set(group, new Set())
            map.get(group)!.add(key)
        }
    }
    return map
}, INTERNAL)
