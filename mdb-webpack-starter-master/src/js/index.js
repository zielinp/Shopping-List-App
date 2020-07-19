import * as mdb from 'mdb-ui-kit';

export default {
  mdb,
};

//// CLASSES AND OBJECTS DECLARATIONS

// Product class
class Product {
  constructor(name, qunatity, unit, category) {
    this.name = name;
    this.qunatity = qunatity;
    this.unit = unit;
    this.category = category;
    this.id = 0;
    this.isChecked = false;
  }

}
const products_summary = {
  items: 0,
  pcs: 0,
  weight: 0,

  updateSummary() {
    this.items = main_product_list.length;
    let all_pcs = main_product_list.filter(x => x.unit == 'pcs');

    this.pcs = 0;
    for (var i = 0; i < all_pcs.length; i++) {
      this.pcs = this.pcs + parseInt(all_pcs[i].qunatity);
    }

    let all_weight = main_product_list.filter(x => x.unit == 'kg');
    this.weight = 0;
    for (var i = 0; i < all_weight.length; i++) {
      this.weight = this.weight + parseInt(all_weight[i].qunatity);
    }
    console.log(this.items, this.pcs, this.weight);
    document.getElementById('numOfProducts').innerText = `Number of products: ${this.items}`;
    document.getElementById('pcsOfProducts').innerText = `Total pcs: ${this.pcs}`;
    document.getElementById('weightOfProducts').innerText = `Total weight: ${this.weight} kg`;

  }
}


var id = 0;
// Get data from local storage or initialize empty array
var main_product_list = localStorage.getItem("mainListLocalStorage") == null ? [] : JSON.parse(localStorage.getItem("mainListLocalStorage"));
// Show data from localStorage
for (var element = 0; element < main_product_list.length; element++) {
  createListItem(main_product_list[element]);
}


//// FUNCTIONS DECLARATIONS

// Function to sort products by category
function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const categoryA = a.category.toUpperCase();
  const categoryB = b.category.toUpperCase();

  let comparison = 0;
  if (categoryA > categoryB) {
    comparison = 1;
  } else if (categoryA < categoryB) {
    comparison = -1;
  }
  return comparison;
}

// Sort list
function sortList() {
  main_product_list = main_product_list.sort(compare);
  localStorage.setItem("mainListLocalStorage", JSON.stringify(main_product_list));
  $(".list-product").remove();

  for (var element = 0; element < main_product_list.length; element++) {
    createListItem(main_product_list[element]);
  }
}

// Export to pdf
function exportListPdf() {
  var doc = new jsPDF();

  doc.text('Your products!', 10, 10)
  doc.text("Product", 10, 20);
  doc.text("Quanity", 60, 20);
  doc.text("Pcs/kg", 110, 20);
  doc.text("Category", 160, 20);
  let row = 20;
  let col = 50;
  for (var element = 0; element < main_product_list.length; element++) {
    row = row + 10;
    doc.text(main_product_list[element].name, 10, row);
    doc.text(main_product_list[element].qunatity, col + 10, row);
    doc.text(main_product_list[element].unit, 2 * col + 10, row);
    doc.text(main_product_list[element].category, 3 * col + 10, row);
  }
  doc.save('shopping-list.pdf');
}


// Delete product
function deleteProduct() {

  const item_to_delete = this.closest(".list-product");
  const index = main_product_list.findIndex(x => x.id == item_to_delete.id);

  if (index > -1) {
    main_product_list.splice(index, 1);
    localStorage.setItem("mainListLocalStorage", JSON.stringify(main_product_list));
    //console.log(main_product_list);
  }

  item_to_delete.remove();
  products_summary.updateSummary();

}

// Delete all products
function deleteAllProducts() {
  $(".list-product").remove();
  main_product_list = [];
  localStorage.setItem("mainListLocalStorage", JSON.stringify(main_product_list));
  products_summary.updateSummary();
}

// Check all products
function checkAllProducts() {
  $(".form-check-input").prop('checked', $("#checkAll").prop('checked'));
  for (var element = 0; element < main_product_list.length; element++) {
    main_product_list[element].isChecked = $("#checkAll").prop('checked');
  }
  localStorage.setItem("mainListLocalStorage", JSON.stringify(main_product_list));
}

//Check product
function checkProduct() {
  const item_to_check = this.closest(".list-product");
  const product = main_product_list.find(x => x.id == item_to_check.id);
 
  product.isChecked = ($(this).prop('checked'));
  localStorage.setItem("mainListLocalStorage", JSON.stringify(main_product_list));
  // console.log(product);
  $("#checkAll").prop('checked', true);
  for (var element = 0; element < main_product_list.length; element++) {
    if (main_product_list[element].isChecked == false) {
      $("#checkAll").prop('checked', false);
      break;
    }
  }
}

// Create a new list item
function createListItem(new_product) {

  id++;
  const list_product = document.createElement("li");
  list_product.classList.add("list-group-item", "list-product");
  list_product.id = id;
  new_product.id = id;
  document.getElementById("mainProductList").appendChild(list_product);

  const product_group = document.createElement("ul");
  product_group.classList.add("list-group", "list-group-horizontal", "row");
  // product_group.contentEditable = "true";
  list_product.appendChild(product_group);

  const checked_product = document.createElement("li");
  checked_product.classList.add("list-group-item", "product-item", "col-1");
  product_group.appendChild(checked_product);

  const checked_product_input = document.createElement("input");
  checked_product_input.classList.add("form-check-input");
  checked_product_input.type = "checkbox";
  checked_product_input.value = "";
  checked_product_input.checked = new_product.isChecked;
  checked_product.appendChild(checked_product_input);
  checked_product_input.addEventListener("click", checkProduct);

  const item = document.createElement("li");
  item.classList.add("list-group-item", "product-item", "col-3");
  product_group.appendChild(item);
  item.innerText = new_product.name;

  const qunatity = document.createElement("li");
  qunatity.classList.add("list-group-item", "quantity-item", "col-2");
  product_group.appendChild(qunatity);
  qunatity.innerText = new_product.qunatity;

  const unit = document.createElement("li");
  unit.classList.add("list-group-item", "unit-item", "col-2");
  product_group.appendChild(unit);
  unit.innerText = new_product.unit;

  const category = document.createElement("li");
  category.classList.add("list-group-item", "category-item", "col-3");
  product_group.appendChild(category);
  category.innerText = new_product.category;

  const delete_item = document.createElement("li");
  delete_item.classList.add("list-group-item", "product-item", "col-1");
  product_group.appendChild(delete_item);

  const delete_item_button = document.createElement("button");
  delete_item_button.classList.add("btn", "btn-danger", "btn-sm", "btn-floating");
  delete_item.appendChild(delete_item_button);
  delete_item_button.innerHTML = "<i class='fas fa-times'></i>";
  delete_item_button.addEventListener("click", deleteProduct);

  products_summary.updateSummary();
}

// Take values from input
function takeValuesFromInput() {
  const product_name = document.getElementById("productName").value;
  const product_quantity = document.getElementById("productQuantity").value;
  const product_unit = (document.getElementById("pcs").checked === true) ? "pcs" : "kg";
  const product_category = document.getElementById("productCategory").value;

  let new_product = new Product(product_name, product_quantity, product_unit, product_category);
  console.log(new_product);

  document.getElementById("productName").value = "";
  document.getElementById("productQuantity").value = "";
  document.getElementById("productCategory").value = "";
  document.getElementById("addButton").disabled = true;

  main_product_list.push(new_product);
  console.log(main_product_list);
  localStorage.setItem("mainListLocalStorage", JSON.stringify(main_product_list));
  return new_product;
}


// Form input validation - checking only if not empty
function validateForm() {
  if (document.getElementById("productName").value === "" ||
    document.getElementById("productQuantity").value === "" ||
    document.getElementById("productCategory").value === "") {
    document.getElementById("addButton").disabled = true;
  }
  else {
    document.getElementById("addButton").disabled = false;
  }
}


document.getElementById("productName").addEventListener("change", validateForm);
document.getElementById("productQuantity").addEventListener("change", validateForm);
document.getElementById("productCategory").addEventListener("change", validateForm);
document.getElementById("addButton").addEventListener("click", function () {
  createListItem(takeValuesFromInput());
})
document.getElementById("deleteAll").addEventListener("click", deleteAllProducts);
document.getElementById("checkAll").addEventListener("click", checkAllProducts);
document.getElementById("sortButton").addEventListener("click", sortList);
document.getElementById("exportButton").addEventListener("click", exportListPdf);

