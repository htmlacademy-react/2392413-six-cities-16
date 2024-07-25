import { createSlice } from '@reduxjs/toolkit';
import { StatusCodes } from 'http-status-codes';
import { Cities, NameSpace, SortType } from '../../const';
import { OfferEntity, OfferProcess, PostReviewState } from '../../types';
import {
  fetchFavoriteOffersAction,
  fetchNearbyOfferAction,
  fetchOfferAction,
  fetchOfferDetailAction,
  fetchReviewAction,
  postFavoriteOfferAction,
  PostReviewAction,
} from '../api-actions';
import {
  clearFavoritesOffers,
  setCurrentCity,
  setCurrentSort,
} from './../action';

const initialState: OfferProcess = {
  offers: [],
  offer: null,
  nearbyOffer: [],
  reviews: [],
  postReviewState: PostReviewState.Send,
  currentCity: Cities[0],
  favoriteOffers: [],
  currentSort: SortType.popular,
  isOffersLoading: false,
  isOfferLoading: false,
  isFavoriteOffersLoading: false,
  responseStatusCode: StatusCodes.PROCESSING,
};
const setIsFavoriteState = (
  offers: OfferEntity[],
  newOfferState: OfferEntity
): void => {
  offers.some((offer) => {
    if (offer.id === newOfferState.id) {
      offer.isFavorite = newOfferState.isFavorite;
      return true;
    }
  });
};

export const offerProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setCurrentCity, (state, action) => {
        state.currentCity = action.payload;
      })
      .addCase(setCurrentSort, (state, action) => {
        state.currentSort = action.payload;
      })
      //////////
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOffersLoading = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      //////////
      .addCase(fetchOfferDetailAction.pending, (state) => {
        state.isOfferLoading = true;
        state.responseStatusCode = StatusCodes.PROCESSING;
      })
      .addCase(fetchOfferDetailAction.rejected, (state) => {
        state.isOfferLoading = false;
        state.responseStatusCode = StatusCodes.NOT_FOUND;
      })
      .addCase(fetchOfferDetailAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferLoading = false;
        state.responseStatusCode = StatusCodes.OK;
      })
      //////////
      .addCase(fetchNearbyOfferAction.fulfilled, (state, action) => {
        state.nearbyOffer = action.payload;
      })
      //////////
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isFavoriteOffersLoading = true;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.isFavoriteOffersLoading = false;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isFavoriteOffersLoading = false;
      })
      .addCase(postFavoriteOfferAction.fulfilled, (state, action) => {
        const offer = action.payload;
        if (offer.isFavorite) {
          state.favoriteOffers = [...state.favoriteOffers, offer];
        } else {
          state.favoriteOffers = state.favoriteOffers.filter(
            (favoriteOffer) => favoriteOffer.id !== offer.id
          );
        }
        setIsFavoriteState(state.offers, offer);
      })
      .addCase(clearFavoritesOffers, (state) => {
        state.offers.map((offer) => (offer.isFavorite = false));
        state.nearbyOffer.map((offer) => (offer.isFavorite = false));
        if (state.offer) {
          state.offer.isFavorite = false;
        }
        state.favoriteOffers = [];
      })
      //////////
      .addCase(fetchReviewAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(PostReviewAction.pending, (state) => {
        state.postReviewState = PostReviewState.Sending;
      })
      .addCase(PostReviewAction.rejected, (state) => {
        state.postReviewState = PostReviewState.Error;
      })
      .addCase(PostReviewAction.fulfilled, (state, action) => {
        state.reviews = [...state.reviews, action.payload];
        state.postReviewState = PostReviewState.Send;
      });
  },
});
