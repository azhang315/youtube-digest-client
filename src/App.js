import React, { useEffect, useState } from 'react';
import axios from 'axios';
// PlaylistReference component
const PlaylistReference = ({ playlists, isPlaylistsLoading }) => (
  <div className="mb-8 max-h-96 overflow-y-auto border-b border-gray-300">
    <h2 className="text-lg font-bold mb-4">Playlist Reference</h2>
    {isPlaylistsLoading ? (
      <p>Loading playlists...</p>
    ) : (
      playlists.map((playlist, index) => (
        <div key={index} className="mb-2">
          {/* Display playlist item cards or descriptions */}
          {/* You can customize this part based on your playlist data */}
          {playlist}
        </div>
      ))
    )}
  </div>
);

// Response component
const Response = ({ promptResponse, isPromptLoading }) => (
  <div className="mb-8">
    <h2 className="text-lg font-bold mb-4 border-b border-gray-300">Response</h2>
    <div className="overflow-y-auto max-h-96" style={{ maxHeight: isPromptLoading || promptResponse.length === 0 ? '0px' : '48px' }}>
      {isPromptLoading ? (
        <p>Loading...</p>
      ) : promptResponse.map((item, index) => (
        <p key={index} className="text-sm">{item}</p>
      ))}
    </div>
  </div>
);

// TitleCard component
const TitleCard = ({ handleSubmit }) => (
  <div className="p-8 mb-4 max-w-md"> {/* Reduced bottom margin */}
    <h1 className="text-4xl font-bold leading-tight text-gray-900 mb-4">Digest*</h1> {/* Reduced bottom margin */}
    <form onSubmit={handleSubmit} className="mb-4 flex items-center relative"> {/* Flex container to align input and button horizontally */}
      <input
        type="text"
        className="flex-grow border border-gray-300 rounded-md py-2 px-4 mb-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 ease-in-out"
        placeholder="Ask a question..."
      />
      <button
        type="submit"
        className="bg-gray-100 text-gray-500 py-2 px-2 mb-2 rounded-md hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition-all duration-300 ease-in-out border border-gray-300"
        style={{ paddingTop: "5px", paddingBottom: "5px", marginLeft: "4px" }} // Added padding and adjusted margin to match the input field
      >
        {/* Small up arrow icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-3 transform rotate-180" viewBox="0 0 20 20" fill="currentColor"> {/* Rotated the icon 180 degrees */}
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v11.586l3.293-3.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 15.586V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      </button>
    </form>
  </div>
);



// Main App component
export default function App() {
  const [promptResponse, setPromptResponse] = useState([]);
  const [isPromptLoading, setIsPromptLoading] = useState(false);

  const [playlists, setPlaylists] = useState([]);
  const [isPlaylistsLoading, setIsPlaylistsLoading] = useState(false);

  useEffect(() => {
    // scrapePlaylists();
  }, []);

  const scrapePlaylists = async () => {
    try {
      setIsPlaylistsLoading(true);
      // Simulating delay for demonstration purposes
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Mock playlists data for demonstration
      setPlaylists(["Playlist 1", "Playlist 2", "Playlist 3"]);
      setIsPlaylistsLoading(false);
    } catch (error) {
      console.error('Error:', error.message);
      setIsPlaylistsLoading(false);
    }
  };

  const sendPrompt = async () => {
    try {
      setIsPromptLoading(true);
      // Simulating delay for demonstration purposes
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Mock response data for demonstration
      setPromptResponse(["Response 1", "Response 2", "Response 3"]);
      setIsPromptLoading(false);
    } catch (error) {
      console.error('Error:', error.message);
      setIsPromptLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    await sendPrompt();
  };

  // Function to handle loading both playlists and responses
  const handleLoadAll = async () => {
    setIsPlaylistsLoading(true);
    setIsPromptLoading(true);
    const scrapingPlaylists = scrapePlaylists();
    const sendingPrompt = sendPrompt();
    await Promise.all([scrapingPlaylists, sendingPrompt]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="container mx-auto my-10 flex flex-col justify-center items-center">
        {/* Grid State A: Just the Title/Prompt card */}
        {playlists.length === 0 && 
        <div className="grid grid-cols-1 grid-rows-1 gap-4 p-8">
          <TitleCard handleSubmit={handleSubmit} />
        </div>
        }

        {/* Grid State C: 2 rows, 3 columns */}
        {playlists.length > 0 && (
          <div className="grid grid-cols-3 grid-rows-2 gap-4 p-8">
            {/* Title/Prompt Card */}
            <div className="col-start-1 col-end-3 row-span-1 bg-red-200">
              <TitleCard handleSubmit={handleSubmit} />
            </div>

            {/* Playlist Reference Card */}
            <div className="col-start-3 col-end-3 row-span-2 bg-white">
              <PlaylistReference playlists={playlists} isPlaylistsLoading={isPlaylistsLoading} />
            </div>

            {/* Response Card */}
            <div className="col-start-1 col-end-3  row-span-1 bg-red-100">
              <Response promptResponse={promptResponse} isPromptLoading={isPromptLoading} />
            </div>
          </div>
        )}

        {/* Test Controls */}
        <div className="mb-4">
          <button
            onClick={scrapePlaylists}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-4"
          >
            {isPlaylistsLoading ? "Loading Playlists..." : "Load Playlists"}
          </button>
          <button
            onClick={sendPrompt}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-4"
          >
            {isPromptLoading ? "Loading Response..." : "Load Response"}
          </button>
          <button
            onClick={handleLoadAll}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Load All
          </button>
        </div>
      </div>
    </div>
  );
}
