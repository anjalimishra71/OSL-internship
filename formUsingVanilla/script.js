let form = document.querySelector("form")

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value
    const fname = document.getElementById("fname").value
    const dob = document.getElementById("dob").value
    const gender = document.querySelector('input[name="gender"]:checked').value
    const email = document.getElementById("email").value
    const phoneNum = document.getElementById("phone").value
    const address = document.getElementById("address").value
    const city = document.getElementById("city").value
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const confirmPass = document.getElementById("confirmPass").value

    const userData = {
        name,
        fname,
        dob,
        gender,
        email,
        phoneNum,
        address,
        city,
        username,
        password,
        confirmPass
    }

    if (password.length < 8 || !(password.includes("@") || password.includes("!") || password.includes("#") || password.includes("$") || password.includes("%") || password.includes("&"))) {
        alert("please enter atleast 8 character and one symbol")
        return;
    }

    if (password != confirmPass) {
        alert("password and confirm password does't match");
        return;
    }



    localStorage.setItem("userData", JSON.stringify(userData))
    const data = JSON.parse(localStorage.getItem("userData"))
    console.log(data);
    alert("Form submitted successfully!")
    form.reset();
})