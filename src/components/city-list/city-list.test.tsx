import { screen } from '@testing-library/react';
import { CityName } from '../../const';
import { renderWithStoreAndHistoryComponent } from '../../utils/mock-component';
import { makeFakeState } from '../../utils/mocks';
import CityList from './city-list';

describe('Component: CityList', () => {
  it('should render correctly', () => {
    const state = makeFakeState();
    renderWithStoreAndHistoryComponent(<CityList cities={CityName} />, state);
    Object.values(CityName).map((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });
});
