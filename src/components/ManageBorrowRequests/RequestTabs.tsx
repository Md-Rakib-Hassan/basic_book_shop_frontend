export default function RequestTabs({
  activeTab,
  setActiveTab,
  requests,
}: any) {
  const tabs = ["all", "pending", "accepted", "rejected","completed"];

  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab
                ? "border-primary-500 text-primary-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
              {
                requests.filter(
                  (r: any) => tab === "all" || r.status.toLowerCase() === tab
                ).length
              }
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
