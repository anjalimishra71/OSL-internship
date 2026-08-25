import feature1 from "../../assets/feature1.png"
import feature2 from "../../assets/feature2.png"
import feature3 from "../../assets/feature3.png"
const Features = () => {
    return (
        <div className="w-full lg:px-[120px] pt-[80px] pb-[96px] px-[20px]">
            <h3 className="text-[36px] font-[700] leading-[44px] text-center text-[#000000]">
                Benefits Beyond the Score
            </h3>

            <div className="flex flex-col gap-[40px] mt-[40px]">

                <div className="flex flex-col md:flex-row items-center md:gap-[48px] gap-[24px]">
                    <img
                        className="w-[408px] h-[370px] rounded-[12px] bg-[#E0EDF5] object-cover transition-transform duration-300 ease-in-out hover:scale-[1.03]"
                        src={feature1}
                        alt="Higher Search Ratings"
                    />

                    <div className="flex flex-col gap-[24px]">
                        <h4 className="relative w-fit text-[24px] font-[700] leading-[32px] text-[#000000] after:absolute after:left-0 after:bottom-[-12px] after:w-[64px] after:h-[3px] after:rounded-[50px] after:bg-[#0098E9]">
                            Benchmark Your Website
                        </h4>

                        <p className="text-[16px] font-[400] leading-[24px] text-[#525252]">
                            The top 3 websites will be featured across DrupalFit's social
                            channels and receive a digital certificate of recognition.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:gap-[48px] gap-[24px]">


                    <div className="flex flex-col gap-[24px] order-2 md:order-none">
                        <h4 className="relative w-fit text-[24px] font-[700] leading-[32px] text-[#000000] after:absolute after:left-0 after:bottom-[-12px] after:w-[64px] after:h-[3px] after:rounded-[50px] after:bg-[#0098E9]">
                            Get a Detailed Audit Report
                        </h4>

                        <p className="text-[16px] font-[400] leading-[24px] text-[#525252]">
                            Get a comprehensive audit report covering performance,
                            accessibility, security, SEO, and compliance.
                        </p>
                    </div>
                    <img
                        className="w-[408px] h-[370px] rounded-[12px] bg-[#E0EDF5] object-cover order-1 md:order-none transition-transform duration-300 ease-in-out hover:scale-[1.03]"
                        src={feature2}
                        alt="Detailed Audit Report"
                    />
                </div>

                <div className="flex flex-col md:flex-row items-center md:gap-[48px] gap-[24px]">
                    <img
                        className="w-[408px] h-[370px] rounded-[12px] bg-[#E0EDF5] object-cover transition-transform duration-300 ease-in-out hover:scale-[1.03]"
                        src={feature3}
                        alt="Benchmark Your Website"
                    />

                    <div className="flex flex-col gap-[24px]">
                        <h4 className="relative w-fit text-[24px] font-[700] leading-[32px] text-[#000000] after:absolute after:left-0 after:bottom-[-12px] after:w-[64px] after:h-[3px] after:rounded-[50px] after:bg-[#0098E9]">
                            Benchmark Your Website
                        </h4>

                        <p className="text-[16px] font-[400] leading-[24px] text-[#525252]">
                            See how your website compares to other Drupal websites participating
                            in the same round.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Features;