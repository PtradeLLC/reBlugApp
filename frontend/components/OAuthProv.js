import { useProviderLink } from '@nhost/react';
import Link from 'next/link';

const AuthPro = () => {
    const { facebook, google, twitch } = useProviderLink();


    return (
        <div className='mt-6 grid grid-cols-3 gap-4'>
            <span className="flex bg-[#9146FF] w-full items-center justify-center gap-3 rounded-md px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494a4a]"><Link href={twitch}>Twitch</Link></span>
            <span className="flex bg-[#4267B2] w-full items-center justify-center gap-3 rounded-md px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494a4a]"><Link href={facebook}>Facebook</Link></span>
            <span className="flex bg-[#DB4437] w-full items-center justify-center gap-3 rounded-md px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#494a4a]"><Link href={google}>Google</Link></span>
            {/* <div>
                <button name='twitch' type='submit' onClick={selectedProvider}>Twitch</button>
                <button name='google' type='submit' onClick={selectedProvider}>Google</button>
                <button name='facebook' type='submit' onClick={selectedProvider}>Facebook</button>
            </div> */}
        </div>

    )
}

export default AuthPro;