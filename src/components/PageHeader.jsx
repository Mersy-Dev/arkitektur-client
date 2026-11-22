import { Link } from "react-router-dom";

/**
 * Reusable page banner faithful to the original Arkitektur page-header markup.
 * @param {{title: string, breadcrumbs: Array<{label: string, to?: string}>}} props
 */
function PageHeader({ title, breadcrumbs = [] }) {
  return (
    <header className="page-header-banner">
      <div className="page-header-banner__inner">
        <h1 className="page-header-banner__title">{title}</h1>
        <nav aria-label="Breadcrumb">
          <ol className="page-header-banner__breadcrumb">
            {breadcrumbs.map((crumb, index) => {
              const isCurrent = index === breadcrumbs.length - 1;
              return (
                <li
                  className={`page-header-banner__crumb${isCurrent ? " active" : ""}`}
                  key={`${crumb.label}-${index}`}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  {crumb.to && !isCurrent ? (
                    <Link to={crumb.to}>{crumb.label}</Link>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </header>
  );
}

export default PageHeader;
