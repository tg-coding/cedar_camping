const initialState = {
    user: {}
}

const GET_USER = 'GET_USER'

export const getUser = (user) => {
    return {
        type: GET_USER,
        payload: user
    }
}

export default function reducer (state = initialState, action){
    const {type, payload} = action
    switch(type){
        case GET_USER:
            return {user: payload}
        default:
            return state
    }
}