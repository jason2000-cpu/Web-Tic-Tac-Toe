
function PlayBox({ value, handleClick, index }) {
    return (
        <div className="">
            <button 
                onClick={()=> handleClick(index)}
                className="border-[0.01rem] border-[#2c776e] shadow-[#2c776e] shadow-md bg-gray-800 w-24 h-24 rounded-lg">
                {value === 'X' ? <img src="/static/images/cross.png" alt="X" /> : value === 'O' ? <img src="/static/images/circle.png" alt="O" /> : ''}
                </button>
        </div>
    )
}

export default PlayBox;