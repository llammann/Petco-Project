import React from "react";
import "./../assets/style/TvModal.scss";
import { MdOutlineCancel } from "react-icons/md";

interface ModalProps {
  onClose: () => void;
}

const TvModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => {
          e.stopPropagation();
          onClose;
        }}
      >
        <div className="cancelTeam">
        <button>
          <MdOutlineCancel className="cancel" onClick={onClose} />
        </button>
        </div>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/XdFfCPK5ycw?si=0Z6v8Yq6YD35u_ai"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default TvModal;
