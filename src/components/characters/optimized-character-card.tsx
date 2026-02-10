"use client";

import React, { memo, useMemo, useCallback } from 'react';
import { optimizeComponent, performance } from '../../lib/performance';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface CharacterCardProps {
  character: {
    id: string;
    name: string;
    imageUrl: string;
    rarity: string;
    attribute: string;
    race: string[];
    game?: string;
    slug?: string;
    Crossover?: boolean;
  };
  onClick?: (character: any) => void;
  onAddToCollection?: (characterId: string) => void;
  inCollection?: boolean;
  loading?: boolean;
  className?: string;
}

function CharacterCardBase({
  character,
  onClick,
  onAddToCollection,
  inCollection = false,
  loading = false,
  className,
}: CharacterCardProps) {
  performance.mark(`CharacterCard-render-${character.id}`);

  const rarityColor = useMemo(() => {
    const colors: Record<string, string> = {
      'R': 'bg-gray-500',
      'SR': 'bg-blue-500', 
      'SSR': 'bg-purple-500',
      'UR': 'bg-orange-500',
      'LR': 'bg-red-500'
    };
    return colors[character.rarity] || 'bg-gray-500';
  }, [character.rarity]);

  const attributeColor = useMemo(() => {
    const colors: Record<string, string> = {
      'Strength': 'bg-red-600',
      'HP': 'bg-green-600',
      'Speed': 'bg-blue-600', 
      'Dark': 'bg-purple-600',
      'Light': 'bg-yellow-600'
    };
    return colors[character.attribute] || 'bg-gray-600';
  }, [character.attribute]);

  const handleClick = useCallback(() => {
    onClick?.(character);
  }, [character, onClick]);

  const handleAddToCollection = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCollection?.(character.id);
  }, [character.id, onAddToCollection]);

  const cardContent = useMemo(() => (
    <div className="relative group cursor-pointer transition-all duration-200 hover:scale-105">
      <div className="aspect-[3/4] relative overflow-hidden rounded-lg bg-gradient-to-b from-gray-100 to-gray-200">
        <img
          src={character.imageUrl}
          alt={character.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        <div className="absolute top-2 left-2 flex gap-1">
          <Badge className={`${rarityColor} text-white text-xs`}>
            {character.rarity}
          </Badge>
          <Badge className={`${attributeColor} text-white text-xs`}>
            {character.attribute}
          </Badge>
        </div>

        {character.Crossover && (
          <Badge className="absolute top-2 right-2 bg-pink-500 text-white text-xs">
            Crossover
          </Badge>
        )}

        {inCollection && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-green-500 text-white text-xs">
              ✓ In Collection
            </Badge>
          </div>
        )}
      </div>

      <div className="mt-2 space-y-1">
        <h3 className="font-semibold text-sm truncate">{character.name}</h3>
        <div className="flex flex-wrap gap-1">
          {character.race.map((r) => (
            <Badge key={r} variant="outline" className="text-xs">
              {r}
            </Badge>
          ))}
        </div>
      </div>

      {onAddToCollection && (
        <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant={inCollection ? "outline" : "default"}
            onClick={handleAddToCollection}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Loading...' : inCollection ? 'Remove' : 'Add to Collection'}
          </Button>
        </div>
      )}
    </div>
  ), [
    character,
    rarityColor,
    attributeColor,
    inCollection,
    loading,
    handleAddToCollection
  ]);

  performance.measure(`CharacterCard-render-${character.id}`, `CharacterCard-render-${character.id}`);

  return (
    <Card className={className} onClick={handleClick}>
      {cardContent}
    </Card>
  );
}

export const CharacterCard = optimizeComponent(CharacterCardBase, {
  memo: true,
  deepCompare: true
});