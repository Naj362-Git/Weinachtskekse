// Alle Variablen werden deklariert
let base_price = 0;
let total_price = 0;
let shipping = 0;
let total = 0;

let MwSt = 0;
const MwSt_Satz = 0.07;

const r_code = "XMAS2024";
const r_Rabatt = 0.1;

//"Rabatt" für Testzwecke um zu zeigen, dass die Farbwechsel Funktion funktioniert.
const d_Code = "ShippingTest50";
const d_Rabatt = 50;

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

  teigart_P = 0;

  // Radiobuttons
  for (const radio of teigartRadios) {
    if (radio.type === "radio" && radio.checked) {
      teigart_P = parseFloat(radio.value);
      break;
    }
  }

  //Checkboxes
  for (const checkbox of teigartRadios) {
    if (checkbox.type === "checkbox" && checkbox.checked) {
      teigart_P += parseFloat(checkbox.value);
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
  if (keksform_P === 100) {
    keksform_P = boxgröße / 3;
  } else {
    keksform_P = keksform_P * boxgröße;
  }
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

  E_topping_P = 0;

  for (const checkbox of eTopping_Checkboxes) {
    if (checkbox.checked) {
      E_topping_P += parseFloat(checkbox.value);
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

  optional_P = 0;

  for (const checkbox of optional_Checkboxes) {
    if (checkbox.checked) {
      optional_P += parseFloat(checkbox.value);
      break;
    }
  }
  //Überprüfen ob Persönliche Karte ausgewählt wurde
  const Karte_checkbox = document.getElementById("Karte");

  if (Karte_checkbox.checked) {
    document.getElementById("KartenText").style.opacity = "100%";
  } else {
    document.getElementById("KartenText").style.opacity = "30%";
  }
  price_calc();
}

//Preisberechnung
function price_calc() {
  //Basispreisberechnung
  function base_price_calc() {
    base_price = boxgröße_P + keksform_P + K_topping_P + E_topping_P + verpakung_P + optional_P + teigart_P;
  }
  base_price_calc();

  //Rabatt
  const rabattInput = document.getElementById("Rabatt_eingabe").value;

  if (r_code === rabattInput) {
    base_price = base_price - base_price * r_Rabatt;
  } else if (d_Code === rabattInput) {
    base_price = base_price + d_Rabatt;
  } else {
    base_price = base_price;
  }

  // Versandkostenberechnung
  function shipping_calc() {
    if (base_price > 0 && base_price < 20) {
      shipping = 3.99;
      document.getElementById("shipping").style.color = "red";
    } else if (base_price >= 20 && base_price < 50) {
      shipping = 1.8;
      document.getElementById("shipping").style.color = "red";
    } else if (base_price >= 50) {
      shipping = 0;
      document.getElementById("shipping").style.color = "green";
    } else {
      shipping = 0;
      document.getElementById("shipping").style.color = "black";
    }
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

  //Anzeige der Preise

  document.getElementById("sub-total").innerText = `${format_number(base_price)} €`;
  document.getElementById("total").innerText = `${format_number(total_price)} €`;
  document.getElementById("shipping").innerText = ` ${format_number(shipping)} €`;
  document.getElementById("MwSt").innerText = ` ${format_number(MwSt)} €`;
}

//Umformatierung
function format_number(num) {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

//Funktion um die Anzahl der Zeichen in der Textarea zu zählen
function MaxZeichenDisplay() {
  const textarea = document.querySelector(".kartenText");
  const charCount = document.getElementById("charCount");
  const maxLength = textarea.getAttribute("maxlength");
  const currentLength = textarea.value.length;

  charCount.textContent = `${currentLength}/${maxLength}`;
}

// Bei Aufrufen der Website die Funktion price_calc und MaxZeichenDisplay ausführen
window.onload = function () {
  price_calc();
  MaxZeichenDisplay();
};
