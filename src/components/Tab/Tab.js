import './Tab.css';

function Tab({tab}) {
    return (
        <div className="tab-content">
            {tab.child}
        </div>
    )
}

export default Tab;