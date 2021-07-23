const positive = document.getElementById("positive");
const negative = document.getElementById('negative');
const loading = document.getElementById("loading");
const form = document.getElementById("feedback-form")
const feedback = document.getElementById("feedback");
const name = document.getElementById("name");
const catagory = document.getElementById("catagory");
const url = "https://rathodjay240101.pythonanywhere.com/get-feedback-sentiment";

// Add Event Listener To Disable Right Click
document.addEventListener("contextmenu", disableRightClick);

function disableRightClick(e) { e.preventDefault(); }

// Add Event Listener To Disable Inspection
document.addEventListener("keydown", disableInspection);

function disableInspection(e) {

  // "I" key
  if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
    disabledEvent(e);
  }
  // "J" key
  if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
    disabledEvent(e);
  }
  // "S" key + macOS
  if (e.keyCode == 83 &&
      (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
    disabledEvent(e);
  }
  // "U" key
  if (e.ctrlKey && e.keyCode == 85) {
    disabledEvent(e);
  }
  // "F12" key
  if (event.keyCode == 123) {
    disabledEvent(e);
  }
}

// Add Event Listener To Handle Form Submition
form.addEventListener('submit', onSubmitHandler);

async function onSubmitHandler(event) {
  try {
    event.preventDefault();

    enableElement(loading);
    feedbackValue = feedback.value;
    catagoryValue = parseInt(catagory.value);

    const response = await fetch(url, {
      method : "POST",
      headers : {"Content-Type" : "application/json"},
      body :
          JSON.stringify({feedback : feedbackValue, catagory : catagoryValue})
    });

    const {sentiment} = await response.json();

    disableElement(loading);

    if (sentiment == 1) {
      enableElement(positive);
      setTimeout(() => disableElement(positive), 10000);
    } else {
      enableElement(negative);
      setTimeout(() => disableElement(negative), 10000);
    }

  } catch (error) {
    disableElement(loading);
    disableElement(positive);
    disableElement(negative);
    console.log(error);
  }
}

function disableElement(element) { element.className = "disabled"; }

function enableElement(element) { element.className = ""; }
