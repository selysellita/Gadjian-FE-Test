export const getConvertDate = (input) => {
    if (!input) {
        return ""
    }
    const month = input.substr(5,2)
    const day = input.substr(8,2)
    // console.log(`${day} ${month}`)
    return `${day}-${month}`
}