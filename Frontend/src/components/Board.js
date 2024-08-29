
import PlayBox from "../UI/PlayBox"



function Board({ board, handleClick}) {

    const row1 = board.slice(0, 3);
    const row2 = board.slice(3, 6);
    const row3 = board.slice(6, 9);

    return (
        <div className="flex justify-center h-[15rem] w-[10rem] m-5">
            <div className="flex justify-center">
                <div className=" ">
                    { row1.map((val, index) => (
                        <div className={`flex justify-center items-center rounded-l-lg border-[#f18f09] p-8 shadow- shadow-[#b5761c] ${index === 2 ? '': 'border-b-[15px]'} `}><PlayBox handleClick={handleClick} index={index}  value={val}/></div>
                    ))}
                </div>
                <div className="">
                    { row2.map((val, index) => (
                        <div className={`flex  justify-center  items-center  border-l-[15px] border-[#f18f09] p-8 shadow-lg  ${index === 2 ? '': 'border-b-[15px] shadow-[#b5761c]'}`}><PlayBox handleClick={handleClick} index={index + 3}  value={val}/></div>
                    ))}
                </div>
                <div className="">
                    { row3.map((val, index) => (
                        <div className={`flex  justify-center  items-center border-l-[15px] rounded-r-lg border-[#f18f09] p-8 shadow-[#b5761c] ${index === 2 ? '' : 'border-b-[15px] shadow-lg'}`}><PlayBox handleClick={handleClick} index={index + 6} value={val}/></div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Board