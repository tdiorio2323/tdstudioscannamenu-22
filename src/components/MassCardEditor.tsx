import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, Save, Eye, Download, Upload } from "lucide-react";
import { AuthCard, AuthCardData } from "./AuthCard";

interface EditableButton {
  label: string;
  url: string;
}

interface EditableCard extends AuthCardData {
  isEditing?: boolean;
  raw_text?: string;
}

export const MassCardEditor: React.FC = () => {
  const [cards, setCards] = useState<EditableCard[]>([]);
  const [selectedCard, setSelectedCard] = useState<EditableCard | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Load cards from JSON
  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      const response = await fetch('/src/data/authCards.json');
      const cardsData = await response.json();
      setCards(cardsData);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load cards:', error);
      setLoading(false);
    }
  };

  const saveCard = (updatedCard: EditableCard) => {
    setCards(cards.map(card => 
      card.slug === updatedCard.slug ? { ...updatedCard, isEditing: false } : card
    ));
    setSelectedCard(null);
    
    // Save to JSON file (you'll need to implement server-side saving)
    saveCardsToFile();
  };

  const saveCardsToFile = async () => {
    try {
      // This would need a backend endpoint to save the JSON file
      const response = await fetch('/api/save-cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cards)
      });
      
      if (response.ok) {
        console.log('Cards saved successfully');
      }
    } catch (error) {
      console.error('Failed to save cards:', error);
    }
  };

  const deleteCard = (slug: string) => {
    setCards(cards.filter(card => card.slug !== slug));
    saveCardsToFile();
  };

  const duplicateCard = (card: EditableCard) => {
    const newCard = {
      ...card,
      slug: `${card.slug}-copy-${Date.now()}`,
      title: `${card.title} (Copy)`
    };
    setCards([...cards, newCard]);
    saveCardsToFile();
  };

  const filteredCards = cards.filter(card => 
    card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading cards...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Mass Card Editor</h1>
          <p className="text-white/80">Edit hundreds of link cards with ease</p>
        </div>

        {/* Controls */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex-1 min-w-64">
              <Input
                placeholder="Search cards by title, username, or slug..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                <Upload className="w-4 h-4 mr-2" />
                Import Batch
              </Button>
              <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                <Download className="w-4 h-4 mr-2" />
                Export All
              </Button>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-white/70">
            {filteredCards.length} of {cards.length} cards shown
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCards.map((card) => (
            <MassCardEditorItem
              key={card.slug}
              card={card}
              onEdit={(card) => setSelectedCard(card)}
              onSave={saveCard}
              onDelete={deleteCard}
              onDuplicate={duplicateCard}
            />
          ))}
        </div>

        {/* Modal Editor */}
        {selectedCard && (
          <CardEditorModal
            card={selectedCard}
            onSave={saveCard}
            onClose={() => setSelectedCard(null)}
          />
        )}
      </div>
    </div>
  );
};

interface MassCardEditorItemProps {
  card: EditableCard;
  onEdit: (card: EditableCard) => void;
  onSave: (card: EditableCard) => void;
  onDelete: (slug: string) => void;
  onDuplicate: (card: EditableCard) => void;
}

const MassCardEditorItem: React.FC<MassCardEditorItemProps> = ({
  card,
  onEdit,
  onDelete,
  onDuplicate
}) => {
  return (
    <Card className="bg-white/10 border-white/20 backdrop-blur-md hover:bg-white/20 transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <img 
            src={card.image} 
            alt={card.title}
            className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold truncate">{card.title}</h3>
            <p className="text-white/70 text-sm truncate">{card.username}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="text-xs text-white/60">
          Slug: {card.slug}
        </div>
        
        <div className="text-xs text-white/60">
          {card.buttons.length} button{card.buttons.length !== 1 ? 's' : ''}
        </div>
        
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline"
            className="flex-1 bg-white/20 border-white/30 text-white hover:bg-white/30"
            onClick={() => onEdit(card)}
          >
            <Eye className="w-3 h-3 mr-1" />
            Edit
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            onClick={() => onDuplicate(card)}
          >
            <Plus className="w-3 h-3" />
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            className="bg-red-500/20 border-red-400/30 text-red-200 hover:bg-red-500/30"
            onClick={() => onDelete(card.slug)}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface CardEditorModalProps {
  card: EditableCard;
  onSave: (card: EditableCard) => void;
  onClose: () => void;
}

const CardEditorModal: React.FC<CardEditorModalProps> = ({ card, onSave, onClose }) => {
  const [editedCard, setEditedCard] = useState<EditableCard>({ ...card });

  const addButton = () => {
    setEditedCard({
      ...editedCard,
      buttons: [...editedCard.buttons, { label: 'New Button', url: '#' }]
    });
  };

  const updateButton = (index: number, field: 'label' | 'url', value: string) => {
    const newButtons = [...editedCard.buttons];
    newButtons[index] = { ...newButtons[index], [field]: value };
    setEditedCard({ ...editedCard, buttons: newButtons });
  };

  const removeButton = (index: number) => {
    setEditedCard({
      ...editedCard,
      buttons: editedCard.buttons.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Edit Card: {card.title}</h2>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Edit Form */}
            <div className="space-y-6">
              <div>
                <Label className="text-white">Title</Label>
                <Input
                  value={editedCard.title}
                  onChange={(e) => setEditedCard({ ...editedCard, title: e.target.value })}
                  className="bg-white/10 border-white/30 text-white"
                />
              </div>

              <div>
                <Label className="text-white">Username</Label>
                <Input
                  value={editedCard.username}
                  onChange={(e) => setEditedCard({ ...editedCard, username: e.target.value })}
                  className="bg-white/10 border-white/30 text-white"
                />
              </div>

              <div>
                <Label className="text-white">Slug (URL)</Label>
                <Input
                  value={editedCard.slug}
                  onChange={(e) => setEditedCard({ ...editedCard, slug: e.target.value })}
                  className="bg-white/10 border-white/30 text-white"
                />
              </div>

              <div>
                <Label className="text-white">Image URL</Label>
                <Input
                  value={editedCard.image}
                  onChange={(e) => setEditedCard({ ...editedCard, image: e.target.value })}
                  className="bg-white/10 border-white/30 text-white"
                />
              </div>

              {/* Buttons Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label className="text-white">Buttons</Label>
                  <Button size="sm" onClick={addButton}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add Button
                  </Button>
                </div>

                <div className="space-y-3">
                  {editedCard.buttons.map((button, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Input
                        placeholder="Button Label"
                        value={button.label}
                        onChange={(e) => updateButton(index, 'label', e.target.value)}
                        className="bg-white/10 border-white/30 text-white"
                      />
                      <Input
                        placeholder="Button URL"
                        value={button.url}
                        onChange={(e) => updateButton(index, 'url', e.target.value)}
                        className="bg-white/10 border-white/30 text-white flex-1"
                      />
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => removeButton(index)}
                        className="bg-red-500/20 border-red-400/30 text-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <Button 
                onClick={() => onSave(editedCard)}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>

            {/* Live Preview */}
            <div className="lg:sticky lg:top-6">
              <Label className="text-white text-lg mb-4 block">Live Preview</Label>
              <div className="bg-black/30 rounded-lg p-4 max-h-96 overflow-hidden">
                <AuthCard {...editedCard} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};