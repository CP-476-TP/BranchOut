document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const githubLink = document.getElementById("githubLink").value.trim();

    if (!email || !password || !githubLink) {
        alert("All fields must be filled.");
        return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        email: email,
        password: password,
        githubLink: githubLink
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://localhost:3000/user/create", requestOptions)
        .then((response) => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.error || "Registration failed");
                });
            }
            return response.json();
        })
        .then((result) => {
            console.log("Registration success:", result);
            alert("Account created successfully!");
            window.location.href = "login.html";
        })
        .catch((error) => {
            console.error("Registration error:", error);
            alert(error.message);
        });
});