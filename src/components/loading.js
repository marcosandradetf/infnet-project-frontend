import CircularProgress from "@mui/material/CircularProgress";

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen flex-col loading">
            <CircularProgress/>
        </div>
    );
}