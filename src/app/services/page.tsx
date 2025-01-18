
import Navbar from "../../components/Navbar";
import data from "../../../data/contractors.json";
import ContractorsList from "@/components/ContractorList";

const contractors = data.contractors;

export default function Dashboard() {
    // implement pagination
    return (
        <div className="w-screen min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400 to-emerald-400">
        <Navbar/>
        <div className="flex flex-col justify-center items-center min-h-screen">
           
            <ContractorsList contractors={contractors} />
        </div>
       
      </div>
    );
}