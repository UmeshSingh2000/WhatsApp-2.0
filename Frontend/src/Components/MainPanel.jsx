import React from 'react';
import { Lock, UserCircle2, MoreVertical, Search, Phone, Video } from 'lucide-react';

const MainPanel = ({ selectedChat }) => {
  if (!selectedChat) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center px-2 md:px-0 bg-[#0b141a]">
        <div className='flex flex-col items-center'>
          <div className="mb-6">
            <div className="w-[90vw] max-w-[250px] h-[36vw] max-h-[140px] bg-gray-800 rounded-lg flex items-center justify-center relative">
              <div className="w-[72vw] max-w-[200px] h-[28vw] max-h-[100px] bg-[#222] rounded-lg flex flex-wrap p-1">
                {[...Array(8)].map((_, idx) => (
                  <div key={idx} className="w-1/4 h-1/2 p-1">
                    <div className="bg-gray-400 w-full h-full rounded"></div>
                  </div>
                ))}
              </div>

              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[15px] bg-green-500 rounded-full p-2 border-4 border-gray-800">
                <svg height="24" width="24" viewBox="0 0 32 32" fill="#fff">
                  <path d="..." />
                </svg>
              </span>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-normal mb-3 text-white">Download WhatsApp for Windows</h2>
            <p className="max-w-lg text-gray-400 mb-6 text-sm">
              Make calls, share your screen and get a faster experience when you download the Windows app.
            </p>
            <button className="px-8 py-2 bg-green-500 rounded-full text-white font-semibold hover:bg-green-600 transition">
              Download
            </button>
          </div>

          <div className='mt-12 text-xs text-gray-400 flex items-center gap-2'>
            <Lock size={14} />
            Your personal messages are end-to-end encrypted
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center justify-between bg-[#202c33] px-4 py-3 border-b border-[#2a3942]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
            <UserCircle2 size={40} className="text-gray-300" />
          </div>
          <div>
            <div className="font-medium text-white text-[17px]">
              {selectedChat.name}
            </div>
            <div className="text-xs text-gray-400">last seen today at 14:30</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Video size={20} className="text-gray-300 cursor-pointer hover:text-white" />
          <Phone size={20} className="text-gray-300 cursor-pointer hover:text-white" />
          <Search size={20} className="text-gray-300 cursor-pointer hover:text-white" />
          <MoreVertical size={20} className="text-gray-300 cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* Messages area with background pattern */}
      <div className="flex-1 overflow-y-auto px-16 py-4 space-y-1 flex flex-col relative bg-[#0b141a]" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-opacity='0.03'%3E%3Cpolygon fill='%23ffffff' points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`,
             backgroundSize: '400px 400px'
           }}>
        
        {selectedChat.message.map((msg, index) => {
          const isIncoming = msg.from === selectedChat.wa_id;
          const showTail = index === selectedChat.message.length - 1 || 
                          selectedChat.message[index + 1]?.from !== msg.from;
          
          return (
            <div
              key={msg._id}
              className={`
                max-w-[65%] px-3 py-2 text-[14.2px] leading-[19px] relative mb-1
                ${isIncoming ?
                  'bg-[#202c33] text-gray-100 self-start rounded-tr-lg rounded-br-lg rounded-bl-lg' :
                  'bg-[#005c4b] text-white self-end rounded-tl-lg rounded-bl-lg rounded-br-lg'
                }
                ${showTail && isIncoming ? 'rounded-bl-sm' : ''}
                ${showTail && !isIncoming ? 'rounded-br-sm' : ''}
              `}
            >
              <div className="pr-12">
                {msg.body}
              </div>
              <div className={`absolute bottom-1 right-3 text-xs flex items-center gap-1 ${
                isIncoming ? 'text-gray-400' : 'text-gray-300'
              }`}>
                <span>14:30</span>
                {!isIncoming && (
                  <svg width="16" height="11" viewBox="0 0 16 11" fill="none" className="text-blue-400">
                    <path d="M11.071 0.929L4.071 7.929L1.929 5.787" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 1L9 8L6.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Message input area */}
      <div className="bg-[#202c33] px-4 py-3 flex items-center gap-3">
        <button className="text-gray-400 hover:text-gray-200">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-4.27 0-5.064-1.959-5.064-1.959l10.115 0zM7.1 6.374c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0z"/>
          </svg>
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Type a message"
            className="w-full bg-[#2a3942] text-white placeholder-gray-400 rounded-lg px-4 py-2.5 pr-12 focus:outline-none"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </button>
        </div>
        <button className="text-gray-400 hover:text-gray-200">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
          </svg>
        </button>
      </div>
    </main>
  );
};

export default MainPanel