import { useMemo, useState } from "react";
import Tab from "../Tab/Tab";
import './Tabs.css';

function Tabs({ tabs }) {
    const [activeTabId, setActiveTabId] = useState(tabs[0].id);

    const activeTab = useMemo(() => {
        return tabs.find(tab => tab.id === activeTabId)
    }, [activeTabId, tabs]);

    return (
        <>
            <div className="tabs">
                <ul className="tabs-nav">
                    {
                        tabs.map(item => (
                            <li key={item.id} className="tabs-item" data-testid="tabs-item">
                                <button className={`tabs-button ${(activeTabId === item.id) ? 'active' : ''}`} onClick={() => setActiveTabId(item.id)}>
                                    {item.name}&nbsp;
                                    <span className="count">{item.count}</span>
                                </button>
                            </li>
                        ))
                    }
                </ul>
                <Tab tab={activeTab} />
            </div>
        </>
    )
}

export default Tabs;