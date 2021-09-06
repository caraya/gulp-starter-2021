const copyBtn = document.getElementById('copyBtn');
const pasteBtn = document.getElementById('pasteBtn');
// Write to clipboard
copyBtn.addEventListener(
  "click", 
  (e) => {
    await navigator.clipboard.writeText("Yo")
  }
)

// Read from clipboard
pasteBtn.addEventListener(
  "click", 
  (e) => {
    await navigator.clipboard.readText()
  }
)
