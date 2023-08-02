import React, { useState, useEffect } from "react";

function Playlist() {
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        fetch("http://0.0.0.0:8000/playlist/", { mode: "cors" })
        .then((res) => res.json())
        .then((data) => setPlaylist(data));
    }, []);
      
    return(
        <>
            <ul>
                {playlist.map((playlist) => (
                <li key={playlist.id}>
                    Name: {playlist.name}, Tracks: {playlist.track_id} 
                </li>
                ))}
             </ul>
        </>
    );
}

export default Playlist;
