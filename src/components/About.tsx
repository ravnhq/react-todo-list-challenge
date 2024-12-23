import { Info, Sparkle, Hammer } from 'lucide-react'; 

export const About = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center mb-6">
        <Info className="mr-2 text-[#121212]" /> 
        <h1 className="text-3xl font-bold text-[#121212]">About To Do App</h1>
      </div>
      
      <div className="space-y-4 text-[#121212]">
        <section>
          <h2 className="text-xl font-semibold mb-2">Project Overview</h2>
          <p>
            This is a Todo App designed to help users manage and organize their tasks efficiently. Built with React, TypeScript, Tailwind, React Hook Forms, and Zod, the app includes features like priority levels, story points, and due dates to provide a comprehensive task management experience.
          </p>
        </section>

        <div className="flex flex-col md:flex-row gap-4">
          <section className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/2">
            <div className="flex items-center justify-center mb-4">
              <Sparkle className="mr-2 text-[#121212]" /> 
              <h2 className="text-xl font-semibold">Key Features</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>Task creation with validation</li>
              <li>Priority levels (Urgent, High, Normal, Low)</li>
              <li>Story point estimation</li>
              <li>Task assignment</li>
              <li>Due date tracking</li>
            </ul>
          </section>

          <section className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/2">
            <div className="flex items-center justify-center mb-4">
              <Hammer className="mr-2 text-[#121212]" /> 
              <h2 className="text-xl font-semibold">Technologies Used</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>React with TypeScript</li>
              <li>React Hook Form for form handling</li>
              <li>Zod for schema validation</li>
              <li>Tailwind CSS for styling</li>
              <li>Local Storage for data persistence</li>
            </ul>
          </section>
        </div>

        <section>
          <h2 className="text-xl font-semibold mb-2">Developed by</h2>
          <p>
            <a href="https://github.com/victor0899" className="text-[#9AA6B2]" target="_blank" rel="noopener noreferrer">
              Victor Rodriguez
            </a> for{" "}
            <a href="https://www.ravn.co" className="text-[#9AA6B2]" target="_blank" rel="noopener noreferrer">
              RAVN
            </a> Nerdery Program Dec 23, 2024
          </p>
        </section>
      </div>
    </div>
  );
};
