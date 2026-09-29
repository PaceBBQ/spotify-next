const Results = ({ columnWidth = "col-md-3", imageURL, name, children }) => (
  <div className={columnWidth}>
    <figure className="figure">
      {imageURL && (
        <img
          src={imageURL}
          className="figure-img img-thumbnail rounded"
          alt={name}
        />
      )}
      <figcaption className="figure-caption">{name}</figcaption>
      {children && (
        <figcaption className="figure-caption">{children}</figcaption>
      )}
    </figure>
  </div>
);

export default Results;