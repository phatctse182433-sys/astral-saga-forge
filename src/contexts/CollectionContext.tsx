import { createContext, useContext, useState, ReactNode } from "react";
import { UserCollection } from "@/types/card";

interface CollectionContextType {
  collection: UserCollection;
  addCardToCollection: (cardId: string) => void;
  removeCardFromCollection: (cardId: string) => void;
  markSeriesCompleted: (seriesId: string) => void;
  hasCard: (cardId: string) => boolean;
  hasPurchased: (cardId: string) => boolean;
  isSeriesCompleted: (seriesId: string) => boolean;
}

const CollectionContext = createContext<CollectionContextType | undefined>(undefined);

export const CollectionProvider = ({ children }: { children: ReactNode }) => {
  const [collection, setCollection] = useState<UserCollection>({
    collectedCards: [],
    completedSeries: [],
    purchasedCards: []
  });  const addCardToCollection = (cardId: string) => {
    setCollection(prev => ({
      ...prev,
      collectedCards: prev.collectedCards.includes(cardId) 
        ? prev.collectedCards 
        : [...prev.collectedCards, cardId],
      // Auto add to purchased when adding to collection
      purchasedCards: prev.purchasedCards.includes(cardId)
        ? prev.purchasedCards
        : [...prev.purchasedCards, cardId]
    }));
  };

  const removeCardFromCollection = (cardId: string) => {
    setCollection(prev => ({
      ...prev,
      collectedCards: prev.collectedCards.filter(id => id !== cardId)
    }));
  };

  const markSeriesCompleted = (seriesId: string) => {
    setCollection(prev => ({
      ...prev,
      completedSeries: prev.completedSeries.includes(seriesId)
        ? prev.completedSeries
        : [...prev.completedSeries, seriesId]
    }));
  };

  const hasCard = (cardId: string) => {
    return collection.collectedCards.includes(cardId);
  };

  const hasPurchased = (cardId: string) => {
    return collection.purchasedCards.includes(cardId);
  };

  const isSeriesCompleted = (seriesId: string) => {
    return collection.completedSeries.includes(seriesId);
  };
  return (
    <CollectionContext.Provider value={{
      collection,
      addCardToCollection,
      removeCardFromCollection,
      markSeriesCompleted,
      hasCard,
      hasPurchased,
      isSeriesCompleted
    }}>
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollection = () => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error("useCollection must be used within CollectionProvider");
  }
  return context;
};
