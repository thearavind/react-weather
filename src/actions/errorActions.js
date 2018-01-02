export function throwError(error) {
    return {
        type: "THROW_ERROR",
        payload: {
            ...error
        }
    }
}
