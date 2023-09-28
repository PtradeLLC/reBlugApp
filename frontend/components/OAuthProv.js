import { useProviderLink } from '@nhost/react';

const AuthPro = () => {
    const { facebook, google, twitch } = useProviderLink();

    return (
        <div className='mt-6 grid grid-cols-3 gap-4'>
            <span className="flex bg-[#9146FF] w-full items-center justify-center gap-3 rounded-md px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494a4a]"><a href={twitch}>Twitch</a></span>
            <span className="flex bg-[#4267B2] w-full items-center justify-center gap-3 rounded-md px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494a4a]"><a href={facebook}>Facebook</a></span>
            <span className="flex bg-[#DB4437] w-full items-center justify-center gap-3 rounded-md px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494a4a]"><a href={google}>Google</a></span>
        </div>
    )
}

export default AuthPro;