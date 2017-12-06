export function changeViewport(viewport) {
    return {
        type: "CHANGE_VIEW_PORT",
        payload: {
            ...viewport
        }
    }
}
