import { toast } from "react-hot-toast";

const getString = (value) => typeof value === "string" && value.trim()
    ? value.trim()
    : null;

export const getApiErrorMessage = (error, fallback = "Something went wrong") => {
    const responseData = error?.response?.data;

    return getString(responseData?.message)
        || getString(responseData?.error)
        || getString(responseData?.details)
        || getString(responseData)
        || fallback;
};

export const notifySuccess = (message, id) => toast.success(message, { id });

export const notifyError = (error, fallback, id) => toast.error(
    getApiErrorMessage(error, fallback),
    { id }
);

export const notifyLoading = (message, id) => toast.loading(message, { id });
