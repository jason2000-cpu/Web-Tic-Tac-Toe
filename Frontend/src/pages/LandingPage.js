import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopupForm from "../components/PopupForm";

function LandingPage() {
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const player = localStorage.getItem('player1');


    const togglePopup = () => {
        // player === undefined ? setIsOpen(!isOpen) : navigate('/home');
        setIsOpen(!isOpen);
      };

    return (
        <div className="flex h-full">
            <div className=" w-1/2 space-y-20 mt-10">
                <img src="/static/images/vanguard.png" alt="logo" />
                <div className="m-8 space-y-4">
                    <div className="flex justify-center">
                        <button onClick={togglePopup} className="bg-[#EF4C01] p-2 w-44 font-bold rounded-xl">
                            PLAY NOW
                        </button>
                    </div>
                    <div className="">
                        <p className="text-xl font-mono"> 
                        Welcome to Tic Tac Toe Online! Challenge your friends or test 
                        your skills against the AI in this classic game of strategy. 
                        Simple, fun, and quick—whether you're a beginner or a seasoned 
                        player, enjoy endless rounds of Tic Tac Toe right here in your browser!.</p>
                    </div>
                </div>
            </div>
            <div className="w-1/2  flex justify-center items-center">
                <img src="/static/images/board.png" alt="play board" className="h-fit" />
            </div>
            <PopupForm isOpen={isOpen} setIsOpen={setIsOpen} togglePopup={togglePopup} />
        </div>
        
    )
}

export default LandingPage;