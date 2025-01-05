import BentoSection from "@/components/BentoSection";
import Navbar from "../../components/Navbar";

export default function Dashboard() {
    return (
        <div>
            <div className="">
                <Navbar />
            </div>
            <div className="bg-white h-screen ">

                <BentoSection />
            </div>
        </div>
    )
}