chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    'bounds': {
      'width': 500,
      'height': 110
    },
    "maxWidth": 500,
    "minWidth": 500,
    "maxHeight": 110,
    "minHeight": 110,
    "frame":"none",
  });
});