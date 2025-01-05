let base_price = 0;
let total_price = 0;
let shipping = 0;
let total = 0;

let MwSt = 0;
const MwSt_Satz = 0.07;

const r_code = "XMAS2024";
const r_Rabatt = 0.1;

let boxgröße_P = 0;
let keksform_P = 0;
let K_topping_P = 20;
let E_topping_P = 0;
let verpakung_P = 0;
let optional_P = 0;

//Überprüfen welche box ausgewählt wurde (boxgröße_P)
function boxsize() {
  const boxradios = document.getElementsByName("boxSize");

  for (const radio of boxradios) {
    if (radio.checked) {
      boxgröße_P = parseFloat(radio.value);
      break;
    }
  }
  price_calc();
}

// Beim aufrufen der Webseite die Funktion price_calc ausführen
window.onload = function () {
  price_calc();
};

//Preisberechnung
function price_calc() {
  //Basispreisberechnung
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

  //Rabatt
  const rabattInput = document.getElementById("Rabatt_eingabe").value;

  if (r_code === rabattInput) {
    base_price = base_price - base_price * r_Rabatt;
    console.log("Rabatt angewendet. Neuer Basispreis:", base_price);
  } else {
    console.log("Kein Rabatt angewendet. Basispreis bleibt:", base_price);
  }

  // Versandkostenberechnung
  function shipping_calc() {
    if (base_price > 0 && base_price < 20) {
      shipping = 3.99;
    } else if (base_price >= 20 && base_price < 50) {
      shipping = 1.8;
    } else shipping = 0;
  }
  shipping_calc();

  // Gesamtpreisberechnung
  function total_price_calc() {
    total_price = base_price + shipping;
  }
  total_price_calc();

  //Mehrwertsteuerberechnung
  function MwSt_calc() {
    MwSt = total_price * MwSt_Satz;

    MwSt = Math.round(MwSt * 100) / 100;
  }
  MwSt_calc();

  console.log("Basispreis:", format_number(base_price)); // Base price
  console.log("Versandkosten:", format_number(shipping)); // Shipping cost
  console.log("Gesamtpreis:", format_number(total_price)); // Total price
  console.log("MwSt:", format_number(MwSt)); // VAT
}

//Umformatierung
function format_number(num) {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}
