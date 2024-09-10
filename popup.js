document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('toggleDirection').addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: toggleLTRtoRTL,
    });
  });
});

// Define the function to toggle direction and class names
function toggleLTRtoRTL() {
  const allElements = document.querySelectorAll('*');

  allElements.forEach(el => {
    const currentDir = el.getAttribute('dir');
    const currentClass = el.className;

    // Toggle 'dir' attribute
    if (currentDir === 'ltr') {
      el.setAttribute('dir', 'rtl');
    } else if (currentDir === 'rtl') {
      el.setAttribute('dir', 'ltr');
    }

    // Toggle class names from 'ltr' to 'rtl' and vice versa
    if (currentClass && currentClass.includes('ltr')) {
      el.className = currentClass.replace(/ltr/g, 'rtl');
    } else if (currentClass && currentClass.includes('rtl')) {
      el.className = currentClass.replace(/rtl/g, 'ltr');
    }
  });

  // Handle the <body> element separately
  const body = document.body;
  const bodyDir = body.getAttribute('dir') || 'ltr';

  // Toggle 'dir' attribute on the body
  if (bodyDir === 'ltr') {
    body.setAttribute('dir', 'rtl');
  } else {
    body.setAttribute('dir', 'ltr');
  }

  // Toggle class names on the body
  const bodyClass = body.className;
  if (bodyClass.includes('ltr')) {
    body.className = bodyClass.replace(/ltr/g, 'rtl');
  } else if (bodyClass.includes('rtl')) {
    body.className = bodyClass.replace(/rtl/g, 'ltr');
  }
}
