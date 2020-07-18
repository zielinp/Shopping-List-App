import * as mdb from 'mdb-ui-kit';

export default {
  mdb,
};

//const main_product_list =[];


class Product {
  constructor(name, qunatity, unit, category) {
    this.name = name;
    this.qunatity = qunatity;
    this.unit = unit;
    this.category = category;
  }
}




// Create a new list item
function createListItem() {

  let new_product = takeValuesFromInput();

  const list_product = document.createElement("li");
  list_product.classList.add("list-group-item", "list-product");
  document.getElementById("mainProductList").appendChild(list_product);

  const product_group = document.createElement("ul");
  product_group.classList.add("list-group", "list-group-horizontal", "row");
  list_product.appendChild(product_group);

  const item = document.createElement("li");
  item.classList.add("list-group-item", "product-item", "col-3");
  product_group.appendChild(item);
  item.innerText = new_product.name;

  const qunatity = document.createElement("li");
  qunatity.classList.add("list-group-item", "quantity-item", "col-3");
  product_group.appendChild(qunatity);
  qunatity.innerText = new_product.qunatity;

  const unit = document.createElement("li");
  unit.classList.add("list-group-item", "unit-item", "col-3");
  product_group.appendChild(unit);
  unit.innerText = new_product.unit;

  const category = document.createElement("li");
  category.classList.add("list-group-item", "category-item", "col-3");
  product_group.appendChild(category);
  category.innerText = new_product.category;

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






document.getElementById("addButton").addEventListener("click", createListItem)
