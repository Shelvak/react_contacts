import React from "react";
import ReactPaginate from 'react-paginate';

class BootstrapPagination extends React.Component {

  render() {
    return (
      <ReactPaginate
        activeClassName="active page-item"
        activeLinkClassName="page-link"
        breakClassName="page-item"
        breakLabel={'...'}
        breakLinkClassName="page-link"
        containerClassName="pagination"
        disabledClassName="disabled"
        hrefBuilder={() => '#'}
        initialPage={this.props.current - 1}
        marginPagesDisplayed={2}
        nextClassName="page-item"
        nextLabel={'>>'}
        nextLinkClassName="page-link"
        onPageChange={this.props.handlePageClick}
        pageClassName="page-item"
        pageCount={this.props.pages}
        pageLinkClassName="page-link"
        pageRangeDisplayed={2}
        previousClassName="page-item"
        previousLabel={'<<'}
        previousLinkClassName="page-link"
      />
    )
  }
}

export default BootstrapPagination;
