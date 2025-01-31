import React, { useState } from "react";

const TabContainer = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

  return (
    <div>
      {/* Tab Navigation with Scrollable Container */}
      <div
        style={{
          maxWidth: "100%",
          overflowX: "auto",
          whiteSpace: "nowrap",
          display: "flex",
        }}
      >
        <ul
          className="nav nav-tabs"
          role="tablist"
          style={{ display: "inline-flex", flexShrink: 0 }}
        >
          {tabs.map((tab) => (
            <li className="nav-item" key={tab.id} style={{ flexShrink: 0 }}>
              <button
                className={`nav-link ${activeTab === tab.id ? "bg-success text-white" : ""}`}
                onClick={() => setActiveTab(tab.id)}
                role="tab"
              >
                {tab.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      <div className="tab-content mt-3">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-pane fade ${
              activeTab === tab.id ? "show active" : ""
            }`}
            role="tabpanel"
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabContainer;
