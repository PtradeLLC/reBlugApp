import React, { useEffect, useState, useRef } from 'react';
import { useTeamContext } from './UserProvider';
import Loading from './Loading';

const TeamComponent = ({ refreshList }) => {
    const { teamMembers, updateTeamMembers } = useTeamContext();
    const [teamCount, setTeamCount] = useState([]);
    const [loading, setLoading] = useState(true);
    const [team, setTeam] = useState("There are no members of your team here");

    const latestTeamMembers = useRef(teamMembers);

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
            }

            const data = await response.json();

            if (data) {
                const fetchedTeamMembers = data.user.Team;

                if (JSON.stringify(fetchedTeamMembers) !== JSON.stringify(latestTeamMembers.current)) {
                    // Update the team members and set the team count
                    updateTeamMembers(fetchedTeamMembers);
                    setTeamCount(fetchedTeamMembers);

                    // Update the latest team members reference
                    latestTeamMembers.current = fetchedTeamMembers;
                }
            }
        } catch (error) {
            console.error('Error fetching team data:', error);
            setTeam("Failed to fetch team data");
        } finally {
            // Set loading to false after the try-catch block
            setLoading(false);
        }
    };

    const handleRemove = async (teamId) => {
        try {
            const baseUrl = "/api/delete-team";
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ memberId: teamId }),
            });

            if (!response.ok) {
                console.error('There is an error', response);
                throw new Error("Failed to remove team member");
            }

            // If the removal was successful, update the team members
            const updatedTeamMembers = teamCount.filter(person => person.id !== teamId);
            setTeamCount(updatedTeamMembers);
        } catch (error) {
            console.error('Error removing team member:', error);
            setTeam("Failed to remove team member");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Call the fetchTeam function
        fetchTeam();
    }, [updateTeamMembers, refreshList]);


    return (
        <div className='overflow-y-auto overflow-x-hidden h-44'>
            {loading && <Loading />}
            <ul role="list" className="-my-5 mt-1 divide-y divide-gray-200">
                {teamCount.length > 0 ? (
                    [...teamCount].reverse().map((person) => ( // Create a reversed copy before mapping
                        <li key={person.id} className="py-4">
                            {person?.email && (
                                <div className="flex items-center space-x-2">
                                    <div className="flex items-center flex-shrink-0">
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src={person?.image || "/images/brand.png"}
                                            alt="profile image"
                                        />
                                        <p className='mx-1 truncate'>{person?.email || person?.firstName || person?.name}</p>
                                        {person.isVerified === false ? <div className="min-w-0 flex-1">
                                            <p
                                                className="inline-flex items-center bg-white px-2.5 py-1 text-xs font-semibold text-red-700"
                                            >
                                                Inactive
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() => handleRemove(person.id)}
                                                className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            >
                                                Remove
                                            </button>

                                        </div> : <div className="min-w-0 flex-1">
                                            <button
                                                type="button"
                                                onClick={() => handleView(person.id)}
                                                className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            >
                                                View
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => handleRemove(person.id)}
                                                className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                            >
                                                Remove
                                            </button>

                                        </div>}

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
