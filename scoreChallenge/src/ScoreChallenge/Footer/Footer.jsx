import logo from "../../assets/Logo.png"
import Button from "../../assets/Button.png"
import Icons from "../Icons/Icons";

const Footer = () => {
    return (

        <footer className="w-full border-t border-[#0088D0] bg-[linear-gradient(135deg,#0678D4,#015FAB)] lg:px-[120px] pt-[80px] px-[5px]">


            <div className="flex flex-col items-start justify-between gap-[32px] border-b border-[#0678D4] pb-[40px] md:flex-col  md:items-start lg:flex-row lg:items-center md:gap-0 md:pb-[56px]">

                <div className="flex flex-col">
                    <h3 className="text-[28px] font-[700] leading-[44px]
                     text-[#FFFFFF] md:text-[36px]">
                        See the power of
                    </h3>

                    <img
                        className="mt-[8px] h-[74px] w-[312px]"
                        src={logo}
                        alt="DrupalFit logo"
                    />
                </div>


                <div className="flex w-full flex-col md:justify-between gap-[12px] rounded-[20px] md:h-[64px] md:w-[600px] md:flex-row md:items-center md:gap-0 md:rounded-[58px] md:border md:border-[#E5E5E5] md:bg-white md:p-[10px_12px] md:shadow-[0_4px_12px_#1818181A]">

                    <div className="flex h-[64px] w-full justify-start items-center lg:items-center rounded-[58px] border border-[#E5E5E5] bg-white p-[10px_12px] md:h-auto md:w-auto md:rounded-none md:border-0 md:p-0">

                        <img
                            className="h-[40px] w-[40px]"
                            src={Button}
                            alt="global"
                        />

                        <p className="ml-[12px] text-[16px] font-[500] leading-[24px] text-[#383838]">
                            Enter website URL
                        </p>

                    </div>

                    <button className="h-[64px] w-full rounded-[58px] bg-[#0098E9] px-[32px] py-[10px] text-[16px] font-[700] leading-[24px] text-[#FFFFFF] transition-colors hover:bg-[#0ca9fe] md:h-auto md:w-auto">
                        Conduct Audit
                    </button>

                </div>
            </div>


            <div className="flex flex-col gap-[24px] py-[40px] md:py-[56px]">

                <div className="flex flex-col gap-[16px] lg:flex-row lg:gap-[32px]">

                    <button className="text-left text-[16px] font-[700] leading-[24px] text-[#FFFFFF] hover:text-[#084c71]">
                        Privacy Policy
                    </button>

                    <button className="text-left text-[16px] font-[700] leading-[24px] text-[#FFFFFF] hover:text-[#084c71]">
                        Terms of Service
                    </button>

                    <button className="text-left text-[16px] font-[700] leading-[24px] text-[#FFFFFF] hover:text-[#084c71]">
                        Refund Policy
                    </button>

                    <button className="text-left text-[16px] font-[700] leading-[24px] text-[#FFFFFF] hover:text-[#084c71]">
                        Cookie Policy
                    </button>

                    <button className="text-left text-[16px] font-[700] leading-[24px] text-[#FFFFFF] hover:text-[#084c71]">
                        Pricing
                    </button>

                    <button className="text-left text-[16px] font-[700] leading-[24px] text-[#FFFFFF] hover:text-[#084c71]">
                        Contact us
                    </button>

                </div>

                <div className="flex flex-col items-start justify-between gap-[24px] pt-[16px] lg:flex-row lg:items-start lg:pt-[32px]">

                    <p className="max-w-[700px] text-[12px] font-[400] leading-[20px] text-[#FFFFFF]">
                        2025 © Copyrights DrupalFit, A Part of Opensense Labs. All Rights Reserved.
                        Drupal is a registered trademark of Dries Buytaert
                    </p>

                    <Icons />

                </div>

            </div>

        </footer>


    )
}

export default Footer;