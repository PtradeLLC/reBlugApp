import { useState } from 'react';
import { useVault } from '@apideck/vault-react';

function Vault() {
    const { open } = useVault();
    const [sessionToken, setSessionToken] = useState(null);

    const handleClick = async () => {
        try {
            // Make a POST request to your API endpoint
            const response = await fetch('/api/vault_endpoint', {
                method: 'POST',
            });

            if (response.ok) {
                // Parse the JSON response
                const data = await response.json();
                console.log('Data from Vault', data);

                // Assuming your API sends the session token in the response
                const { sessionToken } = data;
                console.log('Token from Vault', sessionToken);

                // Update state with the session token
                setSessionToken(sessionToken);

                // Open the vault with the obtained session token
                open({ token: sessionToken });
            } else {
                console.error('Failed to fetch session token');
            }
        } catch (error) {
            console.error('Error fetching session token:', error);
        }
    };

    return (
        <div onClick={handleClick} style={{ cursor: 'pointer' }}>
            Open Vault

            {sessionToken && (
                <p>Session Token: {sessionToken}</p>
            )}
        </div>
    );
}

export default Vault;





// import { useState } from 'react';
// import { useVault } from '@apideck/vault-react';

// function Vault() {
//     const { open } = useVault();
//     const [sessionToken, setSessionToken] = useState(null);

//     const handleClick = async () => {
//         try {
//             // Make a POST request to your API endpoint
//             const response = await fetch('/api/vault_endpoint', {
//                 method: 'POST',
//             });

//             if (response.ok) {
//                 // Parse the JSON response
//                 const data = await response.json();
//                 console.log('Data from Vault', data);

//                 // Assuming your API sends the session token in the response
//                 const { sessionToken } = data;
//                 console.log('Token from Vault', sessionToken);

//                 // Update state with the session token
//                 setSessionToken(sessionToken);

//                 // Open the vault with the obtained session token
//                 open({ token: sessionToken });
//             } else {
//                 console.error('Failed to fetch session token');
//             }
//         } catch (error) {
//             console.error('Error fetching session token:', error);
//         }
//     };


//     return (
//         <div>
//             <button
//                 onClick={() =>
//                     open({
//                         token: sessionToken,
//                         unifiedApi: 'file-storage',
//                         serviceId: 'dropbox',
//                     })
//                 }
//             >
//                 Open Vault
//             </button>

//             {sessionToken && (
//                 <p>Session Token: {sessionToken}</p>
//             )}
//         </div>
//     );
// }

// export default Vault;
