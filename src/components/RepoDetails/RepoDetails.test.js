import { render, screen } from '@testing-library/react';
import RepoDetails from './RepoDetails';
import { RepoContext } from '../../context/RepoProvider';

jest.mock('../Tabs/Tabs.js', () => (() => <div>Mock Tabs Component</div>));
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useParams: jest.fn().mockReturnValue({id:1})
}))

const rrd = require('react-router');

const repo = {
    id: 1,
    watchers: 3,
    language: 'Javascript',
    forks_count: 2,
    description: 'Mock repo description',
    full_name: 'Mock repo name'
};

function renderRepoDetails(children, contextValue) {
    return render(
        <RepoContext.Provider value={contextValue}>
            {children}
        </RepoContext.Provider>
    );
}

describe("Repo Details component", () => {
    beforeEach(() => {
        jest.spyOn(global, "fetch").mockImplementation(
            jest.fn(
                () => Promise.resolve({
                    json: () => Promise.resolve([repo]),
                }),
            )
        );
        jest.spyOn(rrd, 'useParams').mockReturnValue({ id: 1 });
    });

    test('renders Repo Details component', () => {
        renderRepoDetails(<RepoDetails />,{repos: [repo], setRepos:jest.fn()});
        const title = screen.getByTestId('_fullName');
        const watchers = screen.getByTestId('_watchers');
        const language = screen.getByTestId('_language');
        const forksCount = screen.getByTestId('_forksCount');
        const description = screen.getByTestId('_description');

        expect(title).toBeInTheDocument();
        expect(watchers).toBeInTheDocument();
        expect(language).toBeInTheDocument();
        expect(forksCount).toBeInTheDocument();
        expect(description).toBeInTheDocument();
    });

    test('should fetch all the repos if repos are not available in context', () => {
        renderRepoDetails(<RepoDetails />, {repos: [], setRepos:jest.fn()});
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith('https://api.github.com/orgs/godaddy/repos',{"method": "GET"});
    });
})

