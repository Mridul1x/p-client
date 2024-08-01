import clsx from "clsx";

const DashboardTab = ({
  activeTab,
  setActiveTab,
  tabName,
  children,
  placeholder,
}) => {
  return (
    <button
      onClick={() => setActiveTab(tabName)}
      className={clsx(
        "flex items-center gap-3 p-5 w-full h-full rounded-lg shadow-2xl hover:bg-[#8fc442] duration-300 hover:text-black",
        activeTab === tabName ? "bg-[#8fc442] text-black" : "bg-base-100"
      )}
    >
      <span>{children}</span> {placeholder}
    </button>
  );
};

export default DashboardTab;
