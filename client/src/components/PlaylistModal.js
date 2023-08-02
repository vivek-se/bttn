import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal } from 'react-bootstrap';
import styles from './PlaylistModal.module.css'
import axios from 'axios';


function PlaylistModal() {
    const [showModal, setShowModal] = useState(false);
  
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        fetch("http://0.0.0.0:8000/playlist/", { mode: "cors" })
        .then((res) => res.json())
        .then((data) => setPlaylist(data));
        
    }, []);

    const inputRef = useRef(null);

    function savePlaylist() {
        const name = inputRef.current.value;
        axios.post('http://0.0.0.0:8000/playlist/', { name })
          .then((response) => setPlaylist([...playlist, response.data]))
          .catch((error) => console.error(error));
          inputRef.current.value = null;
      };

  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Add to playlist
        </Button>
  
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> <span className={styles.bgcolor}> Create or Select Playlilst </span> </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type='text' placeholder='Create a Playlist' ref={inputRef}></input>
            <ul className={styles.bgcolor}>
                {playlist.map((playlist) => (
                <li key={playlist.id}>
                    {playlist.name}
                </li>
                ))}
             </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={savePlaylist}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  
export default PlaylistModal;
