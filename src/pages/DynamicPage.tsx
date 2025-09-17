import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthCard, AuthCardData } from '../components/AuthCard';

export const DynamicPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [card, setCard] = useState<AuthCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;

    // Load the card data
    fetch('/src/data/authCards.json')
      .then(response => response.json())
      .then((cards: AuthCardData[]) => {
        const foundCard = cards.find(c => c.slug === slug);
        if (foundCard) {
          setCard(foundCard);
          // Set page title
          document.title = `${foundCard.title} - Link Page`;
        } else {
          setError(true);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error || !card) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 to-purple-900">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-xl">The page "{slug}" doesn't exist.</p>
        </div>
      </div>
    );
  }

  return <AuthCard {...card} />;
};