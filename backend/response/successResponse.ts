
export const sucessResponse = <T>(data: T, message: string) => {

    const response = {
            status: 1,
            data,
            message
    }
    return response
}