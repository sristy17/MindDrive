function toggleForm() {
  document.getElementById("signupForm").style.display =
    document.getElementById("signupForm").style.display === "none"
      ? "block"
      : "none";
  document.getElementById("signInForm").style.display =
    document.getElementById("signInForm").style.display === "none"
      ? "block"
      : "none";
}

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(signupForm);

  try {
    const res = await fetch("/auth/signup", {
      method: "POST",
      body: new URLSearchParams(formData),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const data = await res.json();

    Toastify({
      text: data.message,
      className: res.ok ? "info" : "error",
      style: {
        background: res.ok ? "linear-gradient(to right, #00b09b, #96c93d)" : "linear-gradient(to right, red, red)",
      },
    }).showToast();

    // Redirect if signup is successful
    if (res.ok && data.redirect) {
      setTimeout(() => {
        window.location.href = data.redirect;
      }, 1000);
    }
  } catch (error) {
    console.error(error.message);
    Toastify({
      text: "Something went wrong while registering user",
      className: "error",
      style: { background: "linear-gradient(to right, red, red)" },
    }).showToast();
  }
});


signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(signInForm);

  try {
    const res = await fetch("/auth/signin", {
      method: "POST",
      body: new URLSearchParams(formData),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("userData", data.user.username);

      Toastify({
        text: "User Successfully Logged In!",
        className: "info",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();

      // Redirect after showing toast
      setTimeout(() => {
        window.location.href = data.redirect;
      }, 1000);
    } else {
      Toastify({
        text: data.message || "Invalid Credentials",
        className: "error",
        style: { background: "linear-gradient(to right, red, red)" },
      }).showToast();
    }
  } catch (error) {
    console.error(error.message);
    Toastify({
      text: "Something went wrong while signing in the user",
      className: "error",
      style: { background: "linear-gradient(to right, red, red)" },
    }).showToast();
  }
});

