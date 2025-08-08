import React, { useEffect, useState } from 'react';

import { Menu } from 'lucide-react';
import MainPanel from '../Components/MainPanel';
import Sidebar from '../Components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMessage, groupMessage } from '../Redux/Features/messageSlice';


const Chat = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const { groupedChat } = useSelector((state) => state.message)

    const fetch = async () => {
        await dispatch(fetchMessage());
        await dispatch(groupMessage());
    }
    useEffect(() => {
        if (!groupedChat) {
            fetch();
        }
    }, [dispatch, groupedChat])

    return (
        <div className="bg-[#161717] h-screen flex relative text-white overflow-hidden">

            <button
                onClick={() => setOpen(true)}
                className="absolute z-30 top-4 left-4 md:hidden bg-[#222424] rounded-full p-2 shadow"
                aria-label="Open sidebar"
            >
                <Menu size={24} />
            </button>

            <Sidebar chats={groupedChat} open={open} onClose={() => setOpen(false)} />

            <MainPanel />

            {open && (
                <div
                    onClick={() => setOpen(false)}
                    className="fixed z-20 inset-0 bg-black/50 md:hidden"
                />
            )}
        </div>
    );
};

export default Chat;
