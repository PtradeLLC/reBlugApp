import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [providerName, setProviderName] = useState(null);

    const logIn = () => {
        setIsAuthenticated(true);
    };

    const logOut = () => {
        setIsAuthenticated(false);
        setProviderName(null); // Reset providerName on logout
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, providerName, logIn, logOut, setProviderName }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
export { useAuth };



// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     const logIn = () => {
//         setIsAuthenticated(true);
//     };
//     const logOut = () => {
//         setIsAuthenticated(false);
//     };

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, logIn, logOut }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// const useAuth = () => {
//     return useContext(AuthContext);
// };

// export default AuthProvider;
// export { useAuth }; 
