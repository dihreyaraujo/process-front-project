import React, { Component } from "react";
import './style.css';

class CharacterModal extends Component {
  render() {
    const { character, onClose } = this.props;
    const { name, image, status, episode, location } = character;
    if (!character) return null;
    return (
      <div className="modal-overlay" data-testid="modal" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>X</button>
          <img src={image} alt={name} className="modal-image" />
          <h2>{character.name}</h2>
          <p><strong>Status:</strong> {status}</p>
          <p><strong>Episodes:</strong> {episode.length}</p>
          <p><strong>Location:</strong> {location.name}</p>
        </div>
      </div>
    );
  }
}

export default CharacterModal;
