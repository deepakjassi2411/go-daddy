import { render, screen } from '@testing-library/react';
import Home from './Home';
import { RepoContext } from '../../context/RepoProvider';

jest.mock("../ListItem/ListItem.js", () => (({ repo }) => <div data-testid="_repo">{repo?.full_name}</div>));

function renderHome(children, contextValue) {
    return render(
        <RepoContext.Provider value={contextValue}>
            {children}
        </RepoContext.Provider>
    );
}


describe("Home component", () => {

    test('get all the repos from api', () => {
        const repos = [
            {
                full_name: 'Repo 1'
            },
            {
                full_name: 'Repo 2'
            },
            {
                full_name: 'Repo 3'
            },
        ];
        jest.spyOn(global, "fetch").mockImplementation(
            jest.fn(
                () => Promise.resolve({
                    json: () => Promise.resolve(repos),
                }),
            )
        );
        renderHome(<Home />, { repos: [], setRepos: jest.fn() });
        expect(global.fetch).toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith("https://api.github.com/orgs/godaddy/repos", {"method": "GET"});
    });

    test('show list of repositories when context has repos', () => {
        const repositories = [
            {
                full_name: 'Repo 1'
            },
            {
                full_name: 'Repo 2'
            },
            {
                full_name: 'Repo 3'
            },
        ];
        renderHome(<Home />, { repos: repositories, setRepos: jest.fn() });
        expect(global.fetch).not.toHaveBeenCalled();
        const repoList = screen.getAllByTestId('_repo');
        expect(repoList.length).toStrictEqual(3);
    });
})


