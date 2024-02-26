import React from "react";
import "./../assets/style/SearchModal.scss"; // Import your modal styles
import { MdOutlineCancel } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

interface ModalProps {
  onClose: () => void;
}

const SearchModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="button">
          <button>
            <MdOutlineCancel className="cancel" onClick={onClose}/>
          </button>
        </div>

        <div className="detail">
          <h1>...Search Here...</h1>
          <form action="">
            <input type="text" placeholder="Type keywords here" />
            <button>
              <FaSearch className="search" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
