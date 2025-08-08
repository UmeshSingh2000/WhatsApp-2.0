import React, { useEffect } from 'react';
import { Bell, Plus, Search, UserCircle2, X } from 'lucide-react';



const Sidebar = ({ open, onClose, chats }) => {
  console.log(chats)
  return (
    <aside
      className={`
        fixed z-30 top-0 left-0 h-full w-[85vw] max-w-xs bg-[#222424]
        flex flex-col border-r border-gray-700 transition-transform duration-200
        ${open ? 'translate-x-0' : '-translate-x-full'}
        md:static md:translate-x-0 md:w-[375px] md:max-w-none md:z-auto
      `}
    >

      <button className="absolute top-4 right-4 md:hidden" onClick={onClose} aria-label="Close sidebar">
        <X size={28} />
      </button>


      <div className="flex items-center p-4 gap-4">
        <UserCircle2 size={36} className="text-gray-400" />
        <span className="font-semibold text-lg flex-1">WhatsApp</span>
        <button className="p-2 hover:bg-[#161717] rounded hidden md:block">
          <Plus size={20} />
        </button>
        <button className="p-2 hover:bg-[#161717] rounded hidden md:block">
          <Bell size={20} />
        </button>
      </div>


      <div className='px-4'>
        <div className='bg-[#161717] rounded flex items-center space-x-2 px-3 py-2'>
          <Search className='text-gray-400' size={18} />
          <input
            className='bg-transparent focus:outline-none text-sm w-full'
            placeholder='Search or start a new chat'
          />
        </div>
        <div className='flex my-3 space-x-2 text-xs font-semibold text-gray-400'>
          <button className='px-2 py-1 rounded bg-[#161717] text-white'>All</button>
          <button className='px-2 py-1 rounded'>Unread</button>
          <button className='px-2 py-1 rounded'>Favourites</button>
          <button className='px-2 py-1 rounded'>Groups</button>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto px-2'>
        {chats && chats.length > 0 ? (
          chats.map((chat) => (
            <div key={chat._id} className='flex items-center space-x-3 p-2 hover:bg-[#161717] rounded cursor-pointer'>
              <UserCircle2 size={40} className='text-gray-400' />
              <div className='flex-1'>
                <div className='font-semibold'>{chat.name}</div>
                <p className='text-xs text-gray-500'>{chat.wa_id}</p>
                <div className='text-sm text-gray-500'>{chat?.message[0]?.body?.slice(0, 40) + '...'}</div>
              </div>
            </div>
          ))
        ) : (
          <div className='text-center text-gray-500 mt-4'>No chats available</div>
        )}
      </div>

    </aside>
  );
};

export default Sidebar;
