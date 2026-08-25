import { useState } from "react";
import { toast } from "react-toastify";
const Form = () => {
    const [form, setForm] = useState({ firstName: "", lastName: "", url: "", email: "" })
    
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        url: "",
        email: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "url") {
            if (value.trim() === "") {
                setErrors((prev) => ({
                    ...prev,
                    url: "",
                }));
            } else if (!/^https?:\/\/.+\..+/.test(value)) {
                setErrors((prev) => ({
                    ...prev,
                    url: "Please enter a valid URL",
                }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    url: "",
                }));
            }
        }


        if (name === "email") {
            if (value.trim() === "") {
                setErrors((prev) => ({
                    ...prev,
                    email: "",
                }));
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                setErrors((prev) => ({
                    ...prev,
                    email: "Please enter a valid email address",
                }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    email: "",
                }));
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (Object.keys(errors).some((key) => errors[key])) {
            toast.error("Form submission failed");
            return;
        }

        localStorage.setItem("userForm", JSON.stringify(form));
        toast.success("Form submitted successfully!");
        console.log("Form Data:", form);
        setForm({ firstName: "", lastName: "", url: "", email: "" })

        setErrors({
            firstName: "",
            lastName: "",
            url: "",
            email: "",
        });
    }

    return (
        <div className="transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_30px_#00000025]">


            <form
                className="box-border w-full flex-1 shrink-0 rounded-[16px] bg-white px-6 py-8 sm:px-8 sm:py-10 md:max-w-[430px] md:px-8 lg:max-w-[480px]  xl:max-w-[520px] xl:max-px-[48px]"
                onSubmit={handleSubmit}
            >

                <h3 className="mb-[32px] text-[24px] font-bold leading-[32px] text-[#181818]">
                    Submit Your Participation
                </h3>

                <div className="mb-[24px] flex w-full flex-col gap-[24px] sm:flex-row sm:gap-4">

                    <div className="flex w-full flex-col gap-2 sm:w-1/2">
                        <label
                            htmlFor="firstName"
                            className="text-[14px] font-normal leading-[20px] text-[#4A5568]"
                        >
                            First Name*
                        </label>

                        <input
                            id="firstName"
                            name="firstName"
                            value={form.firstName}
                            type="text"
                            onChange={handleChange}
                            pattern="[A-Za-z ]+"
                            required
                            className="h-[40px] w-full rounded-[4px] border border-[#D1D1D1] px-4"
                        />
                    </div>

                    <div className="flex w-full flex-col gap-2 sm:w-1/2">
                        <label
                            htmlFor="lastName"
                            className="text-[14px] font-normal leading-[20px] text-[#4A5568]"
                        >
                            Last Name*
                        </label>

                        <input
                            id="lastName"
                            name="lastName"
                            value={form.lastName}
                            type="text"
                            onChange={handleChange}
                            pattern="[A-Za-z ]+"
                            required
                            className="h-[40px] w-full rounded-[4px] border border-[#D1D1D1] px-4"
                        />
                    </div>

                </div>

                <div className="mb-[24px] flex w-full flex-col gap-2">
                    <label
                        htmlFor="website"
                        className="text-[14px] font-normal leading-[20px] text-[#4A5568]"
                    >
                        Website URL*
                    </label>

                    <input
                        id="website"
                        name="url"
                        value={form.url}
                        type="text"
                        onChange={handleChange}
                        className={`h-[40px] w-full rounded-[4px] border-[2px] px-4 focus:outline-none ${errors.url
                            ? "border-[#E53935]"
                            : "border-[#D1D1D1]"
                            }`}
                    />

                    {errors.url && (
                        <p className="text-[12px] font-normal text-[#E53935]">
                            {errors.url}
                        </p>
                    )}
                </div>

                <div className="flex w-full flex-col gap-2">
                    <label
                        htmlFor="email"
                        className="text-[14px] font-normal leading-[20px] text-[#4A5568]"
                    >
                        Email*
                    </label>

                    <input
                        id="email"
                        name="email"
                        value={form.email}
                        type="email"
                        onChange={handleChange}
                        className={`h-[40px] w-full rounded-[4px] border-[2px] px-4 focus:outline-none ${errors.email
                            ? "border-[#E53935]"
                            : "border-[#D1D1D1]"
                            }`}
                    />

                    {errors.email ? (
                        <p className="text-[12px] font-normal text-[#E53935]">
                            {errors.email}
                        </p>
                    ) : (
                        <p className="text-[12px] font-normal text-[#8A8A8A]">
                            Add your email to receive a detailed audit report delivered
                            straight to your inbox.
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="mt-[24px] w-full rounded-[58px] bg-[#0098E9] px-[32px] py-[10px] text-[16px] font-semibold leading-[20px] text-white hover:bg-[#0779b6]"
                >
                    Enter the Challenge
                </button>

            </form>
        </div>
    )
}
export default Form;