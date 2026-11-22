import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectToolbar from "../components/projects/ProjectToolbar";
import { useCategories, useProjectList } from "../hooks/useProjects";
import { listProjects } from "../services/projects";

const PAGE_SIZE = 6;

function ProjectsSkeleton() {
  return (
    <div className="project-card-grid" aria-label="Loading projects" aria-busy="true">
      {Array.from({ length: 6 }, (_, index) => (
        <div
          className="project-card project-card--skeleton"
          style={{ "--card-delay": `${Math.min(index * 60, 300)}ms` }}
          key={index}
          aria-hidden="true"
        >
          <div className="project-card__skeleton-image" />
          <div className="project-card__skeleton-body">
            <div className="project-card__skeleton-line project-card__skeleton-line--title" />
            <div className="project-card__skeleton-line" />
            <div className="project-card__skeleton-line project-card__skeleton-line--short" />
          </div>
        </div>
      ))}
    </div>
  );
}

function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get("category") || "All";
  const urlSearch = searchParams.get("q") || "";

  const [searchInput, setSearchInput] = useState(urlSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(urlSearch);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState(null);
  const [extraPages, setExtraPages] = useState({ key: "", items: [], page: 1, hasMore: false });

  const categoryState = useCategories();
  const categoryOptions = categoryState.data || [];

  const filterKey = useMemo(
    () => JSON.stringify({ category: urlCategory, search: debouncedSearch }),
    [urlCategory, debouncedSearch]
  );

  const listOptions = useMemo(
    () => ({
      category: urlCategory === "All" ? undefined : urlCategory,
      search: debouncedSearch,
      page: 1,
      pageSize: PAGE_SIZE,
    }),
    [urlCategory, debouncedSearch]
  );
  const listState = useProjectList(listOptions);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Projects | Tedex Design Consults";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(searchInput);
      setSearchParams((current) => {
        const next = new URLSearchParams(current);
        if (searchInput.trim()) next.set("q", searchInput.trim());
        else next.delete("q");
        return next;
      });
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchInput, setSearchParams]);

  useEffect(() => {
    queueMicrotask(() => {
      setSearchInput(urlSearch);
      setDebouncedSearch(urlSearch);
    });
  }, [urlSearch]);

  const updateCategory = (category) => {
    setLoadMoreError(null);
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      if (category === "All") next.delete("category");
      else next.set("category", category);
      return next;
    });
  };

  const clearFilters = () => {
    setSearchInput("");
    setDebouncedSearch("");
    setLoadMoreError(null);
    setSearchParams({});
  };

  const clearSearch = () => {
    setSearchInput("");
  };

  const validExtraPages = extraPages.key === filterKey ? extraPages : { key: filterKey, items: [], page: 1, hasMore: false };

  const loadMore = async () => {
    if (!listState.data || loadingMore) return;
    const canLoad = validExtraPages.key === filterKey
      ? validExtraPages.hasMore
      : Boolean(listState.data.hasMore);
    if (!canLoad) return;

    const nextPage = validExtraPages.key === filterKey
      ? validExtraPages.page + 1
      : 2;

    setLoadingMore(true);
    setLoadMoreError(null);

    try {
      const response = await listProjects({
        category: urlCategory === "All" ? undefined : urlCategory,
        search: debouncedSearch,
        page: nextPage,
        pageSize: PAGE_SIZE,
      });
      setExtraPages({
        key: filterKey,
        items: [...validExtraPages.items, ...response.items],
        page: nextPage,
        hasMore: response.hasMore,
      });
    } catch (reason) {
      setLoadMoreError(reason);
    } finally {
      setLoadingMore(false);
    }
  };

  const baseItems = listState.data?.items || [];
  const loadedItems = [...baseItems, ...validExtraPages.items];
  const totalCount = listState.data?.total ?? 0;
  const hasMore = validExtraPages.key === filterKey
    ? validExtraPages.hasMore
    : Boolean(listState.data?.hasMore);

  return (
    <div className="projects-page">
      <PageHeader
        title="Our Projects"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Projects" }]}
      />

      <section className="projects-page__section">
        <div className="projects-page__container">
          <ProjectToolbar
            categories={categoryOptions}
            selectedCategory={urlCategory}
            search={searchInput}
            onCategoryChange={updateCategory}
            onSearchChange={setSearchInput}
            onClearSearch={clearSearch}
          />

          {listState.loading ? (
            <ProjectsSkeleton />
          ) : listState.error ? (
            <div className="projects-page__state projects-page__state--error" role="alert">
              <i className="fas fa-circle-exclamation projects-page__state-icon" aria-hidden="true" />
              <h2>We couldn&apos;t load the projects</h2>
              <p>Please try again.</p>
              <button type="button" className="projects-page__action" onClick={listState.reload}>Try again</button>
            </div>
          ) : loadedItems.length === 0 ? (
            <div className="projects-page__state">
              <i className="fas fa-search projects-page__state-icon" aria-hidden="true" />
              <h2>No projects match your search</h2>
              <p>Try another category or clear the filters.</p>
              <button type="button" className="projects-page__action" onClick={clearFilters}>Clear filters</button>
            </div>
          ) : (
            <>
              <div className="project-card-grid">
                {loadedItems.map((project, index) => (
                  <ProjectCard project={project} index={index} key={project.id} />
                ))}
              </div>

              <p className="projects-page__count" aria-live="polite">
                Showing {loadedItems.length} of {totalCount} projects
              </p>

              {loadMoreError && (
                <p className="projects-page__load-error" role="alert">Couldn&apos;t load more projects.</p>
              )}

              {hasMore && (
                <div className="projects-page__load-more-wrap">
                  <button type="button" className="projects-page__load-more" onClick={loadMore} disabled={loadingMore}>
                    {loadingMore ? (
                      <><span className="projects-page__spinner" aria-hidden="true" />Loading</>
                    ) : "Load more projects"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Projects;
