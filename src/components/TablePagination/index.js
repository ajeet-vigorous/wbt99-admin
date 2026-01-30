import React from "react";
import { Pagination } from 'antd';

const TablePagination = ({ currentPage, totalItems, pageSize, onPageChange }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
        <div className="gx-text-right gx-my-2 gx-mx-3 ">
          <Pagination
            current={currentPage}
            total={totalItems}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
            size="small"
          />
        </div>
  );
};

export default TablePagination;
