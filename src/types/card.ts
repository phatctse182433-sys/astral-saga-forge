export type CardRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';

export interface Card {
  id: string;
  name: string;
  mythology: string;
  image: string;
  rarity: CardRarity;
  price: number;
  story: {
    preview: string;
    full: string;
  };
  nfcEnabled: boolean;
  stock?: number;
}

export interface CartItem {
  card: Card;
  quantity: number;
}

export interface CardPack {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  cardCount: number;
  bonusCards: number;
  image: string;
  rarityOdds: {
    common: number;
    rare: number;
    epic: number;
    legendary: number;
  };
  badge?: string;
  guaranteedLegendary?: boolean;
}
