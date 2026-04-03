document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("All fields must be filled.");
        return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        email: email,
        password: password
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://localhost:3000/user/login", requestOptions)
        .then((response) => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.error || "Login failed");
                });
            }
            return response.json();
        })
        .then((result) => {
            console.log("Login success:", result);
            window.location.href = "main-page.html";
        })
        .catch((error) => {
            console.error("Login error:", error);
            alert(error.message);
        });
});