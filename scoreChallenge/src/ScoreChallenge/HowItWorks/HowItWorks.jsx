import frame1 from "../../assets/frame1.png"
import frame2 from "../../assets/frame2.png"
import frame3 from "../../assets/frame3.png"
import frame4 from "../../assets/frame4.png"
import connectorForMob from "../../assets/connectorForMob.png"

import { useRef, useEffect } from "react"
const HowItWorks = () => {

    const dotRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const checkDotPosition = () => {
            const dot = dotRef.current;
        
            if (!dot) return;

            const dotRect = dot.getBoundingClientRect();

            const dotX = dotRect.left + dotRect.width / 2;

            cardsRef.current.forEach((card) => {
                if (!card) return;

                const cardRect = card.getBoundingClientRect();

                const isInside =
                    dotX >= cardRect.left &&
                    dotX <= cardRect.right;

                card.classList.toggle("active", isInside);
            });
        };


        const animationFrame = () => {
            checkDotPosition();
            requestAnimationFrame(animationFrame);
        };

        const frameId = requestAnimationFrame(animationFrame);

        return () => cancelAnimationFrame(frameId);
    }, []);


    return (

        <div className="w-full bg-[linear-gradient(#EFF8FF,#FFFFFF,#C2D9EB)] px-[20px] py-[60px] sm:px-[30px] md:px-[50px] lg:px-[80px] xl:px-[120px]">

            <h3 className="text-center text-[30px] font-[700] leading-[38px] sm:text-[32px] sm:leading-[40px] md:text-[34px] md:leading-[42px] lg:text-[36px] lg:leading-[44px]">
                How It Works
            </h3>

            <div className="flex w-full min-w-0 gap-4">

                <img
                    src={connectorForMob}
                    alt="connector for mobile"
                    className="mt-[50px] h-[1200px] w-[12px] md:hidden"
                />



                <div className="cards-container relative mt-[40px] flex w-full flex-col items-center justify-center gap-[24px] 
                        md:grid md:grid-cols-2 md:gap-[24px] 
                       lg:flex lg:flex-row lg:gap-[16px]">


                    <div className="moving-line absolute left-1/2 top-1/2 z-0 hidden h-[2px] w-[1100px] max-w-[90%] bg-[#E5E5E5] -translate-x-1/2 -translate-y-1/2 rounded-full lg:block pointer-events-none">
                        <div ref={dotRef} className="moving-dot"></div>
                    </div>


                    <div ref={(el) => (cardsRef.current[0] = el)}
                        className="step-card z-10 bg-white/30 backdrop-blur-[4px]  flex w-full max-w-[355px] min-h-[290px] flex-col items-start rounded-[16px] border border-[#E5E5E5]  p-[24px] shadow-[0_4px_20px_#0F405E0D]
                            sm:p-[28px]
                            md:h-[320px] md:max-w-none md:p-[28px]
                            lg:h-[312px]  lg:flex-1 lg:p-[32px] ">

                        <img
                            className="h-[60px] w-[60px] rounded-full"
                            src={frame1}
                            alt="Submit website"
                        />

                        <p className="mt-[20px] text-[17px] font-[400] leading-[24px] text-[#008CE9] lg:mt-[24px]">
                            STEP 1
                        </p>

                        <h5 className="mt-[8px] text-[19px] font-[700] leading-[28px] text-[#000000] lg:text-[20px] w-full ">
                            Submit Your Website
                        </h5>

                        <p className="mt-[12px] text-[14px] font-[400] leading-[20px] text-[#525252]">
                            Enter your website URL to join the current round.
                        </p>
                    </div>


                    <div ref={(el)=>(cardsRef.current[1]=el)} className="step-card z-10 flex w-full max-w-[355px] min-h-[290px] flex-col items-start rounded-[16px] border border-[#E5E5E5] bg-white/30 backdrop-blur-[4px] p-[24px] shadow-[0_4px_20px_#0F405E0D]
                            sm:p-[28px]
                            md:h-[320px] md:max-w-none md:p-[28px]
                            lg:h-[320px]  lg:p-[32px] lg:flex-1">

                        <img
                            className="h-[60px] w-[60px] rounded-full"
                            src={frame2}
                            alt="Get audited"
                        />

                        <p className="mt-[20px] text-[17px] font-[400] leading-[24px] text-[#008CE9] lg:mt-[24px]">
                            STEP 2
                        </p>

                        <h5 className="mt-[8px] text-[19px] font-[700] leading-[28px] text-[#000000] lg:text-[20px] w-full">
                            Get Audited
                        </h5>

                        <p className="mt-[12px] text-[14px] font-[400] leading-[20px] text-[#525252]">
                            DrupalFit analyzes your website and generates an overall score.
                        </p>
                    </div>





                    <div ref={(el)=>(cardsRef.current[2]=el)} className="step-card relative z-10 flex w-full max-w-[355px] min-h-[290px] flex-col items-start rounded-[16px] border border-[#E5E5E5] bg-white/30 backdrop-blur-[4px] p-[24px] shadow-[0_4px_20px_#0F405E0D]
                            sm:p-[28px]
                            md:h-[320px] md:max-w-none md:p-[28px]
                            lg:h-[320px]  lg:p-[32px] lg:flex-1 ">

                        <img
                            className="h-[60px] w-[60px] rounded-full"
                            src={frame3}
                            alt="Rankings finalized"
                        />

                        <p className="mt-[20px] text-[17px] font-[400] leading-[24px] text-[#008CE9] lg:mt-[24px]">
                            STEP 3
                        </p>

                        <h5 className="mt-[8px] text-[19px] font-[700] leading-[28px] text-[#000000] lg:text-[20px] w-full">
                            Rankings Are Finalized
                        </h5>

                        <p className="mt-[12px] text-[14px] font-[400] leading-[20px] text-[#525252]">
                            Websites are ranked based on their audit results.
                        </p>
                    </div>


                    <div ref={(el)=>(cardsRef.current[3]=el)} className="step-card relative z-10 flex w-full max-w-[355px] min-h-[290px] flex-col items-start rounded-[16px] border border-[#E5E5E5] bg-white/30 backdrop-blur-[4px] p-[24px] shadow-[0_4px_20px_#0F405E0D]
                            sm:p-[28px]
                            md:h-[320px] md:max-w-none md:p-[28px]
                            lg:h-[320px] lg:p-[32px] lg:flex-1">

                        <img
                            className="h-[60px] w-[60px] rounded-full"
                            src={frame4}
                            alt="Winners announced"
                        />

                        <p className="mt-[20px] text-[17px] font-[400] leading-[24px] text-[#008CE9] lg:mt-[24px]">
                            STEP 4
                        </p>

                        <h5 className="mt-[8px] text-[19px] font-[700] leading-[28px]  text-[#000000] lg:text-[20px] w-full">
                            Winners Are Announced
                        </h5>

                        <p className="mt-[12px] text-[14px] font-[400] leading-[20px] text-[#525252]">
                            Top-performing websites are recognized at the end of each two-week round.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default HowItWorks;