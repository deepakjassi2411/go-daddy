import { render, screen } from '@testing-library/react';
import Tabs from './Tabs';

jest.mock('../Tab/Tab.js', () => (() => <div>Mock Tab Component</div>))

const tabs = [
    {
        id: 1,
        name: 'Mock Name',
        title: 'Mock Title',
        child: <p>Mock component</p>,
        count: 2
    }
];

describe("Tabs component", () => {
    test('renders learn react link', () => {
        render(<Tabs tabs={tabs} />);
        const btn = screen.getByRole('button');
        expect(btn).toBeInTheDocument();
        expect(btn).toHaveTextContent('Mock Name 2');
    });


    test('renders tab content', () => {
        render(<Tabs tabs={tabs} />);
        const mockTab = screen.getByText('Mock Tab Component');
        expect(mockTab).toBeInTheDocument();
    });


    test('should have only one tab', () => {
        render(<Tabs tabs={tabs} />);
        const tabItems = screen.getAllByTestId('tabs-item');
        expect(tabItems.length).toBe(1);
    });
})


