import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import classes from "./Dashboard.module.css";
const Dashboard = () => {
  return (
    <div className={classes.dashboardContainer}>
      <Navbar />
      <div className={classes.content}>
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;

// Get all workspaces call to check whether any workspaces for the current user exist or not
// if not then display
