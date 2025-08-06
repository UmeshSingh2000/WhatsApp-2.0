import React from 'react'

const LoginPage = () => {
    return (
        <>
            <div className='w-full flex flex-col items-center p-6 space-y-6'>
                <header className='text-center'>
                    <h1 className='text-4xl'>Enter phone number</h1>
                    <p className='text-xl'>Select a country and enter your phone number.</p>
                </header>
                <div>
                    <form className='flex flex-col items-center space-y-4'>
                        <input
                            type="text"
                            placeholder="Enter your phone number"
                            className="border border-black rounded-full p-2 px-6 w-96 h-14"
                        />
                        <button
                            type="submit"
                            className="bg-[#017561] text-white font-bold px-4 py-2 rounded-full w-28 cursor-pointer mt-4"
                        >
                            Next
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginPage
