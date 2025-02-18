import { useEffect, useState } from "react";
import './Issues.css';

function Issues({ url }) {
    const [issues, setIssues] = useState([]);
    const issueUrl = url?.split('{')[0];

    const getIssues = () => {
        fetch(issueUrl, {
            method: 'GET'
        }).then(res => res.json()).then(data => {
            setIssues(data)
    });
    }

    useEffect(() => {
        if (issues.length === 0 && issueUrl) {
            getIssues();
        }
    }, [issues, url]);
    return (
        <div>
            <ul className="issues-list">
                {issues.length > 0 && issues.map((issue) => (
                    <li key={issue.id} className="issue" data-testid="_issue">
                        <div className="issue-desc">
                            <span className="issue-title">{issue.title}</span>
                            <div className={`${issue.state === 'open' ? 'active' : ''} state`}>
                                <span>{issue.state === 'open' ? 'Open' : 'Closed'}</span>
                            </div>
                        </div>
                        <div className="issue-details" data-testid="_detail">
                           {issue.created_at && <span >Created on {new Date(issue.created_at).toLocaleDateString()}</span>} 
                            <div className="author">
                                <span>Created By </span>
                                <div className="issue-author" data-testid="_author">
                                    <span>{issue.user.login}&nbsp;</span>
                                    <img src={issue.user.avatar_url} alt="" height="15px" width="15px" className="image"></img>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Issues;