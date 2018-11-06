const Results = (props) => (
    <div className={props.columnWidth ? props.columnWidth : "col-md-3"}>
        <figure className="figure">
            {
                props.imageURL ?
                <img 
                    src={props.imageURL} 
                    className="figure-img img-thumbnail rounded" 
                    alt={props.name} 
                /> 
                : ''
            }
            <figcaption className="figure-caption">{props.name}</figcaption>
            <figcaption className="figure-caption">{props.children}</figcaption>
        </figure>
    </div>
)

export default Results