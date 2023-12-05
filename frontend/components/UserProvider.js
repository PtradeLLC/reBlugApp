import React, { createContext, useContext, useState, useReducer } from 'react';

const UserContext = createContext(null);
const TeamContext = createContext();

const teamReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_TEAM_MEMBERS':
            return [...state, ...action.payload];
        default:
            return state;
    }
};

export function UserProvider({ children = null }) {
    const [providerName, setProviderName] = useState(null);
    const [user, setUser] = useState(null);
    const [teamMembers, dispatch] = useReducer(teamReducer, []);

    const updateUser = (newUser) => {
        setUser(newUser);
    };

    const updateTeamMembers = (newMembers) => {
        dispatch({ type: 'UPDATE_TEAM_MEMBERS', payload: newMembers });
    };

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

export function useUserContext() {
    return useContext(UserContext);
}

export function useTeamContext() {
    const context = useContext(TeamContext);
    if (!context) {
        throw new Error('useTeamContext must be used within a TeamProvider');
    }
    return context;
}
