// app/dashboard/page.jsx
import DashboardComponent from "../../components/DashboardComp";

const DashboardPage = ({ user }) => {
  return (
    <>
      <div>
        <DashboardComponent />
      </div>
    </>
  );
};

export default DashboardPage;
