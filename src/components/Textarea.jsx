import PropTypes from "prop-types";

const TextArea = ({ label, value, onChange, maxLength }) => {
  return (
    <div className="w-full">
      <label className="block text-gray-700 text-sm font-semibold mb-1">
        {label}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder="Enter task description..."
        className="w-full border border-gray-300 rounded p-2 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {maxLength && (
        <p className="text-sm text-gray-500 mt-1">
          {value.length} / {maxLength} characters
        </p>
      )}
    </div>
  );
};

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  maxLength: PropTypes.number,
};

export default TextArea;