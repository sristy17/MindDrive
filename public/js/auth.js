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

const signupForm = document.getElementById("signupForm");
const signInForm = document.getElementById("signInForm");


signupForm.addEventListener("submit", async (e) => {
  console.log(e);
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
    console.log(data);
    if (res.ok) {
      Toastify({
        text: "user Registered",
        className: "info",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    } else {
      Toastify({
        text: data.message,
        className: "error",
        style: {
          background: "linear-gradient(to right, red, red)",
        },
      }).showToast();
    }
  } catch (error) {
    console.error(error.message);
    Toastify({
      text: "something went wrong while registering user",
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
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
    localStorage.setItem("userData",data.user.username)
    if (res.ok) {
      Toastify({
        text: "User Successfully LogedIn!",
        className: "info",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();

      setTimeout(()=>{window.location.href = "/"}, 1000);
      
    } else {
      Toastify({
        text: "Invalid Credentials",
        className: "error",
        style: {
          background: "linear-gradient(to right, red, red)",
        },
      }).showToast();
    }
  } catch (error) {
    console.error(error.message);
    Toastify({
      text: "something went wrong while signin the user",
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  }
});
