const BACKEND_BASE = "https://cp-tracker-b5c9.onrender.com/api"; // <-- Replace with your backend's real URL

// Helpers for token storage
function saveToken(token) {
  chrome.storage.local.set({ token });
}

function getToken() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['token'], (result) => {
      resolve(result.token || "");
    });
  });
}

function clearToken() {
  chrome.storage.local.remove(['token']);
}

// Helper: Show the token entry UI
function renderTokenEntry() {
  document.body.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 10px; min-width: 320px;">
      <label><b>Paste your CP Dashboard token:</b></label>
      <input id="tokenInput" type="text" style="width: 100%">
      <button id="saveTokenBtn">Save Token</button>
      <div id="tokenResult" style="color: green"></div>
    </div>
  `;
  document.getElementById("saveTokenBtn").onclick = function () {
    const userToken = document.getElementById("tokenInput").value.trim();
    if (userToken) {
      saveToken(userToken);
      document.getElementById("tokenResult").textContent = "Token saved! Reload the popup.";
    }
  };
}

// Helper: Render main extension UI
function renderMainUI() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  if (tabs && tabs[0]) {
    document.getElementById("url").value = tabs[0].url || "";
    document.getElementById("title").value = tabs[0].title || "";
  }
});

  document.body.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 8px; min-width: 320px;">
      <label for="url"><b>URL</b></label>
      <input id="url" type="text" style="width:100%">
      <label for="title"><b>Title</b></label>
      <input id="title" type="text" style="width:100%">
      <label for="difficulty">Difficulty</label>
      <input id="difficulty" type="text" style="width:100%">
      <label for="tags">Tags</label>
      <input id="tags" type="text" style="width:100%">
      <label for="notes">Notes</label>
      <textarea id="notes" style="width:100%"></textarea>
      <button id="fetchBtn">Fetch Details</button>
      <button id="addBtn">Add to Dashboard</button>
      <div id="loading" style="color: green"></div>
      <div id="result" style="color: green"></div>
      <button id="changeTokenBtn" style="margin-top: 8px;">Change/Remove Token</button>
    </div>
  `;

  // Autofill current tab info
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    document.getElementById("url").value = tabs[0].url || "";
    document.getElementById("title").value = tabs[0].title || "";
  });

  // Fetch details from backend
  document.getElementById("fetchBtn").onclick = async function () {
    document.getElementById("loading").textContent = "Fetching...";
    const url = document.getElementById("url").value;
    try {
      const res = await fetch(`${BACKEND_BASE}/parse-question?url=${encodeURIComponent(url)}`);
      if (!res.ok) throw new Error("Parse failed");
      const data = await res.json();
      document.getElementById("title").value = data.title || "";
      document.getElementById("difficulty").value = data.difficulty || "";
      document.getElementById("tags").value = (data.tags || []).join(", ");
      document.getElementById("loading").textContent = "Fetched!";
    } catch (err) {
      document.getElementById("loading").textContent = "Error fetching details";
    }
    setTimeout(() => { document.getElementById("loading").textContent = ""; }, 1500);
  };

  // Add to Dashboard (POST)
  document.getElementById("addBtn").onclick = async function () {
    document.getElementById("loading").textContent = "Adding...";
    const q = {
      url: document.getElementById("url").value,
      title: document.getElementById("title").value,
      difficulty: document.getElementById("difficulty").value,
      tags: document.getElementById("tags").value,
      notes: document.getElementById("notes").value,
    };

    const token = await getToken();
    try {
      const res = await fetch(`${BACKEND_BASE}/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(q)
      });
      if (!res.ok) {
        const errMsg = await res.text();
        document.getElementById("result").textContent = "Error adding question: " + errMsg;
        document.getElementById("loading").textContent = "";
        return;
      }
      document.getElementById("result").textContent = "Added!";
      document.getElementById("loading").textContent = "";
    } catch (err) {
      document.getElementById("result").textContent = "Error adding question: " + err;
      document.getElementById("loading").textContent = "";
    }
    setTimeout(() => { document.getElementById("result").textContent = ""; }, 1500);
  };

  // Change/remove token
  document.getElementById("changeTokenBtn").onclick = function () {
    clearToken();
    location.reload();
  };
}

// On popup open: decide which UI to show
document.addEventListener("DOMContentLoaded", async function () {
  const token = await getToken();
  if (!token) {
    renderTokenEntry();
  } else {
    renderMainUI();
  }
});
