import { useEffect, useState } from "react";

export default function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(fetcher));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!fetcher) return;

    const controller = new AbortController();

    async function run() {
      try {
        setLoading(true);
        setError(null);

        const result = await fetcher(controller.signal);
        setData(result);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    run();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error, setData };
}
