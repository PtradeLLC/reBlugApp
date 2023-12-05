import React, { useEffect, useState, useRef } from 'react';
import { useTeamContext } from './UserProvider';

const TeamComponent = () => {
    const { teamMembers, updateTeamMembers } = useTeamContext();
    const [teamCount, setTeamCount] = useState([]);
    const [team, setTeam] = useState("There are no members of your team here");

    const latestTeamMembers = useRef(teamMembers);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const baseUrl = "/api/fetch-allTeam";

                const response = await fetch(baseUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    console.error('There is an error', response);
                    throw new Error("Failed to fetch data from the server");
                } else {
                    const data = await response.json();

                    if (data) {
                        const fetchedTeamMembers = data.user.Team;

                        // Check if the teamMembers have changed
                        if (JSON.stringify(fetchedTeamMembers) !== JSON.stringify(latestTeamMembers.current)) {
                            updateTeamMembers(fetchedTeamMembers);
                            setTeamCount(fetchedTeamMembers);
                            // Update the latestTeamMembers ref
                            latestTeamMembers.current = fetchedTeamMembers;
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching team data:', error);
            }
        };

        fetchTeam();
    }, []); // Empty dependency array to run only once on mount

    const handleModal = () => {
        console.log('modal');
    };

    return (
        <div className='overflow-y-auto h-44'>
            <ul role="list" className="-my-5 mt-1 divide-y divide-gray-200">
                {teamCount.length > 0 ? (
                    teamCount.map((person) => (
                        <li key={person.id} className="py-4">
                            {person?.email && (
                                <div className="flex items-center space-x-2">
                                    <div className="flex items-center flex-shrink-0">
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src={person?.image || "/images/brand.png"}
                                            alt="profile image"
                                        />
                                        <p className='mx-1'>{person?.email || person?.firstName || person?.name}</p>
                                        <button
                                            type='button'
                                            onClick={handleModal}
                                            className="inline-flex items-center rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        >
                                            {person.isVerified === false ? 'Inactive' : 'View'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))
                ) : (
                    <div>
                        <span>{team}</span>
                    </div>
                )}
            </ul>
        </div>
    );
};

export default TeamComponent;
