import React from 'react';
import { Lock } from 'lucide-react';

const MainPanel = () => (
  <main className="flex-1 flex flex-col items-center justify-center px-2 md:px-0">
    <div className='flex flex-col items-center'>

      <div className="mb-6">
        <div className="w-[90vw] max-w-[250px] h-[36vw] max-h-[140px] bg-gray-800 rounded-lg flex items-center justify-center relative">
          <div className="w-[72vw] max-w-[200px] h-[28vw] max-h-[100px] bg-[#222] rounded-lg flex flex-wrap p-1">
            {[...Array(8)].map((_, idx) => (
              <div
                key={idx}
                className="w-1/4 h-1/2 p-1"
              >
                <div className="bg-gray-400 w-full h-full rounded"></div>
              </div>
            ))}
          </div>

          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[15px] bg-green-500 rounded-full p-2 border-4 border-gray-800">
            <svg height="24" width="24" viewBox="0 0 32 32" fill="#fff">
              <path d="M16 3C9.37 3 4 8.37 4 15c0 2.11.59 4.14 1.69 5.94L4 29l8.32-2.23C14.06 28.28 15.02 28.48 16 28.48c6.63 0 12-5.37 12-12S22.63 3 16 3zm0 22.48c-.79 0-1.56-.07-2.3-.19l-.82-.13-4.94 1.33 1.31-4.81-.25-.86C6.96 17.62 6.43 16.34 6.43 15c0-5.3 4.27-9.57 9.57-9.57S25.57 9.7 25.57 15c0 5.3-4.27 9.48-9.57 9.48zm5.66-7.37c-.31-.16-1.84-.9-2.12-1-.28-.1-.49-.16-.71.16-.22.31-.81 1-.99 1.21-.19.21-.37.23-.68.08-.31-.16-1.29-.48-2.47-1.53-.91-.81-1.52-1.8-1.7-2.1-.18-.31-.02-.48.14-.63.15-.15.32-.39.48-.59.15-.2.21-.34.33-.56.11-.22.06-.41-.03-.56-.09-.16-.71-1.66-.97-2.28-.26-.61-.52-.53-.71-.54-.18-.01-.4-.01-.61-.01a1.2 1.2 0 0 0-.87.41c-.3.31-1.14 1.11-1.14 2.71s1.17 3.14 1.34 3.36c.16.22 2.3 3.52 5.64 4.8 3.34 1.27 3.34.85 3.94.8.6-.05 1.93-.79 2.19-1.55.27-.76.27-1.42.19-1.55-.08-.14-.29-.22-.6-.37z" />
            </svg>
          </span>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-normal mb-3">Download WhatsApp for Windows</h2>
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

export default MainPanel;
