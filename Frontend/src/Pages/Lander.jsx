import lander_01 from '../assets/lander_01.svg';
import { ArrowDownToLine, Lock, MoveUpRight } from 'lucide-react';
import LoginPage from './LoginPage';
import Navbar from '../Components/Navbar';
import { useState } from 'react';
import RegisterPage from './RegisterPage';

const Lander = () => {
    const [activePage, setActivePage] = useState('login');

    const handleActivePage = (page) => {
        setActivePage(page);
        document.title = `WhatsApp - ${page.charAt(0).toUpperCase() + page.slice(1)}`;
    };

    return (
        <>
            <Navbar />
            <main className="flex flex-col space-y-6 items-center px-4 py-6">
                {/* Download Banner */}
                <div className="flex flex-col lg:flex-row items-center justify-between bg-white rounded-3xl border border-black p-4 md:p-6 w-full max-w-4xl shadow-none space-y-4 lg:space-y-0">
                    <aside className="flex-shrink-0">
                        <img src={lander_01} alt="Lander Illustration" className="w-14 h-14" />
                    </aside>

                    <div className="flex-1 text-center lg:text-left lg:px-4">
                        <h1 className="text-lg md:text-xl font-semibold text-[#2e2e2e]">
                            Download WhatsApp for Windows
                        </h1>
                        <p className="text-sm md:text-md text-[#2e2e2e] mt-1">
                            Make calls, share your screen and get a faster experience when you download the Windows app.
                        </p>
                    </div>

                    <aside className="flex-shrink-0">
                        <button
                            className="bg-[#25d366] text-[#212121] text-base md:text-lg font-normal px-6 py-2 rounded-full flex items-center border border-black shadow-none active:scale-95 transition gap-2"
                            style={{ minWidth: 120 }}
                        >
                            Download
                            <ArrowDownToLine />
                        </button>
                    </aside>
                </div>

                {/* Login/Register Section */}
                <article className="w-full max-w-4xl bg-white rounded-3xl border border-black p-4 md:p-6 shadow-none">
                    {activePage === 'register' ? <RegisterPage /> : <LoginPage />}
                </article>

                {/* Footer */}
                <footer className="text-center text-sm space-y-4 mt-4 mb-4 px-4">
                    <h1 className="text-lg md:text-xl flex flex-wrap justify-center">
                        Don't have a WhatsApp account?
                        <span
                            onClick={() => handleActivePage('register')}
                            className="underline cursor-pointer hover:text-[#25D366] ml-2 flex items-center"
                        >
                            Get started <MoveUpRight className="w-4 ml-1" />
                        </span>
                    </h1>
                    <p className="text-gray-500 flex items-center justify-center">
                        <Lock className="w-4 mr-1" />
                        Your personal messages are end-to-end encrypted.
                    </p>
                </footer>
            </main>
        </>
    );
};

export default Lander;
