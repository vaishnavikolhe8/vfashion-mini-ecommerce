const itemTable = document.getElementById("table-body")
const cartBtn = document.querySelector(".addtocart-btn")
let product = JSON.parse(localStorage.getItem("selectedItem"));
const navCont = document.getElementById("nav")
const totleCont = document.createElement("div")



function renderCart() {

    itemTable.innerHTML = ""
    totleCont.innerHTML = "";

    product.forEach((product) => {

        const row = `
        <tr>
        <td><img src=${product.img} alt="" height="53px" width="53px"></td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.quantity}</td>
        <td>${product.quantity * product.price}</td>
        <td class="remove" data-id=${product.id}>  X  </td>
        </tr>
        `;
        itemTable.innerHTML += row;

    });

// Total logic
    totleCont.classList.add('totalCont')
    totleCont.innerHTML = `
          <h3>Total : ${product.reduce(
        (sum, p) => { return sum + (p.quantity * p.price) }, 0).toFixed(2)}
           $ </h3>
          `
    document.body.appendChild(totleCont)

}
renderCart()



itemTable.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove")) {

        const removeId = Number(e.target.dataset.id)

        product = product.filter(items => items.id !== removeId)
        localStorage.setItem("selectedItem", JSON.stringify(product));
        renderCart();
    }

})


// nav2 logic
async function fetchNav() {
    let data = await (await (fetch("nav2.html"))).text();
    navCont.innerHTML = data;
}
fetchNav()