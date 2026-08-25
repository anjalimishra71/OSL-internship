import drupalfitImg from "../../assets/drupalfit.png";
import iconImg from "../../assets/Icon.png";
import translateImg from "../../assets/translate.png";
import rectangle from "../../assets/Rectangle.png";
import { useState } from "react";


const Navbar = ({ isOpen, setIsOpen }) => {
    const [isLanguageOpen, setIsLanguageOpen] = useState(false)

    const [selectedLanguage,setSelectedLanguage] =useState("English")
    return (
        <>
            <nav className="w-full h-[72px] px-4 md:px-[120px] flex items-center justify-between">

                <div className="flex items-center gap-6">
                    <img
                        src={drupalfitImg}
                        alt="DrupalFit"
                        className="w-[99px] h-[24px]"
                    />

                    <img
                        src={rectangle}
                        alt="rectangle"
                        className="w-px h-[36px]  hidden lg:flex"
                    />
                    <ul className="flex items-center gap-8 hidden lg:flex">
                        <li className="font-bold  text-[12px] cursor-pointer hover:border-b-2 border-[#0098E9] hover:pb-3">Pricing</li>
                        <li className="font-bold text-[12px] cursor-pointer hover:border-b-2 border-[#0098E9] hover:pb-3">Articles</li>
                        <li className="font-bold text-[12px] cursor-pointer hover:border-b-2 border-[#0098E9] hover:pb-3">Contact</li>
                    </ul>
                </div>

                <div className="hidden lg:flex items-center gap-10">
                    <div className="flex items-center gap-6">

                        <button className="py-2 px-6 text-[12px] font-semibold cursor-pointer leading-[16px] text-[#0098E9] hover:text-[#086292]">
                            Login
                        </button>

                        <button className="flex items-center justify-center gap-2 cursor-pointer rounded-[58px] border border-[#0098E9] px-6 py-2 text-[12px] font-semibold leading-[16px] text-[#0098E9] hover:bg-[#0098E9] hover:text-white">
                            <i className="fa-regular fa-calendar w-[16px] h-[16px]"></i>
                            Book a Demo
                        </button>


                        <div className="relative">
                            <button onClick={() => setIsLanguageOpen(!isLanguageOpen)} className="flex items-center justify-center gap-1 cursor-pointer rounded-[60px] border border-[#8A8A8A] px-3 py-1.5 text-[12px] font-semibold leading-[16px]">
                                <img
                                    src={translateImg}
                                    alt="language"
                                    className="w-[11px] h-[10px]"
                                />
                                En
                                <img
                                    src={iconImg}
                                    alt="dropdown"
                                    className="w-[18px] h-[13px]"
                                />
                            </button>

                            {isLanguageOpen && (
                                <div className="absolute right-0 top-full z-50 mt-2 w-[150px] rounded-[10px] border border-[#E5E5E5] bg-white p-1 shadow-[0_4px_12px_#0000001A]">

                                    <button onClick={()=>setSelectedLanguage("English")} className="w-full rounded-[6px] px-3 py-2 text-left text-[12px] hover:bg-[#F5F5F5] flex justify-between items-center">
                                        <p> English</p>
                                        {selectedLanguage==="English" &&(<i className="fa-solid fa-check text-[#0098E9] "></i>)}
                                    </button>

                                    <button onClick={()=>setSelectedLanguage("Disbute")} className="w-full rounded-[6px] px-3 py-2 text-left text-[12px] hover:bg-[#F5F5F5] flex justify-between items-center">
                                        <p> Disbute</p>
                                       {selectedLanguage==="Disbute" &&(<i className="fa-solid fa-check text-[#0098E9] "></i>)}

                                    </button>

                                </div>
                            )}
                        </div>
                    </div>
                </div>


                <button onClick={() => setIsOpen(!isOpen)} className="flex lg:hidden items-center justify-center">
                    {isOpen ? (<i className="fa-solid fa-xmark  text-[24px]"></i>) : (
                        <i className="fa-solid fa-bars text-[24px]"></i>
                    )}

                </button>

            </nav>
        </>
    );
};

export default Navbar;