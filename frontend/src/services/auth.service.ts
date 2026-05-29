import api from "./api"

export const signup = (fullName: string, email: string, password: string) => {
    return api.post('/auth/signup', { fullName, email, password });
}

export const login = (email: string, password: string) => {
    return api.post('/auth/login', { email, password });
}