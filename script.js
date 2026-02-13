console.log("js");

let loginbtn = document.querySelector(".loginbtn");
let regContainer = document.querySelector(".regContainer");
let cardCont = document.querySelector(".card-cont")
let productName = document.querySelector(".productname")
let catName = document.querySelector(".cat-name")
let catItemCont = document.querySelector(".cat-items")
const msg = document.getElementById("msg");
const menuIcon = document.getElementById("menuIcon");
let navLinks = document.querySelector(".nav-links")


// SIMPLE GLOBAL MESSAGE
function showMsg(text, type = "success") {
    msg.innerText = text;
    msg.className = type;
    msg.style.display = "block";

    setTimeout(() => {
        msg.style.display = "none";
    }, 2500);
}



// LOGIN LOGIC
async function showLogin() {
    try {
        const htmlLoginContent = await (await fetch("login.html")).text();
        regContainer.innerHTML = htmlLoginContent;

        regContainer.classList.remove("inactive");

        loginJsLogic(); 
    }
    catch (err) {
        console.log("Login page load error", err);
    }
}

loginbtn.addEventListener("click", showLogin);

function loginJsLogic() {

    let login = document.querySelector(".container-log")
    let sign = document.querySelector(".container-sign")

    document.addEventListener("click", (e) => {

        // switch to sign up
        if (e.target.classList.contains("change-log")) {
            login.style.display = "none";
            sign.classList.add("blockclass");
        }

        // switch to login
        if (e.target.classList.contains("change-sign")) {
            sign.classList.remove("blockclass");
            login.style.display = "block";
        }

        // close login modal
        if (e.target.classList.contains("close-btn")) {
            login.style.display = "none";
            sign.style.display = "none";
        }

    });

    // ONE LISTENER FOR BOTH FORMS
    document.querySelectorAll(".auth-form").forEach(form => {

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            // LOGIN
            if (form.id === "loginForm") {
                const email = document.getElementById("loginEmail").value.trim();
                const password = document.getElementById("loginPassword").value.trim();

                if (email === "" || password === "") {
                    showMsg("Login fields required", "error");
                    return;
                }

                showMsg("Login successful", "success");
                login.style.display = "none";
            }

            // SIGNUP
            if (form.id === "signupForm") {
                const name = document.getElementById("signName").value.trim();
                const email = document.getElementById("signEmail").value.trim();
                const password = document.getElementById("signPassword").value.trim();

                if (name === "" || email === "" || password === "") {
                    showMsg("Signup fields required", "error");
                    return;
                }

                showMsg("Account created", "success");
                sign.style.display = "none";
            }
        });

    });


}



// 2.new arrival section js
async function newproduct() {
    let data = await (await fetch('https://fakestoreapi.com/products')).json();
    // console.log(data);


    for (let i = 14; i < 17; i++) {
        let dataIndex = data[i];

        let cardBoxJS = document.createElement("div");
        cardBoxJS.className = "card-box";
        cardBoxJS.innerHTML = `<div class="card-img">
                                <img src=${dataIndex.image} alt="">
                            </div>
                            <div class="card-info flex">
                                <div class="productname">
                                    <h5>${dataIndex.title}</h5>
                                </div>
                            </div>`
        cardCont.appendChild(cardBoxJS)
    }

}
newproduct()



// 3.category
function handleFetchCategory(cat) {
    window.location.href = `category.html?cat=${cat}`
}

catItemCont.addEventListener("click", (e) => {
    const item = e.target.closest(".item[data-category]"); //the nearest parent element that has class item AND a data-category attribute.

    if (!item) return;

    const category = item.dataset.category;
    handleFetchCategory(category);
});



// cart section logic
const cartimg = document.getElementById("cart")
cartimg.addEventListener("click", () => {
    window.location.href = "cart.html"
})



// RESPONSIVE js
menuIcon.addEventListener("click",()=>{
navLinks.classList.toggle("active")
})