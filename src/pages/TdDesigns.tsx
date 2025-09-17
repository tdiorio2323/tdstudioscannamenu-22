import React from "react";
import { AuthPage } from "@/components/AuthPage";

// TD Designs page
const TdDesigns = () => {
  // Card logo (centered inside card)
  const logo = "/TD STUDIOS WHITE TEXT.png";

  // Bouncing background logo (desktop only) - Chrome TD Studios logo (Image #1)
  const bounce = ["/TD STUDIOS WHITE TEXT.png"]; 

  // TD slideshow images for the bottom image box
  const tdImages = ["/TD STUDIOS WHITE TEXT.png"]; 

  // Use first image as default, slideshow will cycle through all
  const promoImage = tdImages[0];

  // Set page background - using diamond background
  const bg = "/diamond-bg.jpg";

  // Custom buttons for TD Designs
  const customButtons = [
    { label: "WEBSITE", url: "https://tdstudiosny.com" },
    { label: "CUSTOM DESIGNS", url: "https://tdstudiosny.com/custom-designs" },
    { label: "CONTACT", url: "https://t.me/tdstudioscorp" }
  ];

  return (
    <AuthPage
      brandLogoSrc={logo}
      bounceSrc={bounce}
      showBounceOnMobile={false}
      hideExtraButtons
      hideAuthForm
      extraImageSrc={promoImage}
      bgImageSrc={bg}
      slideshowImages={tdImages}
      customButtons={customButtons}
      mainImageSrc={logo}
    />
  );
};

export default TdDesigns;
