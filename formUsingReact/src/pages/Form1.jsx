import { useState } from "react";
function Form1({ setCurrentPage, currentPage, formData, setFormData }) {

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleNext = (e) => {
        e.preventDefault();
        setCurrentPage(currentPage + 1)
    }

    return (
        <div className="form-container">
            <h1>Registration Form</h1>

            <h2>Personal Information</h2>
            <form onSubmit={handleNext}>

                <div className="form-group">
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        maxLength={24}
                        placeholder="Enter your name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Father's Name:</label>
                    <input
                        type="text"
                        name="fname"
                        value={formData.fname}
                        maxLength={30}
                        onChange={handleChange}
                        placeholder="Enter father's name"
                    />
                </div>

                <div className="form-group">
                    <label>Date of birth:</label>
                    <input type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        placeholder="enter date of birth"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Gender:</label>
                    <div className="form-gender">
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={formData.gender === "Male"}
                            onChange={handleChange}
                        />
                        Male

                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={formData.gender === "Female"}
                            onChange={handleChange}
                        />
                        Female
                    </div>
                </div>
                <button type="submit">
                    Next
                </button>

            </form>


        </div>
    );
}

export default Form1;