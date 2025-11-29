import { defineConfig } from "vitepress"
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons"

export default defineConfig({
    base: "/signals-modal/",
    description: "Composable modal management.",
    title: "signals-modal",
    markdown: {
        theme: {
            dark: "catppuccin-macchiato",
            light: "github-light-default",
        },
        config(md) {
            md.use(groupIconMdPlugin)
        },
    },
    themeConfig: {
        aside: false,
        outline: "deep",
        docFooter: {
            next: false,
            prev: false,
        },
        search: {
            provider: "local",
        },
        sidebar: [
            { base: "/Core/", text: "Core", items: [
                { link: "createModal", text: "createModal" },
                { link: "currentModal", text: "currentModal" },
                { link: "onModalDisposed", text: "onModalDisposed" },
            ] },
            { base: "/Groups/", text: "Groups", items: [
                { link: "withModalGroups", text: "withModalGroups" },
                { link: "modalGroups", text: "modalGroups" },
                { link: "getGroupsForModal", text: "getGroupsForModal" },
                { link: "getModalsForGroup", text: "getModalsForGroup" },
                { link: "getDialogs", text: "getDialogs" },
                { link: "getPopovers", text: "getPopovers" },
                { link: "getTooltips", text: "getTooltips" },
                { link: "isModalInGroup", text: "isModalInGroup" },
                { link: "isDialog", text: "isDialog" },
                { link: "isPopover", text: "isPopover" },
                { link: "isTooltip", text: "isTooltip" },
            ] },
            { base: "/Anchor/", text: "Anchor", items: [
                { link: "withAnchorElement", text: "withAnchorElement" },
                { link: "withAnchorMeasurement", text: "withAnchorMeasurement" },
                { link: "withMouseAnchor", text: "withMouseAnchor" },
                { link: "setAnchorElement", text: "setAnchorElement" },
                { link: "getAnchorElement", text: "getAnchorElement" },
                { link: "getAnchorMeasurement", text: "getAnchorMeasurement" },
            ] },
            { base: "/Floating/", text: "Floating", items: [
                { link: "withFloatingElement", text: "withFloatingElement" },
                { link: "withFloatingMeasurement", text: "withFloatingMeasurement" },
                { link: "setFloatingElement", text: "setFloatingElement" },
                { link: "getFloatingElement", text: "getFloatingElement" },
                { link: "getFloatingMeasurement", text: "getFloatingMeasurement" },
            ] },
            { base: "/Position/", text: "Position", items: [
                { link: "withBoundary", text: "withBoundary" },
                { link: "withPlacement", text: "withPlacement" },
                { link: "withPosition", text: "withPosition" },
                { link: "getModalPlacement", text: "getModalPlacement" },
                { link: "getModalPosition", text: "getModalPosition" },
            ] },
            { base: "/Status/", text: "Status", items: [
                { link: "withModalStatus", text: "withModalStatus" },
                { link: "closeAllModals", text: "closeAllModals" },
                { link: "closeLastModal", text: "closeLastModal" },
                { link: "closeModal", text: "closeModal" },
                { link: "createModal", text: "createModal" },
                { link: "getClosedModals", text: "getClosedModals" },
                { link: "getClosingModals", text: "getClosingModals" },
                { link: "getModalStatus", text: "getModalStatus" },
                { link: "getOpenedModals", text: "getOpenedModals" },
                { link: "getOpeningModals", text: "getOpeningModals" },
                { link: "getOpenModals", text: "getOpenModals" },
                { link: "getVisibleModals", text: "getVisibleModals" },
                { link: "isAnyModalClosed", text: "isAnyModalClosed" },
                { link: "isAnyModalClosing", text: "isAnyModalClosing" },
                { link: "isAnyModalOpen", text: "isAnyModalOpen" },
                { link: "isAnyModalOpened", text: "isAnyModalOpened" },
                { link: "isAnyModalOpening", text: "isAnyModalOpening" },
                { link: "isAnyModalVisible", text: "isAnyModalVisible" },
                { link: "isModalClosed", text: "isModalClosed" },
                { link: "isModalClosing", text: "isModalClosing" },
                { link: "isModalOpened", text: "isModalOpened" },
                { link: "isModalOpening", text: "isModalOpening" },
                { link: "isModalVisible", text: "isModalVisible" },
                { link: "onModalClosed", text: "onModalClosed" },
                { link: "onModalClosing", text: "onModalClosing" },
                { link: "onModalOpened", text: "onModalOpened" },
                { link: "onModalOpening", text: "onModalOpening" },
                { link: "openModal", text: "openModal" },
                { link: "setModalStatus", text: "setModalStatus" },
            ] },
            { base: "/Utils/", text: "Utils", items: [
                { link: "closeLastModalOnClickOutside", text: "closeLastModalOnClickOutside" },
                { link: "closeLastModalOnEsc", text: "closeLastModalOnEsc" },
                { link: "syncModalGroupsToBody", text: "syncModalGroupsToBody" },
            ] },
        ],
        socialLinks: [
            { icon: "github", link: "https://github.com/MichaelOstermann/signals-modal" },
        ],
    },
    vite: {
        plugins: [
            groupIconVitePlugin(),
        ],
    },
})
