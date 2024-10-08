import React, { useEffect, useRef, useState } from "react";
import "./Table.css";
import PaginationComp from "./TableComponent/PaginationComp";
import TableToolkit from "./TableComponent/TableToolkit";
import RenderedTable from "./TableComponent/RenderedTable";
import axios from "axios";




const CustomTable = ({
  columns,
  data = [],
  fixedHeader = true,
  Pagination = false,
  dataLoading = false,
  rowSelectable,
  tableName,
  baseUrl,
  loginUserId,
  postEndPoints,
  putEndPoints,
  getEndPoints,
}) => {
  const tableref = useRef();
  const [apiColumns, setApiColumns] = useState([]);
  const [columnsheader, setColumns] = useState(columns);
  const [resizing, setResizing] = useState(null);
  const [widths, setWidths] = useState(columns);
  const [itemsPerPage, setItemsPerPage] = useState(
    Pagination && Pagination.length > 0 ? Pagination[0] : 10
  );
  const [originalData, setOriginalData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [ascFlag, setAscFlag] = useState(columns?.map(() => true));
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map((column) =>
      column.showCol === undefined ? true : column.showCol
    )
  );
  const [selectedRowsIndex, setSelectedRowsIndex] = useState([]);
  const [selectedRowsData, setSelectedRowsData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [editablesRows, setEditablesRows] = useState(
    columns.map((column) =>
      column.editable === undefined ? false : column.editable
    )
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const [unSortedData, setUnSortedData] = useState([]);
  const [invadeFlag, setInvadeFlag] = useState(false);
  const [colSearch, setColSearch] = useState(columns.map(() => []));
  const [apiFilters, setApiFilters] = useState([]);
  const [filterCondition, setFilterCondition] = useState(
    columns.map((col) => ({
      colName: col.key,
      key: "none",
      value1: "",
      value2: "",
    }))
  );
  // Initialize selectedId for each column
  const [selectedId, setSelectedId] = useState(columnsheader.map(() => []));
  const [applyFlag, setApplyFlag] = useState(false);


  let pagination = Pagination?.length > 0 ? Pagination : [100, 50, 10];

  const filteredData = searchQuery
    ? unSortedData?.filter((item) =>
      columnsheader
        .map((column) => column.key)
        .some((key) =>
          item[key]
            ?.toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
    )
    : unSortedData;

  // const tabledata = pagination
  //   ? filteredData?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  //   : unSortedData;

  const filterFunctions = {
    none: () => true,

    isExactly: (itemValue, value1) => {
      if (typeof itemValue === "string") {
        return itemValue?.toLowerCase().trim() === value1?.toLowerCase().trim();
      } else {
        return itemValue?.toString().trim() === value1?.trim();
      }
    },

    isEmpty: (itemValue) => {
      return itemValue?.toString() == "";
    },

    isNotEmpty: (itemValue) => itemValue?.toString() != "",

    contains: (itemValue, value1) => {
      if (typeof itemValue === "string") {
        return itemValue?.toLowerCase().includes(value1?.toLowerCase());
      } else {
        return itemValue
          ?.toString()
          .toLowerCase()
          .includes(value1?.toLowerCase());
      }
    },

    doesNotContain: (itemValue, value1) => {
      if (typeof itemValue === "string") {
        return !itemValue?.toLowerCase().includes(value1?.toLowerCase());
      } else {
        return !itemValue
          ?.toString()
          .toLowerCase()
          .includes(value1?.toLowerCase());
      }
    },

    startsWith: (itemValue, value1) => {
      if (typeof itemValue === "string") {
        return itemValue?.startsWith(value1);
      } else {
        return itemValue?.toString().startsWith(value1);
      }
    },

    endsWith: (itemValue, value1) => {
      if (typeof itemValue === "string") {
        return itemValue?.endsWith(value1);
      } else {
        return itemValue?.toString().endsWith(value1);
      }
    },

    greaterThan: (itemValue, value1) => itemValue > parseInt(value1, 10),

    greaterThanOrEqualTo: (itemValue, value1) =>
      itemValue >= parseInt(value1, 10),

    lessThan: (itemValue, value1) => itemValue < value1,

    lessThanOrEqualTo: (itemValue, value1) => itemValue <= parseInt(value1, 10),

    equalTo: (itemValue, value1) => {
      if (typeof itemValue === "string") {
        return itemValue === value1;
      } else {
        return itemValue == parseInt(value1, 10);
      }
    },

    notEqualTo: (itemValue, value1) => {
      if (typeof itemValue === "string") {
        return itemValue === value1;
      } else {
        return itemValue == parseInt(value1, 10);
      }
    },

    between: (itemValue, value1, value2) =>
      itemValue > parseInt(value1, 10) && itemValue < parseInt(value2, 10),

    notBetween: (itemValue, value1, value2) =>
      itemValue <= parseInt(value1, 10) || itemValue >= parseInt(value2, 10),
  };
  useEffect(() => {
    const filterData = () => {
      const fd = originalData.filter((item) => {
        // Check filterCondition
        const conditionCheck = filterCondition.every((condition) => {
          const { key, value1, value2, colName } = condition;
          if (key === "none") return true; // Skip if no filter is applied or field is not specified
          const filterFunc = filterFunctions[key];

          return filterFunc(item[colName], value1, value2);
        });

        // Check colSearch
        const searchCheck = colSearch.every((searchArray, index) => {
          if (searchArray.length === 0) return true; // No search criteria means no filtering needed

          return searchArray.some((criteria) => {
            const field = Object.keys(criteria)[0]; // Get the field name from the criteria object
            const value = criteria[field]; // Get the search value for that field
            return item[field] === value; // Check if the item field matches the search value
          });
        });

        return conditionCheck && searchCheck; // Item must pass both conditions
      });
      return fd;
    };

    setUnSortedData(filterData());
  }, [applyFlag]);

  const toggleColumnVisibility = (index) => {
    setVisibleColumns(
      visibleColumns?.map((visible, i) => (i === index ? !visible : visible))
    );
    setInvadeFlag(true);
  };

  useEffect(() => {
    if (invadeFlag) {
      cloudInvader();
    }
  }, [invadeFlag]);

  useEffect(() => {
    setSortedData(
      pagination
        ? filteredData?.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
        : unSortedData
    );
  }, [itemsPerPage, currentPage, searchQuery]);


  const createTable = async () => {

    const arrayOfColumnsName = columnsheader.map((column) => ({
      name: column.name,
      visibility: column.showCol === undefined ? true : column.showCol,
    }));
    let Response;
    try {
      if (!baseUrl) {
        localStorage.setItem(`data_${tableName + loginUserId}`, JSON.stringify({

          table_name: tableName,
          user_id: loginUserId,
          column_order_Obj: arrayOfColumnsName,
          filter_array: []
        }));
      }
      else
        Response = await axios.post(`${baseUrl + postEndPoints}`, {
          table_name: tableName,
          user_id: loginUserId,
          column_order_Obj: arrayOfColumnsName,

        });
    } catch (e) {
      console.error(e);
    }

  }
  useEffect(() => {
    const isTableCreated = localStorage.getItem(`isTableCreated_${tableName + loginUserId}`);
    if (!isTableCreated) {
      createTable()
      localStorage.setItem(`isTableCreated_${tableName + loginUserId}`, 'true');

    }
  }, []);
  // useEffect(() => {


  //   if (data.length > 0) {
  //     createTable();
  //   }
  // }, [data]);

  async function cloudInvader() {
    const arrayofvisiblecolumns = columnsheader?.map((column, index) => ({
      name: column.name,
      visibility: visibleColumns[index],
    }));
    try {
      if (!baseUrl) {
        const res = JSON.parse(localStorage.getItem(`data_${tableName + loginUserId}`));

        localStorage.setItem(`data_${tableName + loginUserId}`, JSON.stringify({
          ...res,
          user_id: loginUserId,
          table_name: tableName,
          column_order_Obj: arrayofvisiblecolumns,

        }));
      } else
        await axios.put(`${baseUrl + putEndPoints}`, {
          user_id: loginUserId,
          table_name: tableName,
          column_order_Obj: arrayofvisiblecolumns,

        });
    } catch (e) {
      console.error(e);
    } finally {
      setInvadeFlag(false);
    }
  }

  useEffect(() => {
    const fetchCreatedTable = async () => {
      let response;
      let responseData;
      let savedFiltersData;
      try {
        if (!baseUrl) {
          response = localStorage.getItem(`data_${tableName + loginUserId}`);
          responseData = JSON.parse(response).column_order_Obj;
          savedFiltersData = JSON.parse(response).filter_array;
        }
        else {
          response = await axios.get(
            `${baseUrl + getEndPoints}`
          );
          responseData = response.data.data[0]?.column_order_Obj || [];
          savedFiltersData = response.data.data[0]?.filter_array || [];
        }
        setApiColumns(responseData);
        setApiFilters(savedFiltersData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCreatedTable();
  }, [loginUserId, tableName]);

  useEffect(() => {
    const getIndex = (colName) =>
      apiColumns?.findIndex((item) => item?.name === colName);
    const sortedColumns = [...columns];
    sortedColumns.sort((a, b) => getIndex(a.name) - getIndex(b.name));

    setColumns(sortedColumns);

    setWidths(sortedColumns);
    setVisibleColumns(
      apiColumns?.length === 0
        ? columns?.map(() => true)
        : apiColumns?.map((column) => column.visibility)
    );
    setAscFlag(sortedColumns?.map(() => true));
    setEditablesRows(
      sortedColumns.map((column) =>
        column.editable === undefined ? false : column.editable
      )
    );
    setUnSortedData(data);
    setOriginalData(data);
    setOriginalData((prev) =>
      prev.map((item) => {
        const cols = columnsheader.filter((column) => column.compare === true);
        const additionalProps = cols.reduce((acc, column) => {
          acc[column.key] = column.renderRowCell(item);
          return acc;
        }, {});
        return {
          ...item,
          ...additionalProps,
        };
      })
    );
  }, [dataLoading, columns, apiColumns]);

  useEffect(() => {
    setSortedData(
      pagination
        ? filteredData?.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
        : unSortedData
    );
  }, [unSortedData]);

  function renderSort() {
    let unSortData;
    if (unSortedData.length < originalData.length) {
      unSortData = [...unSortedData];
    }
    else
      unSortData = [...originalData];
    let dataType;

    const colm = columnsheader?.find((column) => column.key === sortKey);

    // Determine the data type for sorting
    const determineDataType = (data, key, renderFunc) => {
      const keyData = data.map((item) =>
        renderFunc ? renderFunc(item) : item?.[key]
      );
      const firstNonNullType = keyData.find(
        (item) => item !== undefined && item !== null
      );
      return firstNonNullType !== undefined
        ? typeof firstNonNullType
        : undefined;
    };

    dataType = colm?.compare
      ? determineDataType(unSortData, sortKey, colm?.renderRowCell)
      : determineDataType(unSortData, sortKey);

    // Sorting logic
    unSortData.sort((a, b) => {
      let compareValue = 0;

      const getValue = (item) =>
        colm?.compare && colm?.renderRowCell
          ? colm.renderRowCell(item)
          : item[sortKey];

      const val1 = getValue(a);
      const val2 = getValue(b);

      if (dataType === "string") {
        compareValue = val1?.trim()?.localeCompare(val2?.trim());
      } else if (dataType === "number") {
        compareValue = val1 - val2;
      }

      return compareValue;
    });

    if (sortDirection !== "asc") {
      unSortData.reverse();
    }
    setSortedData(unSortData);
    setUnSortedData(unSortData);
  }

  useEffect(() => {
    renderSort();
  }, [sortKey, sortDirection]);

  return (
    <div className="table-pagination-container">
      <TableToolkit
        setApiFilters={setApiFilters}
        apiFilters={apiFilters}
        tableName={tableName}
        loginUserId={loginUserId}
        baseUrl={baseUrl}
        getEndPoints={getEndPoints}
        putEndPoints={putEndPoints}
        postEndPoints={postEndPoints}
        tableref={tableref}
        columnsheader={columnsheader}
        setVisibleColumns={setVisibleColumns}
        visibleColumns={visibleColumns}
        data={unSortedData}
        selectedRowsIndex={selectedRowsIndex}
        setSelectedRowsIndex={setSelectedRowsIndex}
        setSelectedRowsData={setSelectedRowsData}
        selectedRowsData={selectedRowsData}
        toggleColumnVisibility={toggleColumnVisibility}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        rowSelectable={rowSelectable}
        originalData={data}
        unSortedData={unSortedData}
        setUnSortedData={setUnSortedData}
        setColSearch={setColSearch}
        setInvadeFlag={setInvadeFlag}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        filterCondition={filterCondition}
        setFilterCondition={setFilterCondition}
        colSearch={colSearch}
        applyFlag={applyFlag}
        setApplyFlag={setApplyFlag}
      />

      <div className="table-container" ref={tableref}>
        <RenderedTable
          loginUserId={loginUserId}
          baseUrl={baseUrl}
          getEndPoints={getEndPoints}
          putEndPoints={putEndPoints}
          postEndPoints={postEndPoints}
          setUnSortedData={setUnSortedData}
          applyFlag={applyFlag}
          setApplyFlag={setApplyFlag}
          filterCondition={filterCondition}
          setFilterCondition={setFilterCondition}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          originalData={data}
          setColSearch={setColSearch}
          colSearch={colSearch}
          tableref={tableref}
          dataLoading={dataLoading}
          data={unSortedData}
          setSortKey={setSortKey}
          fixedHeader={fixedHeader}
          rowSelectable={rowSelectable}
          visibleColumns={visibleColumns}
          columnsheader={columnsheader}
          ascFlag={ascFlag}
          selectAll={selectAll}
          setColumns={setColumns}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          selectedRowsIndex={selectedRowsIndex}
          setSelectedRowsIndex={setSelectedRowsIndex}
          setSelectAll={setSelectAll}
          setAscFlag={setAscFlag}
          resizing={resizing}
          setResizing={setResizing}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          widths={widths}
          setWidths={setWidths}
          sortedData={sortedData}
          setSortedData={setSortedData}
          editableRows={editablesRows}
          tableName={tableName}
        />
      </div>

      {Pagination && (
        <PaginationComp
          data={unSortedData}
          Pagination={pagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      )}
    </div>
  );
};

export default CustomTable;
