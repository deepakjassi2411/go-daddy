import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router';

jest.mock("./components/Home/Home.js", () => (() => <div data-testid="_home">Home Component</div>))
jest.mock("./components/NotFound/NotFound.js", () => (() => <div data-testid="_notFound">Not Found Component</div>))
jest.mock("./components/RepoDetails/RepoDetails.js", () => (() => <div data-testid="_repoDetails">Repo details Component</div>))

describe("App component", () => {

  test('renders home component on default route', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    const homeComponent = screen.getByTestId('_home');
    const repoDetailsComponent = screen.queryByTestId('_repoDetails');
    expect(homeComponent).toBeInTheDocument();
    expect(repoDetailsComponent).toBeNull();
  });

  test('renders repo details component when url contains id', () => {
    render(
      <MemoryRouter initialEntries={["/repo-detail/7683"]}>
        <App />
      </MemoryRouter>
    );
    const homeComponent = screen.queryByTestId('_home');
    const repoDetailsComponent = screen.queryByTestId('_repoDetails');
    expect(homeComponent).toBeNull();
    expect(repoDetailsComponent).toBeInTheDocument();
  });

  test('renders not found page', () => {
    render(
      <MemoryRouter initialEntries={["/random"]}>
        <App />
      </MemoryRouter>
    );
    const homeComponent = screen.queryByTestId('_home');
    const repoDetailsComponent = screen.queryByTestId('_repoDetails');
    const notFoundComponent = screen.queryByTestId('_notFound');
    expect(homeComponent).toBeNull();
    expect(repoDetailsComponent).toBeNull();
    expect(notFoundComponent).toBeInTheDocument();
  });
});
