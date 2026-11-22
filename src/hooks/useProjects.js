import { useEffect, useState } from "react";
import {
  getProjectBySlug,
  getLatestProjects,
  listCategories,
  listProjects,
} from "../services/projects";

function useAsync(load, dependencies) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setData(null);
    setLoading(true);
    setError(null);

    Promise.resolve()
      .then(load)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((reason) => {
        if (!cancelled) setError(reason);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [...dependencies, reloadKey]);

  return {
    data,
    loading,
    error,
    reload: () => setReloadKey((value) => value + 1),
  };
}

export function useProjectList(options = {}) {
  const stableOptions = JSON.stringify(options);
  return useAsync(() => listProjects(JSON.parse(stableOptions)), [stableOptions]);
}

export function useProject(slug) {
  return useAsync(() => getProjectBySlug(slug), [slug]);
}

export function useLatestProjects(limit = 6) {
  return useAsync(() => getLatestProjects(limit), [limit]);
}

export function useCategories() {
  return useAsync(() => listCategories(), []);
}
