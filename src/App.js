import "./App.css";
import { useState } from "react";
import Music from "./Data/Music";
import PlaylistData from "./Data/PlaylistData";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";

function App() {
    const [query, setQuery] = useState("");
    const [musics, setMusics] = useState(Music);
    const [playlist, setPlaylist] = useState(PlaylistData);
    const [searchCount, setSearchCount] = useState(0);

    const addToPlaylist = (music) => {
        // Check the song ID. send alert if it already exists
        const songExistsInPlaylist = playlist.some((song) => song.id === music.id);

        if (songExistsInPlaylist) {
            alert(`${music.title} by ${music.artist} is already in the playlist.`);
        } else {
            setPlaylist([...playlist, music]);
        }
    };

    const removeFromPlaylist = (songId) => {
        const updatedPlaylist = playlist.filter((song) => song.id !== songId);
        setPlaylist(updatedPlaylist);
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredMusics = Music.filter((music) =>
            music.title.toLowerCase().includes(searchTerm)
        );
        setMusics(filteredMusics);
        setQuery(searchTerm);
        setSearchCount((searchTerm) ? filteredMusics.length : null);
    };

    const handleSort = (param) => {
        const { column, order } = param;

        const sortedMusics = [...musics].sort((a, b) => {
            const comparison = order === "asc" ? -1 : 1; //learned something new
            switch (column) {
                case "title":
                    return comparison * a.title.localeCompare(b.title);
                case "artist":
                    return comparison * a.artist.localeCompare(b.artist);
                case "genre":
                    return comparison * a.genre.localeCompare(b.genre);
                default:
                    return 0;
            }
        });

        setMusics(sortedMusics);
    };


    return (
        <div className="w-full flex min-h-screen flex-col items-center bg-zinc-800 text-gray-300 py-3">
            <Header query={query} setQuery={setQuery} onSearch={handleSearch} searchCount={searchCount} />
            <div className="max-w-7xl w-full h-full flex flex-col md:flex-row">
                <Playlist contents={playlist} removeFromPlaylist={removeFromPlaylist} />
                {/* Main Content */}
                <div className="mt-5 px-5 flex-1 flex-col">
                    <Box header={'Songs'} onSort={handleSort} content={<MusicList musics={musics} addToPlaylist={addToPlaylist} />} />
                </div>
            </div>
        </div>
    );
}


function Playlist({ contents, removeFromPlaylist }) {
    const handleRemoveFromPlaylist = (songId) => {
        removeFromPlaylist(songId);
    };

    return (
        <div className="flex h-full flex-col text-lg w-screen md:w-auto">
            <div className="flex justify-between items-center">
                <span className="px-5 font-bold">Playlist</span>
                <span className="px-5 font-normal text-sm text-gray-500">{contents.length} songs</span>
            </div>
            <div className="px-5 mt-2">
                <hr className="border border-gray-500" />
            </div>

            <ul className="grid grid-flow-col grid-rows-3 gap-y-5 overflow-y-hidden md:overflow-y-auto md:flex md:flex-col text-sm md:space-y-0 mt-4 h-full pb-3 mx-2 md:mx-0">
                {contents.map((content, index) => (
                    <li key={content.id} className="h-10 w-80 md:w-full md:max-w-xs px-5 flex items-center space-x-4 overflow-y-hidden">
                        <div className="w-1/12 text-xs">
                            {index + 1}
                        </div>
                        <div className="flex flex-col w-10/12">
                            <span className="block">{content.title}</span>
                            <span className="block text-gray-500">{content.artist}</span>
                        </div>
                        <div className="h-full w-1/12 flex items-center justify-center" >
                            <button className="text-gray-500 hover:text-gray-200 hover:border hover:border-gray-300 rounded-full p-1" onClick={() => handleRemoveFromPlaylist(content.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                </svg>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );
}

function Header({ onSearch, searchCount }) {
    return (
        <nav className="w-full max-w-7xl h-20 grid grid-cols-3 px-5 items-center">
            <LogoMedium />
            <Search onSearch={onSearch} />
            <SearchResultCount count={searchCount} />
        </nav>
    );
}

function LogoMedium() {
    return (
        <h1 className="flex items-center space-x-2 text-amber-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-vinyl" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M8 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4M4 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0" />
                <path d="M9 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
            </svg>
            <div className="font-sans text-2xl font-extrabold">Spotifae</div>
        </h1>
    );
}

function Search({ onSearch }) {
    return (
        <input
            className="h-10 px-5 rounded-md bg-zinc-700 text-sm tracking-wide"
            type="text"
            placeholder="Search songs"
            onChange={onSearch}
        />
    )
}

function SearchResultCount({ count }) {
    if (count)
        return (
            <p className="text-center">Found <strong>{count}</strong> result{count !== 1 && 's'}</p>
        );
}

function Box({ content, header, onSort }) {
    const [currentOrder, setCurrentOrder] = useState('');
    const [currentColumn, setCurrentColumn] = useState('title')

    function doSort(column) {
        const newOrder = (currentColumn === column && currentOrder === 'asc') ? 'desc' : 'asc'; // Invert order if same column
        setCurrentColumn(column);
        setCurrentOrder(newOrder);
        onSort({ column, order: newOrder }); // Pass the updated order to onSort callback. its like handleSort address is being passed??
    }


    return (
        <div className="mb-3">
            <h2 className="font-bold text-lg">{header}</h2>
            <ul className="flex items-center space-x-3 -mb-4 justify-between">
                <li className="w-1/12"></li>
                <li className="w-5/12">
                    <button onClick={() => doSort('title')} className="flex items-center w-full h-9 hover:bg-slate-700 rounded-lg px-3 -mx-3 transition ease-in-out duration-300 transform hover:scale-105">
                        Title
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-arrow-down-up ml-4" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5" />
                        </svg>
                    </button>
                </li>
                <li className="w-2/12">
                    <button onClick={() => doSort('artist')} className="flex items-center w-full h-9 hover:bg-slate-700 rounded-lg px-3 -mx-3 transition ease-in-out duration-300 transform hover:scale-105">
                        Artist
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-arrow-down-up ml-4" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5" />
                        </svg>
                    </button>
                </li>
                <li className="w-1/12"></li>
                <li className="w-1/12">
                    <button onClick={() => doSort('genre')} className="flex items-center w-50 h-9 hover:bg-slate-700 rounded-lg px-3 -mx-3 transition ease-in-out duration-300 transform hover:scale-105">
                        Genre
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-arrow-down-up ml-4" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5" />
                        </svg>
                    </button>
                </li>
                <li className="w-1/12"></li>
            </ul>
            {content}
        </div>
    )
}

function MusicList({ musics, addToPlaylist }) {

    return (
        <ul className="mt-6 space-y-3">
            {musics.map((music) => (
                <MusicItem key={music.id} data={music} addToPlaylist={addToPlaylist} />
            ))}
        </ul>
    );
}

function MusicItem({ data, addToPlaylist }) {
    const handleAddToPlaylist = (event) => {
        addToPlaylist(data);
        event.stopPropagation();
    };

    function playAlert(song) {
        alert('Now Playing: ' + song);
    }

    return (
        <li className="w-full border-none">
            <button type="button" onClick={() => playAlert(data.title)} className="w-full flex items-center space-x-3 justify-between hover:bg-slate-700 h-12 transition ease-in-out duration-300 transform hover:scale-105">
                <div className="w-1/12 flex justify-center">
                    {/* Song Picture pero hirap maghanap data */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-play-fill z-50 flex justify-center items-center text-slate-400"
                        viewBox="0 0 16 16"
                    >
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                    </svg>
                </div>
                <div className="w-5/12 text-left truncate">{data.title}</div>
                <div className="w-2/12 line-clamp-2 text-left text-gray-400">{data.artist}</div>
                <div className="w-1/12"></div>
                <div className="w-1/12 line-clamp-2 text-left text-gray-400">{data.genre}</div>
                <button type="button" onClick={handleAddToPlaylist} className="w-1/12 z-50 size-5 flex items-center justify-center text-slate-400 hover:text-black hover:bg-transparent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                    </svg>
                </button>
            </button>
        </li>
    );
}


export default App;
