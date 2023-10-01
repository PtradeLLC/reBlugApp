import React from 'react';
import ProfilePg from "../../components/Profile";
import withAuth from '../withAuth';

const Profile = () => {
    return (
        <div>
            <ProfilePg />
        </div>
    )
}

export default withAuth(Profile)