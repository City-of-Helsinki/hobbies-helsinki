import App from '../pages/index';
import { screen, render } from './testUtils';

describe('App', () => {
  it.skip('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('Hobbies-Helsinki')).toBeInTheDocument();
  });
});
