import { CircularProgress } from "@mui/material";

const Loading = (): JSX.Element => {
  return (
    <div className="w-full flex justify-center items-center h-44">
      <CircularProgress
        size={40}
        sx={{
          color: "black",
        }}
      />
    </div>
  );
};

export default Loading;
