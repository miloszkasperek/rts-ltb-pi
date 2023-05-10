// analysisOptions.js
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById("analyze-btn").addEventListener("click", async () => {
    const form = document.getElementById("options-form");
    const formData = new FormData(form);
    const options = {
      option1: formData.get("option1") === "on",
      option2: formData.get("option2") === "on",
    };

    const data = await new Promise((resolve) => {
      chrome.storage.local.get(["selectedText", "currentTabId"], (data) => {
        resolve(data);
      });
    });

    const selectedText = data.selectedText;
    const currentTabId = data.currentTabId;

    // Send a message with the selected text and options to content.js
    chrome.tabs.sendMessage(currentTabId, { command: "analyze", text: selectedText, options: options });

    // Close the options window
    window.close();
  });
});
