import { Link } from 'react-router';
import './ListItem.css';

function ListItem({ item }) {
    const creationDate = item.created_at ? new Date(item.created_at).toLocaleDateString() : null;
    const lastUpdateDate = item.updated_at ? new Date(item.updated_at).toLocaleDateString() : null;

    return <>
        <div className="list-item">
            <Link to={`/repo-detail/${item.id}`} className="link">{item.full_name}</Link>
            <div className='repo-dates'>
                {creationDate && <span data-testid="_creationDate">Created on {creationDate}</span>}
                {lastUpdateDate &&  <span data-testid="_updateDate">Last Updated on {lastUpdateDate}</span>}
               
            </div>
        </div>
    </>
}

export default ListItem