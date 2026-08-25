import check from "../../assets/check.png"
const Benchmark = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full justify-between lg:px-[120px] py-[80px] px-[20px] lg:gap-0 gap-5 relative">
           
       <div className="absolute left-[-233px] top-[102px] h-[353px] w-[353px] rounded-full bg-[#00AAFF] opacity-30 blur-[200px]"></div>
         <div className="absolute left-[575px] hidden lg:block top-[474px] h-[353px] w-[353px] rounded-full bg-[#00AAFF66] opacity-30 blur-[200px]"></div>

      <div className="w-full lg:w-1/2 max-w-[600px] p-5">
        <h3 className="text-[36px] font-[700] leading-[44px] text-[#000000]">
          Compete. Benchmark. Get Recognized.
        </h3>

        <p className="mt-[24px] text-[14px] font-[400] leading-[22px] text-[#525252]">
          Every two weeks, DrupalFit evaluates Drupal websites and ranks them
          based on overall website quality.
        </p>

        <p className="mt-[16px] text-[14px] font-[400] leading-[22px] text-[#525252]">
          The top 3 websites are recognized as top performers and featured
          across DrupalFit channels.
        </p>
      </div>


      <div className="w-full lg:w-1/2 bg-[#DEE2E64D] p-7">
        <h5 className="text-[20px] font-[700] leading-[28px] text-[#000000]">
          Who Can Participate?
        </h5>

        <div className="mt-[24px] flex flex-col gap-[16px]">

          <div className="flex flex-row items-center gap-[12px]">
            <img
              className="h-[18px] w-[18px] bg-[#0678D4]"
              src={check}
              alt="checkbox"
            />
            <p className="text-[16px] font-[400] leading-[24px] text-[#000000]">
              Drupal website
            </p>
          </div>

          <div className="flex flex-row items-center gap-[12px]">
            <img
              className="h-[18px] w-[18px] bg-[#0678D4]"
              src={check}
              alt="checkbox"
            />
            <p className="text-[16px] font-[400] leading-[24px] text-[#000000]">
              Live for at least 6 months
            </p>
          </div>

          <div className="flex flex-row items-center gap-[12px]">
            <img
              className="h-[18px] w-[18px] bg-[#0678D4]"
              src={check}
              alt="checkbox"
            />
            <p className="text-[16px] font-[400] leading-[24px] text-[#000000]">
              Owned or managed by your organization
            </p>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Benchmark;