import { MoonLoader } from "react-spinners";

const Loading = ({ isLoading }) => {
  return (
    <div className="flex justify-center min-h-screen">
      <MoonLoader
        color="#8e0908"
        loading={isLoading}
        size={36}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
