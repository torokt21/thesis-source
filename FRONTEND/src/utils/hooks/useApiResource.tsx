import { useEffect, useState } from "react";

import { useAxiosClient } from "./useAxiosClient";

export type useApiResourceProps<T, D = T> = {
	/** The url slug of the API endpoint */
	url: string;

	/** The function that  */
	dtoMapper: (response: D) => T;
};

/** Fetches a resource from the server */
function useApiResource<T, D = T>(props: useApiResourceProps<T, D>) {
	const [data, setData] = useState<T>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	function fetchData() {
		setLoading(true);
		setError(false);
		useAxiosClient()
			.get(process.env.REACT_APP_API_URL + props.url)
			.then((result) => {
				setData(props.dtoMapper(result.data as D));
			})
			.catch(() => {
				setError(true);
			})
			.finally(() => setLoading(false));
	}

	useEffect(() => {
		fetchData();
	}, []);

	return {
		data: [data, loading, error] as const,
		refetch: fetchData,
	};
}

export default useApiResource;
