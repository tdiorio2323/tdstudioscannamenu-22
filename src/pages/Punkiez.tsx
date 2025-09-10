import React from "react";
import { AuthPage } from "@/components/AuthPage";

// Duplicates the current home (Auth) page
const Punkiez = () => {
  // Card logo (centered inside card)
  const logo = "https://i.imgur.com/CftyHyg.png"; // try .jpg if needed
  // Bouncing background logo (desktop only)
  const bounce = [
    "https://i.imgur.com/6P36TYr.png",
    "https://i.imgur.com/6P36TYr.jpg",
  ];
  // Show single image in the card, remove extra buttons and the auth form
  const promoImage = "https://i.imgur.com/fPUCKBJ.jpg"; // direct image URL
  // Set page background to the specific image from the album (direct link)
  const bg = "https://i.imgur.com/KBjPwGI.jpg";
  return (
    <AuthPage
      brandLogoSrc={logo}
      bounceSrc={bounce}
      showBounceOnMobile={false}
      hideExtraButtons
      hideAuthForm
      extraImageSrc={promoImage}
      bgImageSrc={bg}
    />
  );
};

export default Punkiez;
