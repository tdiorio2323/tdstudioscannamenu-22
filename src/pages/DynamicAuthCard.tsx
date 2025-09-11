import React from "react";
import { useParams } from "react-router-dom";
import { AuthCard, AuthCardData } from "@/components/AuthCard";
import authCards from "@/data/authCards.json";

const DynamicAuthCard = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <div>No slug provided</div>;
  }

  const cardData = (authCards as AuthCardData[]).find(card => card.slug === slug);

  if (!cardData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Card Not Found</h1>
          <p>No auth card found for "{slug}"</p>
        </div>
      </div>
    );
  }

  return <AuthCard {...cardData} />;
};

export default DynamicAuthCard;