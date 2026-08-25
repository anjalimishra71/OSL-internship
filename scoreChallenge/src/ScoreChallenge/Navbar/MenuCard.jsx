import translate from "../../assets/translate.png"
const MenuCard = ({ setIsDummyPage, setIsOpen }) => {
    return (
        <div className="lg:hidden w-full  rounded-[20px] bg-white p-[20px] shadow-[0_4px_20px_#0000001A]">


            <div className="flex flex-col items-center justify-center gap-[40px] border-b border-[#E5E5E5] pb-[16px]">
                <button className="text-[16px] font-medium text-[#181818] cursor-pointer" 
                onClick={() => { setIsDummyPage(true), setIsOpen(false) }}>
                    Pricing
                </button>

                <button className="text-[16px] font-medium text-[#181818] cursor-pointer" onClick={() => { setIsDummyPage(true), setIsOpen(false) }}>
                    Insights
                </button>
            </div>


            <div className="w-full mt-[20px] flex flex-row justify-center items-center gap-[12px]">
                <button className="w-1/2 flex justify-center items-center gap-[10px] cursor-pointer border-1 border-[#0678D4] bg-[#ffffff] rounded-[50px] px-7 py-2 text-left" >
                    <img
                        src={translate}
                        alt="translate image"
                        className="h-[20px] w-[20px]"
                    />
                    <p className="text-[14px] text-[#181818] text-bold font-extrabold">English</p>
                </button>

                <button className="w-1/2 flex justify-center items-center gap-[10px] cursor-pointer border-1 border-[#bcc1c5a3] bg-[#ffffff] rounded-[50px] px-7 py-2 text-left">
                    <img
                        src={translate}
                        alt="translate image"
                        className="h-[20px] w-[20px]"
                    />
                    <p className="text-[14px] text-[#181818] font-extrabold">Insights</p>
                </button>
            </div>


            <button className="mt-[20px] w-full rounded-[50px]  bg-[#c2bff168] py-[12px] text-[15px] font-medium text-[#0088D0] cursor-pointer hover:text-[#0f0f13a5]" onClick={() => { setIsDummyPage(true), setIsOpen(false) }}>
                Login
            </button>


            <button className="mt-[12px] w-full rounded-[50px] border border-[#0088D0] py-[12px] text-[15px] font-medium text-[#0088D0] cursor-pointer" onClick={() => { setIsDummyPage(true), setIsOpen(false) }}>
                Contact Sales
            </button>


            <button className="mt-[12px] w-full rounded-[50px] bg-[#0088D0] py-[12px] text-[15px] font-medium text-white cursor-pointer hover:bg-[#056295]" onClick={() => { setIsDummyPage(true), setIsOpen(false) }}>
                Sign up
            </button>

        </div>
    )
}

export default MenuCard;