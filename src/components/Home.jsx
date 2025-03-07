// src/components/Home.jsx
import { useState } from "react";
import Card from '../components/Card';
import TextArea from "./Textarea"; // Import the new component
import bgImage1 from "../assets/image1.jpg";
import bgImage2 from "../assets/image2.jpg"
import InputField from "./InputField";
import Button from "./Button";
import bridgeBg from "../assets/bridge.jpg"; // Import bridge image

const colors = ["bg-yellow-400", "bg-green-500", "bg-pink-400", "bg-blue-400", "bg-orange-500", "bg-red-500"];

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const addTask = () => {
    if (!title.trim()) return;

    const date = new Date().toLocaleDateString();
    const newTask = {
      id: Date.now(),
      title,
      description,
      date,
      color: colors[tasks.length % colors.length],
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
  };

  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  return (
    <div className="flex w-full min-h-screen">
      {/* Left Panel */}
      <div className="w-1/4 flex flex-col justify-center items-center bg-cover bg-center p-6" style={{ backgroundImage: `url(${bgImage1})` }}></div>
          <div className="w-11/12 p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
          <form onSubmit={handleSubmit} className="space-y-3" autoComplete="off">
          <InputField
            label="Task Title"
            value={title}
            onChange={handleTitleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
          <TextArea
            label="Task Description"
            value={description}
            onChange={handleDescriptionChange}
            maxLength={300}
          />
          <div className="flex w-full mt-4 space-x-2">
            <Button text="Add" onClick={addTask} className="w-1/2 bg-blue-500 px-4 py-2 text-white rounded shadow" />
            <Button text="Clear All" onClick={() => setTasks([])} className="w-1/2 bg-red-500 px-4 py-2 text-white rounded shadow" />
          </div>
          </form>
        </div>
      </div>
  );

      {/* Bridge Section */}
      <div className="w-[40px] bg-cover bg-center" style={{ backgroundImage: `url(${bridgeBg})` }}></div>

      {/* Task List Section */}
      <div className="w-3/4 flex flex-col items-center py-10 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage2})` }}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl mt-4">
          {tasks.map((task, index) => (
            <Card key={task.id} task={task} deleteTask={deleteTask} index={index} />
          ))}
        </div>
        </div>
};

export default Home;