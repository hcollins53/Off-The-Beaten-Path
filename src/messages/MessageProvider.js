export const AddNewMessage = (newMessage) => {
    return fetch("http://localhost:8088/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMessage)
        })
            .then(res => res.json())
}
export const getUserSentMessages = (hikeUser) => {
    return fetch(`http://localhost:8088/messages?&senderId=${hikeUser.id}`)
    .then(res => res.json())
}
export const getUserReceivedMessages = (hikeUser) => {
    return fetch(`http://localhost:8088/messages?&receiverId=${hikeUser.id}`)
    .then(res => res.json())
}