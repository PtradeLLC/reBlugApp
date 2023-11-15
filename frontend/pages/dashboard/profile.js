import React, { useState } from 'react';
import ProfilePg from "../../components/Profile";
import withAuth from "../api/withAuth";

const Profile = () => {
    return (
        <div className='bg-white'>
            <ProfilePg />
        </div>
    )
}

export default withAuth(Profile)