import todoIcon from "../assets/to-do-icon.svg";
import plusIcon from "../assets/plus-icon-2.svg";
import completedIcon from "../assets/completed-task-icon.svg";

export const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboardContent">
        <section>
          <div className="sectionHeader">
            <div className="section-name">
              <img src={todoIcon} alt="to do icon" />
              <span className="section-label">To-Do</span>
            </div>
            <button className="btn">
              <span className="btn-icon">
                <img src={plusIcon} alt="plus icon" />
              </span>
              <span className="btn-label">Add Task</span>
            </button>
          </div>
        </section>
        <section>
          <div className="sectionHeader">
            <div className="section-name">
              <img src={completedIcon} alt="status icon" />
              <span className="section-label">Completed Task</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
