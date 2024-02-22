import axios from "axios";
import { atom, selector } from "recoil";

const BalanceAtom = atom({
    key: "balanceAtom",
    default: selector({
        key: "balanceAtomSelector",
        get: async () => {
            try {
                const response = await axios.get("http://localhost:3004/api/v1/user/getMyInfo", {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                        "Content-Type": "application/json",
                    }
                })
                console.log(response)
            } catch (error) {
                console.log(error)
            }

            return response.data.balance;
        }
    })
})


export default BalanceAtom

