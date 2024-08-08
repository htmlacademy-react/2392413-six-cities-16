import { Cities, NameSpace, SortType } from '../../const';
import { State } from '../../types/types';
import { makeFakeState } from '../../utils/mocks';
import {
  getCurrentCityOffers,
  getFavoriteOffers,
  getFavoriteOffersCount,
  getNearbyOffers,
  getOffer,
  getOffers,
  getOffersCount,
  getOrderedCityOffers,
} from './selectors';

const state: State = makeFakeState();

describe('Offers selectors', () => {
  it('should return offers data', () => {
    const result = getOffers(state);
    expect(result).toBe(state[NameSpace.Data].offers);
  });

  it('should return offers data', () => {
    const result = getOffersCount(state);
    expect(result).toBe(state[NameSpace.Data].offers.length);
  });

  it('should return offer data', () => {
    const result = getOffer(state);
    expect(result).toBe(state[NameSpace.Data].offer);
  });

  it('should return offers data by city', () => {
    state[NameSpace.Data].currentCity = Cities[5];
    const result = getCurrentCityOffers(state);
    expect(result.length).toBe(1);
  });

  it('should return ordered offers by price', () => {
    state[NameSpace.Data].currentCity = Cities[0];
    state[NameSpace.Data].currentSort = SortType.priceLow2High;
    const result = getOrderedCityOffers(state);
    expect(result[0].price).toBe(102);
  });

  it('should return favorite offers', () => {
    const result = getFavoriteOffers(state);
    expect(result.length > 0).toBe(true);
  });

  it('should return favorite offers count', () => {
    const result = getFavoriteOffersCount(state);
    expect(result > 0).toBe(true);
  });

  it('should return nearby offers', () => {
    const result = getNearbyOffers(state);
    expect(result.length === 2).toBe(true);
  });
});
