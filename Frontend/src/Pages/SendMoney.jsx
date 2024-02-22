import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useRef, useState } from "react";
import Backend_Url from "../../BackendUrl";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name")
  const id = searchParams.get("id");
  const [amount, setAmount] = useState();
  const [showMsg, setShowMsg] = useState(false);

  async function onInitateButtonHandler() {
    try {

      const response = await axios.post(`${Backend_Url}/account/transfer`, {
        to: id,
        amount
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      if (response.data.message) {
        setShowMsg(true)

        setTimeout(() => {
          setShowMsg(false)
        }, 4000);
      }
    } catch (error) {
      alert("amount should be less than your balance")
    }

  }
  return (
    <>
      {showMsg && <div class="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
        <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span class="sr-only">Info</span>
        <div className="text-center">
          <span class="font-medium">Transfer successfull !</span> you have successfully sent money to {name}
        </div>
      </div>}



      <div class="flex justify-center h-screen bg-gray-100">

        <div className="h-full flex flex-col justify-center">

          <Link type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ml-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" to={"/dashboard"}>{"<-"} Back to Dashboard</Link>

          <div class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
            <div class="flex flex-col space-y-1.5 p-6">
              <h2 class="text-3xl font-bold text-center">Send Money</h2>
            </div>
            <div class="p-6">
              <div class="flex items-center space-x-4">
                <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <span class="text-2xl text-white">{name[0].toUpperCase()}</span>
                </div>
                <h3 class="text-2xl font-semibold">{name}</h3>
              </div>
              <div class="space-y-4">
                <div class="space-y-2">
                  <label
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    for="amount"
                  >
                    Amount (in Rs)
                  </label>
                  <input
                    type="number"
                    onChange={e => setAmount(e.target.value)}
                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    id="amount"
                    placeholder="Enter amount"
                  />
                </div>
                <button class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white" onClick={() => onInitateButtonHandler()}>
                  Initiate Transfer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendMoney;
