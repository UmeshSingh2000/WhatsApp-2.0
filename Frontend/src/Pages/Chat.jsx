import React, { useState } from 'react';

import { Menu } from 'lucide-react';
import MainPanel from '../Components/MainPanel';
import Sidebar from '../Components/Sidebar';

const Chat = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#161717] h-screen flex relative text-white overflow-hidden">

      <button
        onClick={() => setOpen(true)}
        className="absolute z-30 top-4 left-4 md:hidden bg-[#222424] rounded-full p-2 shadow"
        aria-label="Open sidebar"
      >
        <Menu size={24} />
      </button>

      <Sidebar open={open} onClose={() => setOpen(false)} />

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
