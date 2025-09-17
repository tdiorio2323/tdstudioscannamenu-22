import React from "react";
import { AuthPage } from "@/components/AuthPage";

// MBM Designs page
const MbDesigns = () => {
  // Card logo (centered inside card) - MBM logo
  const logo = "/MBM.png";

  // Bouncing background logo (desktop only) - using MBM images
  const bounce = [
    "/MBM/MBM01.png",
    "/MBM/MBM02.png",
  ];

  // MBM slideshow images for the bottom image box (specific 7 images)
  const mbmImages = [
    "/MBM/MBM13.png",
    "/MBM/MBM11.png",
    "/MBM/MBM12.png",
    "/MBM/MBM10.png",
    "/MBM/MBM09.jpg",
    "/MBM/MBM08.png",
    "/MBM/MBM07.png"
  ];

  // Use first image as default, slideshow will cycle through all
  const promoImage = mbmImages[0];

  // Set page background - using diamond background
  const bg = "/diamond-bg.jpg";

  // Custom buttons for MBM
  const customButtons = [
    { label: "MBM WEBSITE", url: "https://mylarprintz.com/" },
    { label: "PREMADE DESIGNS", url: "https://mylarprintz.com/collections/all" },
    { label: "CONTACT", url: "https://mylarprintz.com/pages/contact" }
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
      slideshowImages={mbmImages}
      customButtons={customButtons}
      mainImageSrc={logo}
    />
  );
};

export default MbDesigns;