const positive = document.getElementById("positive");
const negative = document.getElementById('negative');
const loading = document.getElementById("loading");
const form = document.getElementById("feedback-form")
const feedback = document.getElementById("feedback");
const name = document.getElementById("name");
const id = document.getElementById("id");
const url = "https://rathodjay240101.pythonanywhere.com/get-feedback-sentiment"

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

    loading.className = "";
    feedbackValue = feedback.value;
    name.value = "";
    id.value = "";
    feedback.value = "";

    const response = await fetch(url, {
      method : "POST",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify({feedback : feedbackValue})
    });

    const {sentiment} = await response.json();

    loading.className = "disabled";

    if (sentiment == 1) {
      positive.className = "";
    } else {
      negative.className = "";
    }

    setTimeout(() => disableElement(sentiment), 10000);
  } catch (error) {
    console.log(error);
  }
}

function disableElement(sentiment) {
  if (sentiment == 1) {
    positive.className = "disabled";
  } else {
    negative.className = "disabled";
  }
}
