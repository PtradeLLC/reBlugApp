import { PlusIcon } from '@heroicons/react/20/solid'

export default function Integration() {

    const handleClick = () => {
        console.log('clicked');
    }


    return (
        <>
            <h1 className='font-medium'>Integrations Catalog</h1>
            <div className='flex justify-center items-center'>
                <div>
                    <p className='font-medium'>Connect your apps to import your contact</p>
                </div>
                <div>
                    <button
                        onClick={handleClick}
                        type="button"
                        className="rounded-full mx-3 bg-green-600 p-2 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </>
    )
}
















// // IntegrationsCatalog.tsx
// import useParagonGlobal from "../pages/useParagonGlobal";
// import useParagonAuth from "../pages/api/useParagonAuth"

// function IntegrationsCatalog() {
//     // paragon is the SDK singleton or `undefined`
//     const paragon = useParagonGlobal();
//     const { user } = useParagonAuth(paragon);

//     return (<div className="catalog">
//         <h1>Integrations Catalog</h1>
//         {paragon &&
//             paragon.getIntegrationMetadata().map((integration) => {
//                 const integrationEnabled = user?.integrations?.[integration.type]?.enabled;
//                 return <div
//                     key={integration.type}
//                     onClick={() => paragon.connect(integration.type)}
//                 >
//                     <img src={integration.icon} width={20} height={20} />
//                     <p>{integration.name}</p>
//                     <p>{integrationEnabled ? "Connected" : "Not connected"}</p>
//                 </div>;
//             })}
//     </div>);
// }

// export default IntegrationsCatalog;