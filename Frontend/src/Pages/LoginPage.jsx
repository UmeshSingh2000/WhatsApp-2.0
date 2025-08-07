import React, { useState } from 'react';
import countryCodes from '../Data/countryCodes';
import Select from 'react-select';
import { checkPhoneNumberExists, loginUser } from '../Services/authServices';
import toast from 'react-hot-toast';
import Loader from '../Components/Loader/Loader';
import { statusCodes } from '../Utils/statusCodes';
import { useNavigate } from 'react-router-dom';

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

const LoginPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ phoneNumber: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [isNumberVerified, setIsNumberVerified] = useState(false);
    const [selectedCode, setSelectedCode] = useState(countryOptions[0]);

    const checkPhoneNumber = async () => {
        if (!userData.phoneNumber) {
            return toast.error("Please enter a phone number");
        }
        try {
            setLoading(true);
            const response = await checkPhoneNumberExists(userData.phoneNumber);
            if (response.status === statusCodes.OK) {
                setIsNumberVerified(true);
            }
        } catch (error) {
            if (error.status === statusCodes.NOT_FOUND) {
                toast.error(error.error || "User not found, please register first");
            } else if (error.status === statusCodes.BAD_REQUEST) {
                toast.error(error.error || "Please fill all fields");
            } else {
                toast.error(error.error || "An error occurred, please try again later");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async () => {
        if (!userData.password) {
            return toast.error("Please enter your password");
        }
        try {
            setLoading(true);
            const response = await loginUser(userData);
            if (response.status === statusCodes.OK) {
                toast.success(response.message);
                setUserData({ phoneNumber: '', password: '' });
                navigate('/chat');
            }
        } catch (error) {
            console.error("Error logging in:", error);
            if (error.status === statusCodes.UNAUTHORIZED) {
                toast.error("Invalid phone number or password");
            } else if (error.status === statusCodes.BAD_REQUEST) {
                toast.error("Please fill all fields");
            } else {
                toast.error(error.error || "An error occurred, please try again later");
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="w-full px-4 py-6 flex flex-col items-center space-y-6">
            <header className="text-center">
                <h1 className="text-2xl sm:text-4xl font-semibold">Enter phone number</h1>
                <p className="text-md sm:text-xl">Select a country and enter your phone number.</p>
            </header>

            <div className="w-full max-w-md">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        isNumberVerified ? handleLogin() : checkPhoneNumber();
                    }}
                    className="flex flex-col items-center space-y-4"
                >
                    {/* Country Select */}
                    <Select
                        options={countryOptions}
                        value={selectedCode}
                        onChange={setSelectedCode}
                        styles={customStyles}
                        isSearchable
                        className="w-full text-white"
                        filterOption={(option, inputValue) =>
                            option.label.props.children[1].props.children
                                .toLowerCase()
                                .includes(inputValue.toLowerCase())
                        }
                    />

                    {/* Phone Number Input */}
                    <input
                        type="text"
                        disabled={isNumberVerified}
                        placeholder="Enter your phone number"
                        className={`w-full h-14 border border-black rounded-full px-6 py-2 text-base 
                        ${isNumberVerified ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white'}`}
                        value={userData.phoneNumber}
                        onChange={(e) =>
                            setUserData({ ...userData, phoneNumber: e.target.value })
                        }
                    />

                    {/* Password Input (Shown After Verification) */}
                    {isNumberVerified && (
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full h-14 border border-black rounded-full px-6 py-2 text-base bg-white"
                            value={userData.password}
                            onChange={(e) =>
                                setUserData({ ...userData, password: e.target.value })
                            }
                        />
                    )}

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full sm:w-28 bg-[#017561] text-white font-bold py-3 px-4 rounded-full transition active:scale-95"
                    >
                        {isNumberVerified ? 'Login' : 'Next'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
