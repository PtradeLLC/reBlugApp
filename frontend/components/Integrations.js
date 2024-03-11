import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/20/solid';
import Vault from './Connectors/Vault';

export default function Integration() {
    const [vaultOpen, setVaultOpen] = useState(false);

    const handleVaultToggle = () => {
        setVaultOpen((prevOpen) => !prevOpen);
    };

    return (
        <>
            <h1 className='font-medium'>Integrations Catalog</h1>
            <div className='flex justify-center items-center'>
                <div>
                    {vaultOpen && <Vault />}
                </div>
                <div>
                    <button
                        onClick={handleVaultToggle}
                        type="button"
                        className="rounded-full mx-3 bg-green-600 p-2 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </>
    );
}




// import { PlusIcon } from '@heroicons/react/20/solid'
// import Vault from './Connectors/Vault';

// export default function Integration() {

//     const handleClick = () => {
//         console.log('clicked');
//     }


//     return (
//         <>
//             <h1 className='font-medium'>Integrations Catalog</h1>
//             <div className='flex justify-center items-center'>
//                 <div>
//                     <Vault />
//                 </div>
//                 <div>
//                     <button
//                         onClick={handleClick}
//                         type="button"
//                         className="rounded-full mx-3 bg-green-600 p-2 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
//                     >
//                         <PlusIcon className="h-5 w-5" aria-hidden="true" />
//                     </button>
//                 </div>
//             </div>
//         </>
//     )
// }