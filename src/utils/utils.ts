import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SortType } from '../const';
import { OfferEntity } from '../types/types';

export const getRatingPercent = (rating: number): number =>
  Math.round(rating) * 20;

export const applySorting = {
  [SortType.popular]: null,
  [SortType.priceHigh2Low]: (
    nextOffer: OfferEntity,
    currentOffer: OfferEntity
  ) => currentOffer.price - nextOffer.price,
  [SortType.priceLow2High]: (
    nextOffer: OfferEntity,
    currentOffer: OfferEntity
  ) => nextOffer.price - currentOffer.price,

  [SortType.topRatedFirst]: (
    nextOffer: OfferEntity,
    currentOffer: OfferEntity
  ) => currentOffer.rating - nextOffer.rating,
};

export const getRandomInteger = function (
  firstNumber: number,
  secondNumber: number
) {
  const lower = Math.ceil(Math.min(firstNumber, secondNumber));
  const upper = Math.floor(Math.max(firstNumber, secondNumber));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const getRandomArrayElement = <T>(elements: T[]): T =>
  elements[getRandomInteger(0, elements.length - 1)];

export const capitalizeFirsLetter = (someText: string): string =>
  someText[0].toUpperCase() + someText.substring(1);

export const ScrollScreenToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
