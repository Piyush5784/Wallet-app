import { useEffect } from "react";
import { Appbar } from "../components/Sign-ed-components/Appbar";
import { Balance } from "../components/Sign-ed-components/Balance";
import { Users } from "../components/Sign-ed-components/Users";
import axios from "axios";
const Dashboard = () => {

  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
