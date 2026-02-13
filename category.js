const params = new URLSearchParams(window.location.search);
const category = params.get("cat");
const productCont = document.querySelector(".product-cont");
const navCont = document.getElementById("nav")



async function handleCategory(category) {
    try {

        let data = await (await fetch(`https://dummyjson.com/products/category/${category}`)).json();
        // console.log(data);

        data.products.forEach(element => {

            let productBox = document.createElement("div");
            productBox.className = "product-box"

            productBox.innerHTML = `
                            <div class="product-img">
                                <img src=${element.images.map((x) => x).slice(1, 2)} alt="">
                            </div>
                            <div class="product-info">
                                    <h2>${element.title}</h2>
                                    <h5>Rating : ${element.rating} / 5 </h5>
                                    <h4>Price : ${element.price} $</h4>
                                    <p>${element.description}</p>
                                    <h4>Shipping Information : ${element.shippingInformation}</h4>
                                
                                <div class="quantity-btn flex">
                                        <button type="button" class="minus">-</button>
                                        <p class="count" data-count="1">1</p>
                                        <button type="button" class="plus">+</button>
                                </div>
                                <button class="addtocart-btn">
                                   <img src="./image/Cart1 with buy.png" alt="">
                                </button>
                            </div>
                        `
            productCont.appendChild(productBox)

            // Quantity logic PER PRODUCT
            const plusBtn = productBox.querySelector(".plus");
            const minusBtn = productBox.querySelector(".minus");
            const countEl = productBox.querySelector(".count");

            plusBtn.addEventListener("click", () => {
                let count = Number(countEl.dataset.count);
                count++;
                countEl.dataset.count = count;
                countEl.innerText = count;
            });

            minusBtn.addEventListener("click", () => {
                let count = Number(countEl.dataset.count);
                if (count > 1) {
                    count--;
                    countEl.dataset.count = count;
                    countEl.innerText = count;
                }
            });



            // CART LOGIC
            // storing cartInfo inside brower
            productBox.querySelector(".addtocart-btn").addEventListener("click", () => {
                showMsg1("Item Added to Cart", "success");

                // we are creating cart i.e. array[] here which is first empty or if not empty then push inside this array
                let cartArray = JSON.parse(localStorage.getItem("selectedItem")) || [];

                if (!Array.isArray(cartArray)) {
                    cartArray = [];
                }
                const productData = {
                    id: element.id,
                    img: element.images[2],
                    title: element.title,
                    price: element.price,
                    quantity: Number(countEl.dataset.count)
                };

                //  product exists logic → increase quantity
                const existingProduct = cartArray.find(items => items.id === element.id)
                if (existingProduct) {
                    existingProduct.quantity += productData.quantity;
                } else {
                    cartArray.push(productData);
                    productData.quantity == 1;
                }

                localStorage.setItem("selectedItem", JSON.stringify(cartArray));



            })
        });
    } catch (error) {
        console.error(error);
    }
}

handleCategory(category);

// SIMPLE GLOBAL MESSAGE
function showMsg1(text, type = "success") {
    msg.innerText = text;
    msg.className = type;
    msg.style.display = "block";

    setTimeout(() => {
        msg.style.display = "none";
    }, 2500);
}


async function fetchNav() {
    let data = await(await(fetch("nav2.html"))).text();
    navCont.innerHTML = data;
}
fetchNav()