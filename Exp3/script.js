// document.addEventListener("DOMContentLoaded", function () {
//     document.getElementById("calculateBtn").addEventListener("click", function () {
//         calculate();
//     });
// });

// function calculate() {
//     var name = document.getElementById("Name").value;
//     var address = document.getElementById("customerAddress").value;
//     var productDropdown = document.getElementById("productDropdown");
//     var product = productDropdown.options[productDropdown.selectedIndex].text;
//     var quantity = document.getElementById("Quantity").value;

//     // Product prices
//     var productPrices = {
//         "Sony Bravia 108 cm (43 inches) 4K Ultra HD Smart LED Google TV KD-43X74K (Black)": 15000,
//         "Sony Bravia 164 cm (65 inches) XR Series 4K Ultra HD Smart OLED Google TV XR-65A95K (Black)": 12000,
//         "Sony Bravia 108 cm (43 inches) 4K Ultra HD Smart LED Google TV KD-43X80L (Black)": 18000
//     };

//     var price = productPrices[product];
//     var subtotal = price * quantity;
//     var gst = subtotal * 0.18; // GST
//     var total = subtotal + gst;

//     // Construct the output string
//     var output = "<b> Customer Name: </b>" + name + "<br>";
//     output += "<b> Customer Address: </b>" + address + "<br>";
//     output += "<b>Product: </b>" + product + "<br>";
//     output += "<b>Quantity: </b> " + quantity + "<br>";
//     output += "<b>Price per unit: </b> Rs." + price + "<br>";
//     output += "<b>Subtotal: </b> Rs." + subtotal.toFixed(2) + "<br>";
//     output += "<b>GST (18%): </b>Rs." + gst.toFixed(2) + "<br>";
//     output += "<b><strong>Total Amount: </b>Rs." + total.toFixed(2) + "</strong>";

//     var newTab = window.open();
//     newTab.document.write(output);
// }

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("calculateBtn").addEventListener("click", function () {
        calculate();
    });
});

function calculate() {
    var name = document.getElementById("Name").value;
    var address = document.getElementById("customerAddress").value;
    var productDropdown = document.getElementById("productDropdown");
    var quantity = document.getElementById("Quantity").value;

    var isValid = true;

    //name
    if (!name.trim()) {
        document.getElementById("Name").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("Name").classList.remove("is-invalid");
    }

    //address
    if (!address.trim()) {
        document.getElementById("customerAddress").classList.add("is-invalid");
        isValid = false;
    } else {
        document.getElementById("customerAddress").classList.remove("is-invalid");
    }

    // product
    if (productDropdown.value === "") {
        productDropdown.classList.add("is-invalid");
        isValid = false;
    } else {
        productDropdown.classList.remove("is-invalid");
    }

    if (!isValid) {
        return;
    }

    // Product prices
    var productPrices = {
        "Sony Bravia 108 cm (43 inches) 4K Ultra HD Smart LED Google TV KD-43X74K (Black)": 15000,
        "Sony Bravia 164 cm (65 inches) XR Series 4K Ultra HD Smart OLED Google TV XR-65A95K (Black)": 12000,
        "Sony Bravia 108 cm (43 inches) 4K Ultra HD Smart LED Google TV KD-43X80L (Black)": 18000
    };

    var product = productDropdown.options[productDropdown.selectedIndex].text;
    var price = productPrices[product];
    var subtotal = price * quantity;
    var gst = subtotal * 0.18; // GST
    var total = subtotal + gst;

    var paymentMethod;
    var cashRadio = document.getElementById("cashRadio");
    var gpayRadio = document.getElementById("gpayRadio");
    if (cashRadio.checked) {
        paymentMethod = "Cash";
    } else if (gpayRadio.checked) {
        paymentMethod = "GPay";
    } else {
        paymentMethod = "Not specified";
    }

    // Output
    var output = "<b> Customer Name: </b>" + name + "<br>";
    output += "<b> Customer Address: </b>" + address + "<br>";
    output += "<b>Product: </b>" + product + "<br>";
    output += "<b>Quantity: </b> " + quantity + "<br>";
    output += "<b>Price per unit: </b> Rs." + price + "<br>";
    output += "<b>GST (18%): </b>Rs." + gst.toFixed(2) + "<br>";
    output += "<b>Payment Method: </b>" + paymentMethod + "<br>";
    output += "<b><strong>Total Amount: </b>Rs." + total.toFixed(2) + "</strong>";

    document.getElementById("result").innerHTML = output;
}
