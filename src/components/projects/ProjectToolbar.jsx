function ProjectToolbar({ categories, selectedCategory, search, onCategoryChange, onSearchChange, onClearSearch }) {
  const categoryOptions = ["All", ...categories];

  return (
    <div className="projects-page__toolbar">
      <div className="projects-page__chips" role="group" aria-label="Filter projects by category">
        {categoryOptions.map((category) => (
          <button
            type="button"
            key={category}
            className={`projects-page__chip${selectedCategory === category ? " active" : ""}`}
            aria-pressed={selectedCategory === category}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="projects-page__search-wrap">
        <i className="fas fa-search projects-page__search-icon" aria-hidden="true" />
        <input
          className="projects-page__search"
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search projects"
          aria-label="Search projects"
        />
        {search && (
          <button
            type="button"
            className="projects-page__clear-search"
            onClick={onClearSearch}
            aria-label="Clear project search"
          >
            <i className="fas fa-times" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

export default ProjectToolbar;
