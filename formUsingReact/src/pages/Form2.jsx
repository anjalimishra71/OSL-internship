const Form2 = ({ setCurrentPage, currentPage, formData, setFormData }) => {

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
            <h2>Contact Information</h2>
            <form onSubmit={handleNext}>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Phone Number:</label>
                    <input
                        type="tel"
                        name="phone"
                        pattern="[0-9]{10}"
                        maxLength="10"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Address:</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your address"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>City:</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter your city"
                    />
                </div>
                <div className="btn">
                    <button type="button" onClick={() => setCurrentPage(currentPage - 1)}>
                        Back
                    </button>
                    <button type="submit">
                        Next
                    </button>
                </div>
            </form>


        </div>
    )
}

export default Form2;