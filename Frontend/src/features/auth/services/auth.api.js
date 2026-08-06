import axios from "axios"

const api = axios.create({
    // Read It Once
    // Here we wrote withCredentials true because the frontend has no permission to set cookies in the browser
    // That work is done only by the server which we did as we write true the server get's the access to send cookies 
    baseURL: "http://localhost:3000",
    withCredentials: true
})

// 🟢 REGISTER FUNCTION (Object Destructuring ke sath)
export const register = async ({ username, email, password }) => {
    try {
        const response = await api.post('/api/auth/register', {
            username,
            email,
            password
        });
        return response.data; 
    } catch (error) {
        throw error;
    }
};

// 🟢 LOGIN FUNCTION (Fix: Yahan bhi {} lagakar object destructuring add ki taaki useAuth hook se data sahi aaye)
export const login = async ({ email, password }) => {
    try {
        const response = await api.post("/api/auth/login", {
            email,
            password
        });
        return response.data;
    } catch (err) {
        throw err; // throw karne se hook ka catch block trigger hoga
    }
};

// 🟢 LOGOUT FUNCTION
export const logout = async () => {
    try {
        const response = await api.get("/api/auth/logout");
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

// 🟢 GETME FUNCTION
export const getMe = async () => {
    try {
        const response = await api.get("/api/auth/get-me");
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};