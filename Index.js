let base_price = 0;
let shipping = 0;
let total = 0;
let Vat = 0;

let boxgröße_P = 2;
let keksform_P = 4;
let K_topping_P = 5;
let E_topping_P = 6;
let verpakung_P = 3;
let optional_P = 2;

function base_price_calc() {
  base_price =
    boxgröße_P +
    keksform_P +
    K_topping_P +
    E_topping_P +
    verpakung_P +
    optional_P;
}
base_price_calc();

base_price = console.log(base_price);
console.log(typeof base_price);
