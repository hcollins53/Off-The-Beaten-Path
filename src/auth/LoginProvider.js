export const getLogin = (email) => {
    return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
}
export const getRegister = (user) => {
    return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
    }
    

export const findEmail = (email) => {
        return fetch(`http://localhost:8088/users?email=${email}`)
                .then(res => res.json())
}
export const getUser = (hikeUser) => {
    return fetch(`http://localhost:8088/users?id=${hikeUser.id}`)
                .then(res => res.json())
}
export const getUsers = () => {
    return fetch(`http://localhost:8088/users`)
                .then(res => res.json())
}
export const getUserProfile = (hikeUser) => {
    return fetch(`http://localhost:8088/userProfiles?_expand=user&userId=${hikeUser.id}`)
                .then(res => res.json())
}