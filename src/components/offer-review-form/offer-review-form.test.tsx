import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithStoreAndHistoryComponent } from '../../utils/mock-component';
import { makeFakeState } from '../../utils/mocks';
import OfferReviewForm from './offer-review-form';

describe('Component: OfferReviewForm', () => {
  const ratingElement = 'rating5Element';
  const reviewElement = 'reviewElement';
  const incorrectReviewValue = '12345';
  const correctReviewValue = Array.from({ length: 60 }).join('1');
  const state = makeFakeState();

  it('should render & button disable ', async () => {
    renderWithStoreAndHistoryComponent(<OfferReviewForm />, state);
    const button = screen.getByRole('button');
    await userEvent.click(screen.getByTestId(ratingElement));
    await userEvent.type(
      screen.getByTestId(reviewElement),
      incorrectReviewValue
    );
    expect(screen.getByDisplayValue(incorrectReviewValue)).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('should render & button enable ', async () => {
    renderWithStoreAndHistoryComponent(<OfferReviewForm />, state);
    const button = screen.getByRole('button');
    await userEvent.click(screen.getByTestId(ratingElement));
    await userEvent.type(screen.getByTestId(reviewElement), correctReviewValue);
    expect(screen.getByDisplayValue(correctReviewValue)).toBeInTheDocument();
    expect(button).toBeEnabled();
  });
});
