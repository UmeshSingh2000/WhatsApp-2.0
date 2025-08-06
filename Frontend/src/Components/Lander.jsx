
import lander_01 from '../assets/lander_01.svg'
import { ArrowDownToLine, Lock, MoveUpRight } from 'lucide-react';
import LoginPage from './LoginPage';

const Lander = () => {
    return (
        <main className="flex flex-col space-y-3 items-center">
            <div className="flex items-center justify-between mt-5 bg-white rounded-4xl border border-black p-6 w-[750px] max-w-full shadow-none">
                <aside className="mr-4">
                    <img
                        src={lander_01}
                        alt="Lander Illustration"

                        className="w-14 h-14"
                    />
                </aside>
                <div className="flex-1">
                    <h1 className="text-xl font-normal text-[#2e2e2e] leading-none mb-1">
                        Download WhatsApp for Windows
                    </h1>
                    <p className="text-md font-normal text-[#2e2e2e] mt-1">
                        Make calls, share your screen and get a faster experience when you download the Windows app.
                    </p>
                </div>
                <aside className="ml-4">
                    <button
                        className="bg-[#25d366] text-[#212121] text-xl cursor-pointer font-normal px-8 py-2 rounded-full flex items-center border border-black shadow-none active:scale-95 transition gap-2"
                        style={{ minWidth: 120, height: 48 }}
                    >
                        Download
                        <ArrowDownToLine />
                    </button>
                </aside>
            </div>
            <article>
                <div className="flex items-center justify-between mt-5 bg-white rounded-4xl border border-black p-6 w-[750px]  shadow-none">
                    <LoginPage />
                </div>
            </article>
            <footer className='text-center text-sm space-y-4 mt-4'>
                <h1 className='text-xl flex'>Don't have a WhatsApp account?
                    <span className='underline cursor-pointer hover:text-[#25D366] ml-2 flex items-center'>Get started  <MoveUpRight className='w-4' />
                    </span>
                </h1>
                <p className='text-gray-500 flex items-center text-bold justify-center'><Lock className='w-4' /> Your personal messages are end-to-end encrypted.</p>
            </footer>
        </main>
    )
}

export default Lander