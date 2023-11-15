import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export function UserProvider({ children = null }) {
    const [user, setUser] = useState(null);
    const [providerName, setProviderName] = useState(null);

    const updateUser = (newUser) => {
        setUser(newUser);
    };

    const updateProviderName = (newProviderName) => {
        setProviderName(newProviderName);
    };

    return (
        <UserContext.Provider value={{ user, providerName, updateUser, updateProviderName }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    return useContext(UserContext);
}


// import React, { createContext, useContext } from 'react';

// const UserContext = createContext(null);

// export function UserProvider({ children = null }) {
//     const user = null;
//     return (
//         <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
//     );
// }

// export function useUserContext() {
//     return useContext(UserContext);
// }
