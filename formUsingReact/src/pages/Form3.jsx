const Form3 = ({ setCurrentPage, currentPage, formData, setFormData }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let password = formData.password;

        if (password.length < 8 || !(password.includes("@") || password.includes("|") || password.includes("#") || password.includes("%") || password.includes("^"))) {
            alert("password must be atleast 8 character and have any symbol");
            return;
        }

        if (formData.password !== formData.confirmPass) {
            alert("Passwords do not match");
            return;
        }
        console.log(formData);
        alert("Form submitted successfully!");
    };



    return (
        <div className="form-container">
            <h2>Account Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-data">
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your Username"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPass"
                            value={formData.confirmPass}
                            onChange={handleChange}
                            placeholder="Enter your confirm password"
                            required
                        />
                    </div>


                    <button type="submit">Submit</button>
                </div>
            </form>
            <button type="button" onClick={() => setCurrentPage(currentPage - 1)}>
                Back
            </button>

        </div>
    )
}

export default Form3;