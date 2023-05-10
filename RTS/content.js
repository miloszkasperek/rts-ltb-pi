function getImageSrcFromDataset(char) {
  const specialCharsMap = {
    ':': 'dwu',
    '.': 'kropka',
    ';': 'sred',
    '"': 'cudzy',
    ' ': 'spacja'
  };

  const baseDir = 'alfabet';
  const fileExtension = '.png';

  let fileName;
  if (specialCharsMap.hasOwnProperty(char)) {
    fileName = specialCharsMap[char];
  } else {
    fileName = char.toLowerCase(); // Convert the character to lowercase
  }

  const filePath = `${baseDir}/${fileName}${fileExtension}`;
  const url = chrome.runtime.getURL(filePath);

  console.log(`Character: ${char}, Image URL: ${url}`); // Log the character and its corresponding image URL
  return url;
}

function showSignImages(text) {
  const container = document.getElementById('psl-image-container') || createImageContainer();
  container.innerHTML = ''; // Clear previous images

  console.log(`Selected Text: ${text}`); // Log the selected text

  for (const char of text) {
    const signImage = document.createElement('img');
    signImage.src = getImageSrcFromDataset(char);
    signImage.style.cssText = 'width: 80px; height: 80px; margin: 5px;';
    container.appendChild(signImage);
  }
}



function createImageContainer() {
  const container = document.createElement('div');
  container.id = 'psl-image-container';
  container.style.cssText = 'position: fixed; bottom: 0; left: 0; width: 100%; height: auto; background-color: white; z-index: 9999; display: flex; flex-wrap: wrap; justify-content: center; padding: 10px;';
  document.body.appendChild(container);
  return container;
}

function showSignImages(text) {
  const container = document.getElementById('psl-image-container') || createImageContainer();
  container.innerHTML = ''; // Clear previous images

  for (const char of text) {
    if (char === ' ') continue; // Skip spaces
    const signImage = document.createElement('img');
    signImage.src = getImageSrcFromDataset(char); // Replace this with your dataset logic
    signImage.style.cssText = 'width: 80px; height: 80px; margin: 5px;';
    container.appendChild(signImage);
  }
}

document.addEventListener('mouseup', () => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) showSignImages(selectedText);
});
