document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {
        alert("All fields must be filled.");
        return;
    }

    const loginData = {
        email: email,
        password: password
    };

    console.log("Login data:", loginData);
});