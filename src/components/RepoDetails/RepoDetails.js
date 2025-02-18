import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { RepoContext } from "../../context/RepoProvider";
import Tabs from "../Tabs/Tabs";
import Issues from "../Issues/Issues";
import { FaRegEye, FaCodeFork, FaLanguage, FaRegPenToSquare, FaArrowUpRightFromSquare } from "react-icons/fa6";
import './RepoDetails.css';
import { Link } from "react-router";

function RepoDetails() {
    const { id } = useParams();
    const { repos, setRepos } = useContext(RepoContext);
    const [repo, setRepo] = useState({});
    const [tabs, setTabs] = useState([]);
    const GET_REPOS_URL = 'https://api.github.com/orgs/godaddy/repos';

    useEffect(() => {
        if (!repos || repos.length === 0) {
            fetch(GET_REPOS_URL, {
                method: "GET",
            })
            .then(res => res.json())
            .then(data => setRepos(data));
        }
        else {
            const selectedRepo = repos.find(item => item.id === parseInt(id));
            setRepo(selectedRepo);
            setTabs([
                {
                    id: 1,
                    name: <span><FaRegPenToSquare size="16" className="icon" color="#686565" /> Open Issues</span>,
                    title: 'Open Issues',
                    child: <Issues url={repo.issues_url} />,
                    count: repo.open_issues_count
                },
            ]);
        }
    }, [repo, repos]);


    return (
        <>
            {repo && tabs.length && (
                <>
                    <div className="detail-container">
                        <div className="detail">
                            <div  data-testid="_fullName"><h2>{repo.full_name}</h2></div>
                            <div className="detail-logo">
                                <p className="chip" data-testid="_watchers"><FaRegEye />&nbsp; Watchers
                                    <span>{repo.watchers}</span>
                                </p>
                                <p className="chip" data-testid="_language"><FaLanguage />&nbsp;Language
                                    <span>{repo.language}</span>
                                </p>
                                <p className="chip"  data-testid="_forksCount"><FaCodeFork />&nbsp;Forks
                                    <span>{repo.forks_count} </span>
                                </p>
                            </div>
                        </div>
                        <div className="description" data-testid="_description">{repo.description}</div>
                        <div className="repo-url">
                            <Link to={repo.html_url} target="_blank">Go To Repo&nbsp;<FaArrowUpRightFromSquare size="14" className="icon" /></Link>
                        </div>
                        <div>
                            <Tabs tabs={tabs} />
                        </div>
                    </div>
                </>
            )
            }

        </>
    )
}

export default RepoDetails;