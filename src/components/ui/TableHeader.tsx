export default function TableHeader() {
  return (
    <li className="border-accent mb-4 flex w-3/4 items-center justify-between px-2 font-semibold">
      <div className="w-1/4 text-left">Task</div>
      <div className="w-1/4 text-center">Story Points</div>
      <div className="w-1/4 text-center">Assignee</div>
      <div className="w-1/4 text-right">Due Date</div>
    </li>
  );
}
