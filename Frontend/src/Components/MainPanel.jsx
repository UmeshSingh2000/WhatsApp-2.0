import React, { useEffect, useState } from "react";
import {
  Lock,
  UserCircle2,
  MoreVertical,
  Search,
  Phone,
  Video,
  SendHorizontal,
  Check,
} from "lucide-react";
import socket from "../socket";
import { addMessage, groupMessage } from "../Redux/Features/messageSlice";
import { useDispatch } from "react-redux";

const MainPanel = ({ selectedChat }) => {
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')

  const sendMessage = (userId, name) => {
    if (message.trim() === '') return;

    socket.emit('send_message', { message, userId, name })
    setMessage('')
  }

  const handleMessage = async (data) => {
    await dispatch(addMessage(data))
    await dispatch(groupMessage())
  };
  useEffect(() => {

    socket.on('message_sent', handleMessage);

    return () => {
      socket.off('message_sent', handleMessage);
    };
  }, []);

  const renderMessageStatus = (status) => {
    switch (status) {
      case 'read':
        return (
          <span className="text-blue-400">
            <Check size={14} strokeWidth={3} className="inline" />
            <Check size={14} strokeWidth={3} className="inline -ml-1" />
          </span>
        );
      case 'delivered':
        return (
          <span className="text-gray-400">
            <Check size={14} strokeWidth={3} className="inline" />
            <Check size={14} strokeWidth={3} className="inline -ml-1" />
          </span>
        );
      case 'sent':
        return (
          <span className="text-gray-400">
            <Check size={14} strokeWidth={3} className="inline" />
          </span>
        );
      default:
        return null;
    }
  };

  if (!selectedChat) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center px-2 md:px-0 bg-[#161717]">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-normal mb-3 text-white">
            Download WhatsApp for Windows
          </h2>
          <p className="max-w-lg text-gray-400 mb-6 text-sm">
            Make calls, share your screen and get a faster experience when you
            download the Windows app.
          </p>
          <button className="px-8 py-2 bg-green-500 rounded-full text-white font-semibold hover:bg-green-600 transition">
            Download
          </button>

          <div className="mt-12 text-xs text-gray-400 flex items-center gap-2">
            <Lock size={14} />
            Your personal messages are end-to-end encrypted
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col h-full bg-[#0b141a]">
      {/* Chat header */}
      <div className="flex items-center justify-between bg-[#161717] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-600 flex items-center justify-center">
            {selectedChat.profilePic ? (
              <img
                src={selectedChat.profilePic}
                alt={selectedChat.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <UserCircle2 size={40} className="text-gray-300" />
            )}
          </div>
          <div>
            <div className="font-medium text-white text-[17px]">
              {selectedChat.name}
            </div>
            <div className="text-xs text-gray-400">
              last seen today at 14:30
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Video size={20} className="text-gray-300 cursor-pointer hover:text-white" />
          <Phone size={20} className="text-gray-300 cursor-pointer hover:text-white" />
          <Search size={20} className="text-gray-300 cursor-pointer hover:text-white" />
          <MoreVertical
            size={20}
            className="text-gray-300 cursor-pointer hover:text-white"
          />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 chatScreen">
        {[...selectedChat.message]
          .reverse()
          .map((msg, index, arr) => {
            const isIncoming = msg.from === selectedChat.wa_id;
            const showTail =
              index === arr.length - 1 ||
              arr[index + 1]?.from !== msg.from;

            return (
              <div
                key={msg._id}
                className={`flex items-end gap-2 ${isIncoming ? "justify-start" : "justify-end"
                  }`}
              >
                {/* Show avatar on last message of group */}
                {isIncoming && showTail && (
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-500">
                    {selectedChat.profilePic ? (
                      <img
                        src={selectedChat.profilePic}
                        alt="user"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserCircle2 size={24} className="text-gray-300" />
                    )}
                  </div>
                )}

                <div
                  className={`relative max-w-[65%] px-3 py-2 text-[14px] leading-[19px] shadow-sm
                    ${isIncoming
                      ? "bg-[#242626] text-gray-100 rounded-lg"
                      : "bg-[#144D37] text-white rounded-lg"
                    }
                  `}
                  style={{
                    borderBottomLeftRadius:
                      isIncoming && showTail ? "4px" : "12px",
                    borderBottomRightRadius:
                      !isIncoming && showTail ? "4px" : "12px",
                  }}
                >
                  <div className="break-words pr-16">{msg.body}</div>
                  <div
                    className={`absolute bottom-1 right-2 text-[11px] flex items-center gap-1 ${isIncoming ? "text-gray-400" : "text-gray-300"
                      }`}
                  >
                    <span>
                      {new Date(Number(msg.timestamp)).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {!isIncoming && (
                      <span className="ml-1">
                        {renderMessageStatus(msg.status)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Outgoing avatar */}
                {!isIncoming && showTail && (
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-500">
                    {selectedChat.myProfilePic ? (
                      <img
                        src={selectedChat.myProfilePic}
                        alt="me"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserCircle2 size={24} className="text-gray-300" />
                    )}
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* Input */}
      <div className="bg-[#161717] px-4 py-3 flex items-center gap-3">
        <button className="text-gray-400 hover:text-gray-200">😊</button>
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Type a message"
            className="w-full bg-[#242626] text-white placeholder-gray-400 rounded-lg px-4 py-2 pr-12 focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && message.trim()) {
                sendMessage(selectedChat.wa_id, selectedChat.name);
              }
            }}
          />
        </div>
        {
          message.length !== 0 ? <button className="text-gray-400 hover:text-gray-200 cursor-pointer" onClick={() => sendMessage(selectedChat.wa_id, selectedChat.name)}><SendHorizontal /></button> :
            <button className="text-gray-400 hover:text-gray-200">🎤</button>
        }
      </div>
    </main>
  );
};

export default MainPanel;