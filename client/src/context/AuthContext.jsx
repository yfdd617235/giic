// import { createContext, useState, useContext, useEffect } from 'react';
// import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth';
// import Cookies from 'js-cookie'

// export const AuthContext = createContext();

// export const useAuth = () => {
//     const context = useContext(AuthContext)
//     if (!context) {
//         throw new Error("useAuth nust be used within an AuthProvider")
//     }
//     return context;
// }

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [errors, setErrors] = useState([]);
//     const [loading, setLoading] = useState(true)

//     const signup = async (user) => {
//         try {
//             const res = await registerRequest(user);
//             console.log(res.data);
//             setUser(res.data);
//             setIsAuthenticated(true);
//         } catch (error) {
//             //console.log(error.response)
//             setErrors(error.response.data)
//         }
//     }

//     const signin = async (user) => {
//         try {
//             const res = await loginRequest(user)
//             console.log(res)
//             setIsAuthenticated(true);
//             setUser(res.data)
//         } catch (error) {
//             if (Array.isArray(error.response.data)) {
//                 return setErrors(error.response.data)
//             }
//             setErrors([error.response.data.message])
//         }
//     }

// const logout = () => {
//     Cookies.remove("token");
//     setIsAuthenticated(false);
//     setUser(null);
// }

//     useEffect(() => {
//         if (errors.length > 0) {
//             const timer = setTimeout(() => {
//                 setErrors([])
//             }, 5000)
//             return () => clearTimeout(timer)
//         }
//     }, [errors])

//         useEffect(() => {
//         async function checkLogin() {
//             const cookies = Cookies.get()
//             if (!cookies.token) {
//                 setIsAuthenticated(false)
//                 setLoading(false);
//                 return setUser(null)
//             }
//                 try {
//                     const res = await verifyTokenRequest(cookies.token)
//                     if (!res.data) {
//                         setIsAuthenticated(false)
//                         setLoading(false);
//                         return;
//                     } 
//                     setIsAuthenticated(true)
//                     setUser(res.data)
//                     setLoading(false)
//                 } catch (error) {
//                     setIsAuthenticated(false)
//                     setUser(null)
//                     setLoading(false)
//                 }
//             }
        
//         checkLogin();
//     }, []);

//     return (
//         <AuthContext.Provider
//             value={{
//                 signup,
//                 signin,
//                 logout,
//                 loading,
//                 user,
//                 isAuthenticated,
//                 errors
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     )
// }

import { createContext, useState, useContext, useEffect } from 'react';
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    // Register (Signup)
    const signup = async (userData) => {
        try {
            const res = await registerRequest(userData);
            // setUser(res.data);
            // setIsAuthenticated(true);
            // Cookies.set('token', res.data.token);
        } catch (error) {
            setErrors(error.response ? error.response.data : ['Server Error']);
        }
    };

    // Login (Signin)
    const signin = async (userData) => {
        try {
            const res = await loginRequest(userData);
            setUser(res.data);
            setIsAuthenticated(true);
            Cookies.set('token', res.data.token); // Store token in cookies
        } catch (error) {
            const errorMsg = Array.isArray(error.response?.data)
                ? error.response.data
                : [error.response?.data?.message || 'Server Error'];
            setErrors(errorMsg);
        }
    };

    // Logout
    const logout = () => {
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUser(null);
    };

    // Clear errors after 5 seconds
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => setErrors([]), 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    // Check if token exists and user is authenticated
    useEffect(() => {
        async function checkLogin() {
            const token = Cookies.get('token');
            if (!token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }
            try {
                const res = await verifyTokenRequest(token);
                setUser(res.data);
                setIsAuthenticated(true);
            } catch (error) {
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider
            value={{ signup, signin, logout, loading, user, isAuthenticated, errors }}
        >
            {children}
        </AuthContext.Provider>
    );
};
