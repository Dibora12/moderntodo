import PropTypes from "prop-types";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";

const Card = ({ task, deleteTask, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleEditChange = (e) => {
    if (e.target.name === "title") setEditedTitle(e.target.value);
    if (e.target.name === "description") setEditedDescription(e.target.value);
  };

  // Rotation logic: Odd index → rotate -10deg, Even index → rotate 30deg
  const rotation = index % 2 === 0 ? "rotate-[-10deg]" : "rotate-[10deg]";

  return (
    <div
      className={`relative p-4 rounded-lg shadow-md ${task.color} w-60 min-h-[150px] max-h-auto
      border border-gray-300 ${rotation} transition-transform duration-300
      ${index === 0 ? "mt-4 ml-4" : "mt-2"} // First card gets extra margin
      `}
    >
      <input type="checkbox" className="absolute top-2 left-2 w-5 h-5" />

      {isEditing ? (
        <>
          <input
            name="title"
            value={editedTitle}
            onChange={handleEditChange}
            className="w-full font-bold bg-transparent border-b border-gray-500 outline-none"
          />
          <textarea
            name="description"
            value={editedDescription}
            onChange={handleEditChange}
            className="w-full mt-2 bg-transparent border border-gray-500 rounded p-1 min-h-[80px]"
          />
          <button onClick={toggleEdit} className="mt-2 px-2 py-1 bg-blue-500 text-white rounded">
            Save
          </button>
        </>
      ) : (
        <>
          <h3 className="font-bold mt-1 ml-6">{editedTitle}</h3> {/* Title aligned correctly */}
          <p className="text-sm break-words overflow-hidden">{editedDescription}</p>
          <p className="text-xs text-gray-700 absolute bottom-2 left-2">{task.date}</p>
        </>
      )}

      <div className="absolute bottom-2 right-2 flex gap-2">
        <FaEdit className="text-gray-700 cursor-pointer" onClick={toggleEdit} />
        <FaTrash className="text-red-600 cursor-pointer" onClick={() => deleteTask(task.id)} />
      </div>
    </div>
  );
};

Card.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  deleteTask: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired, // Pass index for rotation logic
};

export default Card;