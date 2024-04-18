
import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
const tempMusicData = [
    {
        id: 1,
        title: "Enchanted",
        artist: "Swiftie",
        genre: "Pop",
        rating: 3,
    },
    {
        id: 2,
        title: "This Is How You Remind Me",
        artist: "Pennyback",
        genre: "Rock",
        rating: 3,
    },
    {
        id: 3,
        title: "Take Me To Your Heart",
        artist: "Michael Jackson",
        genre: "Alternative Rock",
        rating: 3,
    },
];
const tempPlaylist = [
    {
        id: 1,
        title: "Enchanted",
        artist: "Swiftie",
        genre: "Pop",
        rating: 3,
    },
    {
        id: 2,
        title: "This Is How You Remind Me",
        artist: "Pennyback",
        genre: "Rock",
        rating: 3,
    },
    {
        id: 3,
        title: "Take me to your heart",
        artist: "Michael Jackson",
        genre: "Alternative Rock",
        rating: 3,
    },
    {
        id: 4,
        title: "Around The World",
        artist: "Daft Punk",
        genre: "Alternative Rock",
        rating: 3,
    },
    {
        id: 5,
        title: "Forget Me Nots",
        artist: "Patrice Rushen",
        genre: "Disco",
        rating: 3,
    },
];

/*
Component Classifications:
- Stateless/Presentational  Has no useState
- Stateful:                 Has useState
- Structural                For structure/looks
*/


function App() {
    const [query, setQuery] = useState("");
    const [musics, setMusics] = useState(tempMusicData);
    const [playlist, setPlaylist] = useState(tempPlaylist);
    const addToPlaylist = (music) => {
        setPlaylist([...playlist, music]);
    };
    return (
        <div className="w-screen h-screen flex flex-col items-center bg-zinc-800 text-gray-300">
            <Header query={query} setQuery={setQuery} />
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-7xl w-full px-5"> */}
            <div className="max-w-7xl w-full h-full flex flex-row">
                <NavBar />
                {/* Main Content */}
                <div className="mt-5 px-5 flex-1 flex-col">
                    {/* Queue */}
                    <Box header={'Queue'} content={<MusicList musics={musics} />} />
                    {/* Playlist */}
                    <Box header={'Playlist'} content={<MusicList musics={playlist} />} />
                </div>
            </div>

        </div>
    );
}

export default App;



// Components

function NavBar() {
    return (
        <nav className="h-full">
            <ul className="flex flex-col w-full text-sm space-y-1">
                <li className="h-7 w-44 px-5 flex justify-start items-center space-x-2 border-b-0 border-l-4 border-amber-500 bg-amber-200 bg-opacity-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                    <div>Discover</div>
                </li>
                <li className="h-7 w-44 px-5 flex justify-start items-center space-x-2 border-b-0 border-l-4 border-amber-500 bg-amber-200 bg-opacity-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                    <div>Discover</div>
                </li>
            </ul>
        </nav>
    )
}

function Header() {
    return (
        <nav className="w-full max-w-7xl h-20 grid grid-cols-3 px-5 items-center">
            <LogoMedium />
            <Search />
            <SearchResultCount />
        </nav>
    );
}

function LogoMedium() {
    return (
        <h1 className="flex items-center space-x-2 text-amber-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-vinyl" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M8 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4M4 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0" />
                <path d="M9 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
            </svg>
            <div className="font-sans text-2xl font-extrabold">Spotifae</div>
        </h1>
    );
}

function Search() {
    const [query, setQuery] = useState("");
    return (
        <input
            className="h-10 px-5 rounded-md bg-zinc-700 text-sm tracking-wide"
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    )
}

function SearchResultCount({ count }) {
    if (!count) count = 0;
    return (
        <p className="text-center">Found <strong>{count}</strong> result{count !== 1 && 's'}</p>
    );
}

function Box({ content, header }) {
    return (
        <div className="mb-3">
            <h2 className="font-bold text-lg">{header}</h2>
            {content}
        </div>
    )
}

function MusicList({ musics }) {
    return (
        <ul className="mt-6">
            {musics.map((music) => (
                <MusicItem data={music} />
            ))}
        </ul>
    );
}

function MusicItem({ data }) {
    return (
        <li key={data.id} className="w-full border-none">
            <button className="w-full flex items-center space-x-3 justify-between hover:bg-slate-300 h-10">
                <div className="w-1/12">
                    <button
                        className="size-10 z-50 flex justify-center items-center text-slate-400 hover:text-black hover:bg-transparent">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="currentColor"
                            className="bi bi-play-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                        </svg>
                    </button>
                </div>
                <div className="w-5/12 text-left truncate">{data.title}</div>
                <div className="w-2/12 line-clamp-2">{data.artist}</div>
                <div className="w-2/12 line-clamp-2">{data.genre}</div>
                <button className="w-1/12 z-50 flex items-center justify-center text-slate-400 hover:text-black hover:bg-transparent">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                    </svg>
                </button>
            </button>
        </li>
    );
}
