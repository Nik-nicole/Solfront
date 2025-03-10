import React, { useEffect } from "react";
import { loadGoogleScript } from "../../services/googleScriptLoader";

const GoogleSignIn = ({ onSuccess, onError }) => {
  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
            client_id: "866771467488-jb8fdb39a603ummdrdokakhn0b4ftihp.apps.googleusercontent.com", 
            callback: handleCredentialResponse
        });

        // Render the Google Sign-In button
        window.google.accounts.id.renderButton(
          document.getElementById("googleSignInButton"),
          { 
            theme: "outline", 
            size: "large",
            type: "standard",
            shape: "rectangular",
            text: "signin_with",
            logo_alignment: "left"
          }
        );

        // Optional: Prompt One-Tap sign-in
        window.google.accounts.id.prompt((notification) => {
          if (notification.isNotDisplayed()) {
            console.log("One-Tap sign-in not displayed");
          }
        });
      }
    };

    const handleCredentialResponse = (response) => {
      if (response.credential) {
        onSuccess(response.credential);
      } else {
        onError("Failed to get Google credential");
      }
    };

    // Load Google Sign-In script
    loadGoogleScript(initializeGoogleSignIn);

    // Cleanup function
    return () => {
      if (window.google) {
        window.google.accounts.id.cancel();
      }
    };
  }, [onSuccess, onError]);

  return (
    <div 
      id="googleSignInButton" 
      data-type="standard"
      data-shape="rectangular"
      data-theme="outline"
      data-text="signin_with"
    />
  );
};

export default GoogleSignIn;