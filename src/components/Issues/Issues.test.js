import { render, screen, act } from '@testing-library/react';
import Issues from './Issues';

const issues = [
    {
        id: 1,
        state: 'open',
        title: 'Title 1',
        created_at: new Date(),
        user : {
            login: 'Author 1',
            avatar_url: ''
        }
    },
    {
        id: 2,
        state: 'closed',
        title: 'Title 2',
        created_at: new Date(),
        user : {
            login: 'Author 2',
            avatar_url: ''
        }
    }
]


describe("Issues component", () => {
    beforeEach(() => {
        jest.spyOn(global, "fetch").mockImplementation(
            jest.fn(
                () => Promise.resolve({
                    json: () => Promise.resolve(issues),
                }),
            )
        );
    });

    test('renders Issues component',async () => {
        await act(() => {
            render(<Issues url='/randomurl' />);
        });
        const issues = screen.getAllByTestId('_issue');
        const authors = screen.getAllByTestId('_author');

        expect(issues.length).toBe(2);
        expect(authors[0]).toHaveTextContent('Author 1');
        expect(authors[1]).toHaveTextContent('Author 2');
    });
})


