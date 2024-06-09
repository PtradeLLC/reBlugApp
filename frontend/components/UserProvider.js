import React, { createContext, useContext, useState, useReducer } from 'react';
import PropTypes from 'prop-types';

// Creating User and Team contexts
const UserContext = createContext(null);
const TeamContext = createContext();

// Reducer function for managing team state
const teamReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_TEAM_MEMBERS':
            return [...state, ...action.payload];
        default:
            return state;
    }
};

// UserProvider component
export function UserProvider({ children }) {
    const [providerName, setProviderName] = useState(null);
    const [user, setUser] = useState(null);
    const [teamMembers, dispatch] = useReducer(teamReducer, []);

    // Function to update user state
    const updateUser = (newUser) => {
        setUser(newUser);
    };

    // Function to update team members state
    const updateTeamMembers = (newMembers) => {
        dispatch({ type: 'UPDATE_TEAM_MEMBERS', payload: newMembers });
    };

    // Function to update provider name state
    const updateProviderName = (newProviderName) => {
        setProviderName(newProviderName);
    };

    return (
        <UserContext.Provider value={{ user, providerName, updateUser, updateProviderName }}>
            <TeamContext.Provider value={{ teamMembers, updateTeamMembers }}>
                {children}
            </TeamContext.Provider>
        </UserContext.Provider>
    );
}

// Define prop types for UserProvider
UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Custom hook to use UserContext
export function useUserContext() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
}

// Custom hook to use TeamContext
export function useTeamContext() {
    const context = useContext(TeamContext);
    if (!context) {
        throw new Error('useTeamContext must be used within a TeamProvider');
    }
    return context;
}



// import React, { createContext, useContext, useState, useReducer } from 'react';

// const UserContext = createContext(null);
// const TeamContext = createContext();

// const teamReducer = (state, action) => {
//     switch (action.type) {
//         case 'UPDATE_TEAM_MEMBERS':
//             return [...state, ...action.payload];
//         default:
//             return state;
//     }
// };

// export function UserProvider({ children = null }) {
//     const [providerName, setProviderName] = useState(null);
//     const [user, setUser] = useState(null);
//     const [teamMembers, dispatch] = useReducer(teamReducer, []);

//     const updateUser = (newUser) => {
//         setUser(newUser);
//     };

//     const updateTeamMembers = (newMembers) => {
//         dispatch({ type: 'UPDATE_TEAM_MEMBERS', payload: newMembers });
//     };

//     const updateProviderName = (newProviderName) => {
//         setProviderName(newProviderName);
//     };

//     return (
//         <UserContext.Provider value={{ user, providerName, updateUser, updateProviderName }}>
//             <TeamContext.Provider value={{ teamMembers, updateTeamMembers }}>
//                 {children}
//             </TeamContext.Provider>
//         </UserContext.Provider>
//     );
// }

// export function useUserContext() {
//     return useContext(UserContext);
// }

// export function useTeamContext() {
//     const context = useContext(TeamContext);
//     if (!context) {
//         throw new Error('useTeamContext must be used within a TeamProvider');
//     }
//     return context;
// }
