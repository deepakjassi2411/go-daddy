import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import ListItem from './ListItem';

// Mock item object to use in tests
const mockItem = {
  id: 1,
  full_name: 'test/repo',
  created_at: '2021-01-01T00:00:00Z',
  updated_at: '2022-01-01T00:00:00Z',
};

describe('ListItem Component', () => {

  it('renders the full_name as a clickable link', () => {
    render(
      <BrowserRouter>
        <ListItem item={mockItem} />
      </BrowserRouter>
    );
    const linkElement = screen.getByText(/test\/repo/i); // full_name
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest('a')).toHaveAttribute('href', '/repo-detail/1');
  });

  it('displays the correct creation date', () => {
    render(
      <BrowserRouter>
        <ListItem item={mockItem} />
      </BrowserRouter>
    );
    const creationDateElement = screen.getByTestId('_creationDate');
    expect(creationDateElement).toHaveTextContent('Created on 1/1/2021');
  });

  it('displays the correct last update date', () => {
    render(
      <BrowserRouter>
        <ListItem item={mockItem} />
      </BrowserRouter>
    );
    const updateDateElement = screen.getByTestId('_updateDate');
    expect(updateDateElement).toHaveTextContent('Last Updated on 1/1/2022');
  });

  it('handles missing or invalid date props gracefully', () => {
    const invalidItem = { ...mockItem, created_at: null, updated_at: null };

    render(
      <BrowserRouter>
        <ListItem item={invalidItem} />
      </BrowserRouter>
    );

    const creationDateElement = screen.queryByTestId('_creationDate');
    const updateDateElement = screen.queryByTestId('_updateDate');

    expect(creationDateElement).toBeNull();
    expect(updateDateElement).toBeNull();
  });

});

