import { useState } from "react"

const DummyPage = ({setIsDummyPage}) => {
    return (
        <div className="w-full h-[1000px] flex flex-col justify-center items-center gap-5">
             <h2 className="text-[36px] font-bold"> Thank You for visiting </h2>
           <button onClick={()=>setIsDummyPage(false)} className="p-5 bg-[#2214ea] text-[#ffffff] rounded-2xl">Back To Page</button>
        </div>
    )
}
export default DummyPage;