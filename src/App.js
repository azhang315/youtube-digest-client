import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown'
import { testPlaylist } from './data';
import { testRes } from './res';


const PlaylistReference = ({ playlists, isPlaylistsLoading }) => {
  return (
    <div className="p-4 mb-8 max-h-[600px] overflow-y-auto border border-gray-300 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Playlist Reference</h2>
      {isPlaylistsLoading ? (
        <p>Loading playlists...</p>
      ) : (
        Object.entries(playlists).map(([playlist_name, items], index) => (
          <div key={index} className="mb-2">
            <h3 className="text-lg mb-1">{playlist_name}</h3>

            {items.map((item, index) => (
              <a href={item.video_url} className='hover:opacity-90' target='_blank' rel="noreferrer">
                <div className="flex" key={index}>
                  <img src={item.thumbnail_url} alt={item.title} className="w-24 h-16 object-cover rounded-md mb-2 mr-2" />
                  <div>
                    <p className='text-sm font-bold mb-1'>{item.title}</p>
                    <p className='text-sm font-light'>{item.channel}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ))
      )}
    </div>
  )
};


const Response = ({ promptResponse, isPromptLoading, recv }) => (
  <div className="pb-10 mb-8 h-[530px] ">
    <h2 className="text-lg font-bold mb-4 border-b border-gray-300 pt-4 pb-1 px-6">Response</h2>
    <div className="overflow-y-auto max-h-[450px]">
      {isPromptLoading || !recv ?  (
        isPromptLoading ? <p className='px-6'>Loading...</p>
        : <p className='px-6'>Please enter a prompt to receive a response.</p>
      ) : (
        <div className='px-6'>
          <h3 className='text-xl font-bold mb-4 border-b '>Summary</h3>
          <p><Markdown>{promptResponse.summary}</Markdown></p>
          
          <h3 className='text-xl font-bold my-4 border-b '>Key Moments</h3>
          {
            Object.entries(promptResponse.timestamps).map(([video_id, items], index) => (
              <div key={index} className="mb-2">
                {items.length > 0 && <h3 className="text-lg font-bold">Video {index + 1}</h3>}
                
    
                {items.map((item, index) => (
                  <div key={index}>
                    <a className='text-blue-600 underline mr-2' href={item.video_url} target='_blank' rel="noreferrer">{item.Timestamp}</a>
                    <span>{item.Description}</span>
                  </div>
                ))}
              </div>
            ))
          }
        </div>
      )}
    </div>
  </div>
);


const TitleCard = ({ handleSubmit }) => (
  <div className="p-6 ">
    <h1 className="text-4xl font-bold leading-tight text-gray-900 mb-2">YouTube Digest Companion</h1>
    <p className='text-sm text-gray-700 mb-4'>Watch Later → Digest Now.</p>
    <p className='mb-2'>You're logged in as alexzhang3209@gmail.com</p>

    <form onSubmit={handleSubmit} className="mb-4 flex items-center relative">
      <input
        type="text"
        name="prompt"
        className="flex-1 border border-gray-300 rounded-md py-2 px-4 mb-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 ease-in-out"
        placeholder="Ask a question..."
      />
      <button
        type="submit"
        className="bg-gray-100 text-gray-500 py-2 px-2 mb-2 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition-all duration-300 ease-in-out border border-gray-300"
        style={{ paddingTop: "5px", paddingBottom: "5px", marginLeft: "4px" }} 
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-3 transform rotate-180" viewBox="0 0 20 20" fill="currentColor"> 
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v11.586l3.293-3.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 15.586V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      </button>
    </form>
  </div>
);


// Main App component
export default function App() {
  const [promptResponse, setPromptResponse] = useState(null);
  const [isPromptLoading, setIsPromptLoading] = useState(false);
  const [recv, setRecv] = useState(false);

  const [playlists, setPlaylists] = useState({});
  const [isPlaylistsLoading, setIsPlaylistsLoading] = useState(false);

  useEffect(() => {
    scrapePlaylists();
  }, []);

  const scrapePlaylists = async () => {
    try {
      setIsPlaylistsLoading(true);

      // sleep for one second to simulate loading
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setPlaylists(testPlaylist);
      setIsPlaylistsLoading(false);

      // const api_url = 'http://localhost:5000/initialize/';
      // await fetch(api_url)
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log(data);
      //     setPlaylists(data);
          
      //     setIsPlaylistsLoading(false);
      //   })
      //   .catch(error => {
      //     console.error('Error:', error.message)
      //     setIsPlaylistsLoading(false);
      // });
      
    } catch (error) {
      console.error('Error:', error.message);
      setIsPlaylistsLoading(false);
    }
  };

  const sendPrompt = async (prompt) => {
    try {
      setIsPromptLoading(true);

      const api_url = 'http://localhost:5000/submit_prompt/?prompt=' + encodeURIComponent(prompt);
      await fetch(api_url)
        .then(response => response.json())
        .then(data => {
          console.log(data);

          setPromptResponse(data);
          setRecv(true);
          setIsPromptLoading(false);
        })
        .catch(error => {
          console.error('Error:', error.message)
          setIsPromptLoading(false);
      });

    } catch (error) {
      console.error('Error:', error.message);
      setIsPromptLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prompt = e.currentTarget.elements.prompt.value

    await sendPrompt(prompt);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-screen-xl mx-auto mt-8 mb-10 flex flex-col justify-center items-center">
        
          <div className="grid grid-cols-3 grid-rows-3 gap-4 p-8">
            <div className="col-start-1 col-end-3 row-span-3 ">
              <div className="">
                <TitleCard handleSubmit={handleSubmit} />
              </div>

              <div className=" bg-gray-100 rounded-lg">
                <Response promptResponse={promptResponse} isPromptLoading={isPromptLoading} recv={recv} />
              </div>
            </div>

            <div className="col-start-3 col-end-3 row-span-2 bg-white">
              <PlaylistReference playlists={playlists} isPlaylistsLoading={isPlaylistsLoading} />
            </div>
          </div>
          
      </div>
    </div>
  );
}
