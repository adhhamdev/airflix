const Paginator = ({ prevFunc, page, nextFunc }) => {
  return (
    <div className="paginator">
      <button className="prevBtn" onClick={prevFunc}>
        <i className="fas fa-chevron-left"></i> PREV
      </button>
      <p className="pageNumber" title="PAGE NUMBER">
        {page}
      </p>
      <button className="nextBtn" onClick={nextFunc}>
        NEXT <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default Paginator;
