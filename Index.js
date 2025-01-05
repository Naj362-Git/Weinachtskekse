let base_price = 0;
let total_price = 0;
let shipping = 0;
let total = 0;

let MwSt = 0;
const MwSt_Satz = 0.07;

const r_code = "XMAS2024";
const r_Rabatt = 0.1;

let boxgröße_P = 0;
let boxgröße = 0;
let keksform_P = 0;
let teigart_P = 0;
let K_topping_P = 0;
let E_topping_P = 0;
let verpakung_P = 0;
let optional_P = 0;

//Überprüfen welche Option ausgewählt wurde (boxgröße_P)
function boxsize() {
  const Box_radios = document.getElementsByName("boxSize");

  for (const radio of Box_radios) {
    if (radio.checked) {
      boxgröße_P = parseFloat(radio.value);
      break;
    }
  }
  if (boxgröße_P == 5) {
    boxgröße = 15;
  } else if (boxgröße_P == 7) {
    boxgröße = 21;
  } else {
    boxgröße = 27;
  }
  price_calc();
}
// Überprüfen welche Option ausgewählt wurde (teigart_P)
function Teigart() {
  const teigartRadios = document.getElementsByName("Teig");

  for (const radio of teigartRadios) {
    if (radio.checked) {
      teigart_P = parseFloat(radio.value);
      break;
    }
  }
  price_calc();
}

//Überprüfen welche Option ausgewählt wurde (keksform_P)
function Keksform() {
  const Keksform_radios = document.getElementsByName("shape");

  for (const radio of Keksform_radios) {
    if (radio.checked) {
      keksform_P = parseFloat(radio.value);
      break;
    }
  }
  keksform_P = keksform_P * boxgröße;
  price_calc();
}

// Überprüfen welche Option ausgewählt wurde (K_topping_P)
function kTopping() {
  const kToppingRadios = document.getElementsByName("kTopping");

  for (const radio of kToppingRadios) {
    if (radio.checked) {
      K_topping_P = parseFloat(radio.value);
      break;
    }
  }
  price_calc();
}

// Überprüfen welche Option ausgewählt wurde (E_topping_P)
function eTopping() {
  const eTopping_Checkboxes = document.getElementsByName("extraTopping");

  for (const checkbox of eTopping_Checkboxes) {
    if (checkbox.checked) {
      E_topping_P += parseFloat(checkbox.value);
      break;
    }
  }
  price_calc();
}

// Überprüfen welche Option ausgewählt wurde (verpakung_P)
function verpakung() {
  const verpakungRadios = document.getElementsByName("verpackung");

  for (const radio of verpakungRadios) {
    if (radio.checked) {
      verpakung_P = parseFloat(radio.value);
      break;
    }
  }
  price_calc();
}

// Überprüfen welche Option ausgewählt wurde (optional_P)
function optional() {
  const optional_Checkboxes = document.getElementsByName("Optional");

  for (const checkbox of optional_Checkboxes) {
    if (checkbox.checked) {
      optional_P += parseFloat(checkbox.value);
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
    base_price = boxgröße_P + keksform_P + K_topping_P + E_topping_P + verpakung_P + optional_P;
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
