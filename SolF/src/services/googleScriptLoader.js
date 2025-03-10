export const loadGoogleScript = (callback) => {
    // Check if Google script is already loaded
    if (window.google) {
      callback();
      return;
    }
  
    const script = document.createElement('script');
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = callback;
  
    document.head.appendChild(script);

    
  };