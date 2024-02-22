import axios from "axios";
import { useEffect, useState } from "react";
export const Balance = () => {

  const [value, setValue] = useState()

  useEffect(() => {
    async function checkUser() {
      try {
        const response = await axios.get("http://localhost:3004/api/v1/user/getMyInfo", {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          }
        })
        console.log(response)
        setValue(response.data.existingUser.balance)
      } catch (error) {
        console.log(error)
      }
    }
    checkUser()
  }, [])


  return (
    <div className="flex">
      <div className="font-bold text-lg">Your balance</div>
      <div className="font-semibold ml-4 text-lg">Rs {value}</div>
    </div>
  );
};

export default Balance;
