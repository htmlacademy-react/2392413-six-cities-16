import { StatusCodes } from 'http-status-codes';
import { Cities, NameSpace, SortType } from '../../const';
import { OfferProcess } from '../../types/types';
import { setCurrentCity, setCurrentSort } from '../action';
import { makeFakeState, mockOffer } from './../../utils/mocks';
import { fetchOfferDetailAction, fetchOffersAction } from './../api-actions';
import { offerProcess } from './offer-process';

describe('Offers slice', () => {
  const state: OfferProcess = makeFakeState()[NameSpace.Data];

  it('should set selected city is state', () => {
    const newCity = Cities[1];
    const result = offerProcess.reducer(state, setCurrentCity(newCity));
    expect(result.currentCity).toEqual(newCity);
  });

  it('should set selected sort is state', () => {
    const newSort = SortType.priceLow2High;
    const result = offerProcess.reducer(state, setCurrentSort(newSort));
    expect(result.currentSort).toEqual(newSort);
  });

  it('should set true in state.isOffersLoading', () => {
    const result = offerProcess.reducer(state, fetchOffersAction.pending);
    expect(result.isOffersLoading).toBe(true);
  });

  it('should set false in state.isOffersLoading', () => {
    const result = offerProcess.reducer(state, fetchOffersAction.rejected);
    expect(result.isOffersLoading).toBe(false);
  });

  it('should set false in state.isOffersLoading', () => {
    const result = offerProcess.reducer(state, fetchOffersAction.fulfilled);
    expect(result.isOffersLoading).toBe(false);
  });

  it('should set true in state.isOfferLoading and 102 in state.responseStatusCode', () => {
    const result = offerProcess.reducer(state, fetchOfferDetailAction.pending);
    const { isOfferLoading, responseStatusCode } = result;

    expect({ isOfferLoading, responseStatusCode }).toEqual({
      isOfferLoading: true,
      responseStatusCode: StatusCodes.PROCESSING,
    });
  });

  it('should set true in state.isOfferLoading and 404 in state.responseStatusCode', () => {
    const result = offerProcess.reducer(state, fetchOfferDetailAction.rejected);
    const { isOfferLoading, responseStatusCode } = result;

    expect({ isOfferLoading, responseStatusCode }).toEqual({
      isOfferLoading: false,
      responseStatusCode: StatusCodes.NOT_FOUND,
    });
  });

  it('should set true in state.isOfferLoading and 200 in state.responseStatusCode', () => {
    const result = offerProcess.reducer(
      state,
      fetchOfferDetailAction.fulfilled(mockOffer, '', { id: mockOffer.id })
    );
    const { isOfferLoading, responseStatusCode, offer } = result;

    expect({ isOfferLoading, responseStatusCode, offer }).toEqual({
      isOfferLoading: false,
      responseStatusCode: StatusCodes.OK,
      offer,
    });
  });
});
