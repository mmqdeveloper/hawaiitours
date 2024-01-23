export const getFullname = (firstName, lastName) => {
    if (!firstName) return "";
    if (!lastName) return "";
    return `${firstName} ${lastName}`
}