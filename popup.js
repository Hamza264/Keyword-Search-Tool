// Load saved results, input fields, and search engine when the popup is opened
document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get(
    ["savedResults", "savedInputs", "savedSearchEngine"],
    function (data) {
      if (data.savedResults) {
        displayResults(data.savedResults);
      }
      if (data.savedInputs) {
        document.getElementById("listA").value = data.savedInputs.listA || "";
        document.getElementById("listB").value = data.savedInputs.listB || "";
        document.getElementById("listC").value = data.savedInputs.listC || "";
      }
      if (data.savedSearchEngine) {
        document.getElementById("searchEngine").value = data.savedSearchEngine;
      } else {
        document.getElementById("searchEngine").value = "google"; // Set default value to "Google"
      }
    }
  );
});

// Save the search engine selection when it changes
document.getElementById("searchEngine").addEventListener("change", function () {
  const searchEngine = document.getElementById("searchEngine").value;
  chrome.storage.local.set({ savedSearchEngine: searchEngine });
});

// Save the text fields whenever they are changed
document.getElementById("listA").addEventListener("input", function () {
  saveInputs();
});
document.getElementById("listB").addEventListener("input", function () {
  saveInputs();
});
document.getElementById("listC").addEventListener("input", function () {
  saveInputs();
});

function saveInputs() {
  const listA = document.getElementById("listA").value;
  const listB = document.getElementById("listB").value;
  const listC = document.getElementById("listC").value;

  chrome.storage.local.set({
    savedInputs: {
      listA: listA,
      listB: listB,
      listC: listC,
    },
  });
}

document.getElementById("generateBtn").addEventListener("click", function () {
  const searchEngine = document.getElementById("searchEngine").value;
  const listA = document
    .getElementById("listA")
    .value.split(",")
    .map((item) => item.trim());
  const listB = document
    .getElementById("listB")
    .value.split(",")
    .map((item) => item.trim());
  const listC = document
    .getElementById("listC")
    .value.split(",")
    .map((item) => item.trim());

  let results = [];

  listA.forEach((a) => {
    listB.forEach((b) => {
      listC.forEach((c) => {
        const combination = `${a}, ${b}, ${c}`;
        const query = encodeURIComponent(combination);
        const url =
          searchEngine === "scholar"
            ? `https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=${query}`
            : `https://www.google.com/search?q=${query}`;
        results.push({ combination, url });
      });
    });
  });

  // Save results to Chrome storage
  chrome.storage.local.set({ savedResults: results }, function () {
    displayResults(results);
  });
});

document.getElementById("randomizeBtn").addEventListener("click", function () {
  chrome.storage.local.get("savedResults", function (data) {
    if (data.savedResults) {
      let results = data.savedResults;
      results = shuffleArray(results);
      chrome.storage.local.set({ savedResults: results }, function () {
        displayResults(results);
      });
    }
  });
});

document.getElementById("clearBtn").addEventListener("click", function () {
  chrome.storage.local.remove(
    ["savedInputs", "savedSearchEngine"],
    function () {
      document.getElementById("listA").value = "";
      document.getElementById("listB").value = "";
      document.getElementById("listC").value = "";
    }
  );
});

function displayResults(results) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";
  results.forEach((item) => {
    const divElement = document.createElement("div");
    divElement.className = "result-item";

    const linkElement = document.createElement("a");
    linkElement.href = item.url;
    linkElement.target = "_blank";
    linkElement.className = "result-link";
    linkElement.textContent = item.combination;

    divElement.appendChild(linkElement);
    resultsDiv.appendChild(divElement);
  });
}

function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
