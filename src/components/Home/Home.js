import { useContext, useEffect } from "react";
import { RepoContext } from "../../context/RepoProvider";
import ListItem from "../ListItem/ListItem";

const GET_REPOS_URL = 'https://api.github.com/orgs/godaddy/repos';

function Home() {
    const { repos, setRepos } = useContext(RepoContext);

    function getRepos() {
        fetch(GET_REPOS_URL, {
            method: "GET",
        })
        .then(res => res.json())
        .then(data => setRepos(data));
    }

    useEffect(() => {
        if (repos && repos.length > 0)
            setRepos(repos);
        else
            getRepos();
    }, [repos]);

    return (
        <>
           {repos.map((repo) => <ListItem item={repo} key={repo.id} />)}
        </>
    )
}

export default Home;