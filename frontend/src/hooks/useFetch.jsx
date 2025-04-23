import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import api from "../api";

const useFetch = () => {
  const [state, setState] = useState({
    loading: false,
    data: null,
    successMsg: "",
    errorMsg: "",
  });

  const fetchData = useCallback(
    async (
      config,
      {
        showSuccessToast = true,
        showErrorToast = true,
        onSuccess,
        onError,
      } = {}
    ) => {
      setState((prev) => ({ ...prev, loading: true }));

      try {
        const response = await api.request(config);
        const data = response.data;

        setState({
          loading: false,
          data,
          successMsg: data.msg || "Success",
          errorMsg: "",
        });

        if (showSuccessToast && data.msg) toast.success(data.msg);
        if (onSuccess) onSuccess(data);

        return data;
      } catch (error) {
        const msg =
          error.response?.data?.msg || error.message || "Something went wrong";

        setState({
          loading: false,
          data: null,
          errorMsg: msg,
          successMsg: "",
        });

        if (showErrorToast) toast.error(msg);
        if (onError) onError(msg);

        return Promise.reject(msg);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState({
      loading: false,
      data: null,
      successMsg: "",
      errorMsg: "",
    });
  }, []);

  return [fetchData, state, reset];
};

export default useFetch;
