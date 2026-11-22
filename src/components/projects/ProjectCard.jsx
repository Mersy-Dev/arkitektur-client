import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ProjectCard({ project, index }) {
  const staggerDelay = Math.min(index * 60, 300);
  const navigate = useNavigate();
  const cardRef = useRef(null);
  const mediaRef = useRef(null);
  const hoverTimerRef = useRef(null);
  const leaveTimerRef = useRef(null);
  const pointerStartRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [galleryMounted, setGalleryMounted] = useState(false);

  const imageList = [project.coverImage, ...(Array.isArray(project.gallery) ? project.gallery : [])]
    .filter((value, imageIndex, values) => typeof value === "string" && value && values.indexOf(value) === imageIndex)
    .slice(0, 5);
  const hasGallery = imageList.length > 1;

  const mountGallery = useCallback(() => {
    if (hasGallery) setGalleryMounted(true);
  }, [hasGallery]);

  useEffect(() => {
    const media = mediaRef.current;
    if (!hasGallery || !media || galleryMounted) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          mountGallery();
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(media);
    return () => observer.disconnect();
  }, [hasGallery, galleryMounted, mountGallery]);

  useEffect(() => () => {
    window.clearTimeout(hoverTimerRef.current);
    window.clearTimeout(leaveTimerRef.current);
  }, []);

  const activateImage = (nextIndex) => {
    window.clearTimeout(leaveTimerRef.current);
    setActiveIndex(nextIndex);
  };

  const scheduleHoverImage = (nextIndex) => {
    window.clearTimeout(leaveTimerRef.current);
    window.clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = window.setTimeout(() => activateImage(nextIndex), 60);
  };

  const handleCardLeave = () => {
    if (!hasGallery) return;
    window.clearTimeout(hoverTimerRef.current);
    window.clearTimeout(leaveTimerRef.current);
    leaveTimerRef.current = window.setTimeout(() => setActiveIndex(0), 400);
  };

  const handlePointerDown = (event) => {
    mountGallery();
    if (event.pointerType === "touch") {
      pointerStartRef.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
    }
  };

  const handlePointerUp = (event) => {
    const start = pointerStartRef.current;
    if (!start || event.pointerType !== "touch") return;
    pointerStartRef.current = null;

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) <= 40 || Math.abs(dx) <= Math.abs(dy)) return;

    setActiveIndex((current) =>
      dx < 0
        ? Math.min(current + 1, imageList.length - 1)
        : Math.max(current - 1, 0)
    );
  };

  const handleThumbnailKeyDown = (event, thumbIndex) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (thumbIndex + direction + imageList.length) % imageList.length;
    activateImage(nextIndex);
    cardRef.current?.querySelectorAll(".project-card__thumb")[nextIndex]?.focus();
  };

  const displayedThumbCount = imageList.length === 5 ? 3 : Math.min(imageList.length - 1, 4);
  const thumbnails = imageList.slice(1, displayedThumbCount + 1);

  return (
    <article
      ref={cardRef}
      className="project-card"
      style={{ "--card-delay": `${staggerDelay}ms` }}
      onMouseEnter={mountGallery}
      onMouseLeave={handleCardLeave}
      onFocusCapture={mountGallery}
      onTouchStart={mountGallery}
    >
      <div
        ref={mediaRef}
        className="project-card__image-wrap"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => { pointerStartRef.current = null; }}
      >
        {imageList.map((image, imageIndex) => (
          (imageIndex === 0 || galleryMounted) && (
            <img
              className={`project-card__image${activeIndex === imageIndex ? " active" : ""}`}
              src={image}
              alt={`${project.title}, view ${imageIndex + 1}`}
              loading={imageIndex === 0 ? "eager" : "lazy"}
              fetchPriority={imageIndex === 0 ? "high" : "auto"}
              key={image}
            />
          )
        ))}

        <span className="project-card__category">{project.category}</span>

        {hasGallery && (
          <span className="project-card__counter" aria-live="polite">
            <i className="fas fa-camera" aria-hidden="true" />
            {activeIndex + 1} / {imageList.length}
          </span>
        )}

        {hasGallery && galleryMounted && (
          <>
            <div className="project-card__thumb-strip" aria-label={`${project.title} image views`}>
              {thumbnails.map((image, thumbOffset) => {
                const imageIndex = thumbOffset + 1;
                return (
                  <button
                    type="button"
                    className="project-card__thumb"
                    data-active={activeIndex === imageIndex}
                    aria-label={`Show image ${imageIndex + 1} of ${imageList.length}`}
                    aria-current={activeIndex === imageIndex ? "true" : undefined}
                    onMouseEnter={() => scheduleHoverImage(imageIndex)}
                    onClick={(event) => {
                      event.stopPropagation();
                      activateImage(imageIndex);
                    }}
                    onKeyDown={(event) => handleThumbnailKeyDown(event, imageIndex)}
                    key={image}
                  >
                    <img src={image} alt="" loading="lazy" />
                  </button>
                );
              })}

              {imageList.length === 5 && (
                <button
                  type="button"
                  className="project-card__more"
                  aria-label={`Open ${project.title} project page`}
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate(`/projects/${project.slug}`);
                  }}
                >
                  +2
                </button>
              )}
            </div>

            <div className="project-card__dots" aria-label={`${project.title} image views`}>
              {imageList.map((image, dotIndex) => (
                <button
                  type="button"
                  className="project-card__dot"
                  data-active={activeIndex === dotIndex}
                  aria-label={`Show image ${dotIndex + 1} of ${imageList.length}`}
                  aria-current={activeIndex === dotIndex ? "true" : undefined}
                  onClick={(event) => {
                    event.stopPropagation();
                    activateImage(dotIndex);
                  }}
                  key={image}
                />
              ))}
            </div>
          </>
        )}

        <div className="project-card__overlay" aria-hidden="true" />
        <span className="project-card__arrow" aria-hidden="true">
          <i className="fas fa-arrow-right" />
        </span>
      </div>

      <div className="project-card__body">
        <h2 className="project-card__title">{project.title}</h2>
        <p className="project-card__location">
          <i className="fas fa-map-marker-alt" aria-hidden="true" />
          <span>{project.location}</span>
        </p>
        <div className="project-card__meta">
          <span>{project.year}</span>
          <span aria-hidden="true">•</span>
          <span>{project.size}</span>
        </div>
      </div>

      <Link
        className="project-card__stretched-link"
        to={`/projects/${project.slug}`}
        aria-label={`View project: ${project.title}`}
      />
    </article>
  );
}

export default ProjectCard;
