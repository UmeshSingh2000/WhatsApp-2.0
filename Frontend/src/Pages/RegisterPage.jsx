import React, { useState } from 'react';
import Select from 'react-select';
import countryCodes from '../Data/countryCodes';
import toast from 'react-hot-toast';
import { registerUser } from '../Services/authServices';
import { statusCodes } from '../Utils/statusCodes';
import Loader from '../Components/Loader/Loader';

// Create options with emoji flags
const countryOptions = countryCodes.map((country) => ({
    label: (
        <div className="flex items-center gap-2">
            <span>{country.emoji}</span>
            <span>{country.name}</span>
            <span className="ml-auto text-gray-500">{country.code}</span>
        </div>
    ),
    value: country.code,
}));

const customStyles = {
    control: (base) => ({
        ...base,
        backgroundColor: '#1e1e2f',
        borderColor: '#3b3b4f',
        color: 'white',
        height: 56,
        paddingLeft: 8,
        borderRadius: '9999px',
    }),
    menu: (base) => ({
        ...base,
        backgroundColor: '#1e1e2f',
        color: 'white',
    }),
    option: (base, { isFocused, isSelected }) => ({
        ...base,
        backgroundColor: isSelected
            ? '#017561'
            : isFocused
                ? '#2d2d40'
                : 'transparent',
        color: 'white',
        padding: 10,
    }),
    singleValue: (base) => ({
        ...base,
        color: 'white',
    }),
};


const RegisterPage = () => {
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
        phoneNumber: '',
        fullName: '',
        password: ''
    })
    const [selectedCode, setSelectedCode] = useState(countryOptions[0]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userData.phoneNumber || !userData.fullName || !userData.password) {
            toast.error("Please fill all fields");
            return;
        }
        try {
            setLoading(true);
            const data = {
                phoneNumber: userData.phoneNumber,
                name: userData.fullName,
                password: userData.password,
                countryCode: selectedCode.value
            };
            const res = await registerUser(data);
            if (res.status === statusCodes.CREATED) {
                toast.success(res.message);
                setUserData({
                    phoneNumber: '',
                    fullName: '',
                    password: ''
                });
                setSelectedCode(countryOptions[0]);
            }
        } catch (error) {
            if (error.status === statusCodes.CONFLICT) {
                toast.error("User already exists");
            } else if (error.status === statusCodes.BAD_REQUEST) {
                toast.error("Please fill all fields");
            } else {
                toast.error(error.error || "An error occurred, please try again later");
            }
            console.error("Registration error:", error);
        }
        finally {
            setLoading(false);
        }
    }
    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <div className='w-full flex flex-col items-center p-6 space-y-6'>
            <header className='text-center'>
                <h1 className='text-4xl'>Register your phone</h1>
                <p className='text-xl'>Select a country, enter your phone number, name, and password.</p>
            </header>

            <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col items-center space-y-4'>
                {/* Country Code Dropdown */}
                <Select
                    options={countryOptions}
                    value={selectedCode}
                    onChange={setSelectedCode}
                    styles={customStyles}
                    isSearchable
                    className="w-96 text-white"
                    filterOption={(option, inputValue) =>
                        option.label.props.children[1].props.children
                            .toLowerCase()
                            .includes(inputValue.toLowerCase())
                    }
                />

                {/* Phone Number Input */}
                <input
                    type="text"
                    placeholder="Enter your phone number"
                    className="border border-black rounded-full p-2 px-6 w-96 h-14"
                    value={userData.phoneNumber}
                    onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
                />

                {/* Full Name Input */}
                <input
                    type="text"
                    placeholder="Full Name"
                    className="border border-black rounded-full p-2 px-6 w-96 h-14"
                    value={userData.fullName}
                    onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                />

                {/* Password Input */}
                <input
                    type="password"
                    placeholder="Password"
                    className="border border-black rounded-full p-2 px-6 w-96 h-14"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-[#017561] text-white font-bold px-4 py-2 rounded-full w-28 cursor-pointer mt-4"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
