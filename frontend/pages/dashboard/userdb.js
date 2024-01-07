import { Fragment, useState, useEffect, createContext, Suspense, useRef } from "react";
import DatabaseTable from '../../components/DatabaseTable'
import Loading from "../../components/Loading";

const UserDb = () => {

    return (
        <Suspense fallback={<Loading />}>
            <div className="min-h-full overflow-hidden bg-white py-16 sm:py-16">
                <DatabaseTable />
            </div >
        </Suspense >
    )
}

export default UserDb