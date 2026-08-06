import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
// 💡 Safe side ke liye getMe bhi import kar liya aur .js extension rakha hai
import { login, register, logout, getMe } from "../services/auth.api.js"; 

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    const { user, setUser, loading, setloading } = context;

    const handleLogin = async ({ email, password }) => {
        try {
            setloading(true);
            const data = await login({ email, password });
            if (data && data.user) {
                setUser(data.user);
            }
            return data;
        } catch (error) {
            throw error; 
        } finally {
            setloading(false); 
        }
    };

    const handleRegister = async ({ username, email, password }) => {
        console.log("Hook ke andar handleRegister trigger hua!", { username, email, password });
        try {
            setloading(true); 
            const data = await register({ username, email, password });
            
            console.log("API se response aaya:", data);

            if (data && data.user) {
                setUser(data.user);
                return data;
            } else if (data) {
                setUser(data);
                return data;
            }
        } catch (error) {
            console.error("Hook ke andar error pakdi gayi:", error);
            throw error;
        } finally {
            setloading(false);
        }
    };

    const handleLogout = async () => {
        try {
            setloading(true); 
            await logout();
            setUser(null);
        } catch (error) {
            throw error;
        } finally {
            setloading(false);
        }
    };

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                if (typeof getMe === "function") {
                    const data = await getMe();
                    if (data && data.user) {
                        setUser(data.user);
                    }
                }
            } catch (err) {
                console.error("User fetch error:", err);
            } finally {
                // 🔴 FIXED: 'False' ko 'false' (lowercase) kar diya
                setloading(false);
            }
        };

        getAndSetUser();
    }, []);

    return { user, loading, handleRegister, handleLogin, handleLogout };
};