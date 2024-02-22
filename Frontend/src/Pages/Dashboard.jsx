import { Appbar } from "../components/Sign-ed-components/Appbar";
import { Balance } from "../components/Sign-ed-components/Balance";
import { Users } from "../components/Sign-ed-components/Users";

const Dashboard = () => {
  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={"10,000"} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
