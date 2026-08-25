import Form from "./Form";

const Hero = () => {
    return (
        
        <header className="flex w-full flex-col items-center gap-[40px] bg-gradient-to-r from-[#0678D4] to-[#015FAB] px-5 py-10 sm:px-8 sm:py-12 md:flex-row md:gap-[50px] md:px-[60px] md:py-[60px] lg:gap-[70px] lg:px-[40px] lg:py-[70px] xl:gap-[90px] xl:px-[70px] xl:py-[80px]">

            <div className="w-full flex-1">
                <h2 className="w-full pb-[20px] text-[32px] font-bold leading-[42px] text-white sm:text-[38px] sm:leading-[48px] md:w-full md:pb-[30px] md:text-[42px] md:leading-[52px] lg:w-[524px] lg:text-[48px] lg:leading-[58px]">
                    Is Your Website Among the Best?
                </h2>

                <p className="w-full text-[16px] font-normal leading-[24px] text-white md:max-w-[520px]">
                    Put your website to the test. Submit your URL and get evaluated
                    for accessibility, security, and GDPR compliance.
                </p>
            </div>

            <Form/>

        </header>



    )
}

export default Hero;