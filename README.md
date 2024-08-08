# Custom Table Component

## Overview

The **Custom Table Component** is a versatile and high-performance solution for managing tabular data in React applications. Inspired by React Table and MUI Data Grid, it offers a wide range of features for customizing, sorting, filtering, and displaying data efficiently.

## Features

- **Customizable Columns:** Define and adjust columns with custom renderers, accessors, and editable elements.
- **Sorting & Filtering:** Easily sort and filter data with support for custom filtering logic.
- **Pagination:** Built-in pagination with options for both client-side and server-side implementations.
- **Responsive Design:** Ensures consistent appearance and functionality across different device sizes.
- **Performance Optimization:** Efficiently handles large datasets using lazy loading and virtualization techniques.

## Key Features:
- **Show/Hide Columns:** Use showCol: true/false to explicitly show or hide columns.
- **Add Calculated Data:** Use compare: true for calculated data columns to enable sorting and filtering.
- **Editable Rows:** Use editable: true for  editing the cell directly from the table.

## Use Case Example

Here's an example of how to define columns and use the `CustomTable` component in a React application:

```javascript
const ViewSalesAccountColumns = [
  {
    key: "Serial_no",
    name: "S.NO",
    renderRowCell: (row, index) => index + 1,
    width: 20,
    showCol: true,
    sortable: true,
  },
  {
    key: "account_name",
    name: "Account Name",
    renderRowCell: (row) => (
      <Link style={{ color: "blue" }} to={`/sales-account-info/${row?._id}`}>
        {formatString(row?.account_name)}
      </Link>
    ),
    width: 100,
    sortable: true,
  },
  {
    key: "created_by_name",
    name: "Sales Executive Name",
    width: 100,
    sortable: true,
  },
  {
    key: "totalSaleBookingCounts",
    name: "Total No. Of Sale booking",
    width: 100,
    sortable: true,
  },
  {
    key: "campaignAmount",
    name: "Campaign Amount Total",
    width: 100,
    sortable: true,
  },
  {
    key: "totalOutstanding",
    name: "Total Outstanding Amount",
    renderRowCell: (row) => row?.totalOutstanding,
    width: 100,
    sortable: true,
  },
  {
    key: "Average",
    name: "Average Sale Amount",
    renderRowCell: (row) => {
      if (row?.campaignAmount && row?.totalSaleBookingCounts) {
        const result = row.campaignAmount / row.totalSaleBookingCounts;
        return Number.isInteger(result) ? result.toString() : result.toFixed(2);
      }
      return 0;
    },
    width: 100,
    compare: true,
    sortable: true,
  },
  {
    key: "lastSaleBookingDate",
    name: "Last Purchase Date",
    renderRowCell: (row) =>
      row?.lastSaleBookingDate ? DateISOtoNormal(row?.lastSaleBookingDate) : "N/A",
    width: 100,
    sortable: true,
  },
  {
    key: "aging",
    name: "Aging",
    renderRowCell: (row) => {
      let lastBookingDate;
      if (row?.lastSaleBookingDate === null) {
        lastBookingDate = new Date();
      } else {
        lastBookingDate = new Date(row?.lastSaleBookingDate);
      }
      const currentDate = new Date();

      const timeDiff = Math.abs(
        lastBookingDate.getTime() - currentDate.getTime()
      );
      const idealDays = Math.floor(timeDiff / (1000 * 3600 * 24));
      // if (row?.totalSaleBookingCounts === 0) return JSON.stringify(lastBookingDate);
      return idealDays;
    },
    compare: true,
    width: 100,
    sortable: true,
  },
  {
    key: "description",
    name: "Description",
    width: 200,
    sortable: true,
    showCol: true,
    editable: true,
    customEditElement: (row, index, setEditFlag, handelchange) => (
      <input
        type="text"
        onChange={(e) => handelchange(e)}
        placeholder={row.description}
      />
    ),
  },
  {
    key: "turn_over",
    name: "Turn Over",
    renderRowCell: (row) => row?.turn_over || "N/A",
    width: 100,
    sortable: true,
    showCol: true,
  },
  {
    key: "website",
    name: "Website",
    renderRowCell: (row) => {
      if (row.website) {
        return (
          <a
            style={{ hover: "pointer", color: "blue" }}
            href={
              row?.website?.startsWith("http")
                ? row.website
                : `http://${row.website}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            {row.website}
          </a>
        );
      } else {
        return "N/A";
      }
    },
    width: 100,
    sortable: true,
    showCol: true,
  },
  {
    key: "createdAt",
    name: "Created Date",
    renderRowCell: (row) => DateISOtoNormal(row.createdAt),
    width: 100,
    sortable: true,
    showCol: true,
  },
  {
    key: "updatedAt",
    name: "Updated Date",
    renderRowCell: (row) => DateISOtoNormal(row.updatedAt),
    width: 100,
    sortable: true,
    showCol: true,
  },
  {
    key: "account_type_name",
    name: "Account Type",
    width: 100,
    sortable: true,
    showCol: true,
  },
  {
    key: "company_type_name",
    name: "Company Type",
    width: 100,
    sortable: true,
    showCol: true,
  },
  {
    key: "brand_category_name",
    name: "Brand Category Name",
    renderRowCell: (row) => {
      const brandType = allBrandCatType?.find(
        (brandCatType) => brandCatType._id === row.category_id
      );
      return brandType ? brandType.brand_category_name : "NA";
    },
    width: 100,
    compare: true,
    showCol: true,
  },
  {
    key: "Action_edits",
    name: "Actions",
    renderRowCell: (row) => (
      <div className="flex-row">
        <Link to={`/admin/create-sales-account/${row?._id}`}>
          <button className="icon-1" title="Edit">
            <i className="bi bi-pencil"></i>
          </button>
        </Link>
        <button
          className="icon-1"
          title="Create Sales Booking"
          onClick={() =>
            navigate("/admin/create-sales-booking", {
              state: {
                account_data: row,
              },
            })
          }
        >
          <i className="bi bi-arrow-up-right"></i>
        </button>
      </div>
    ),
    width: 100,
    sortable: true,
    showCol: true,
  },
];

<CustomTable
  columns={ViewSalesAccountColumns}
  data={filteredData}
  fixedHeader // this props  fix the header
  dataLoading={isLoading}  // enables to  delay data loading into components if promose is pending
  rowSelectable={true} // can select the  desired ro to export in to excel
  pagination // pagination by default and and pass tha array of numbers to give the option to break down the data.
  tableName={"SalesAccountOverview"} // give the unique table name  its cumpoulsary  because it preserves the data like column position when drag and dropped and filters
/>
```

##Getting Started
To use this component in your project, follow these steps:

##Clone the Repository:
```javascript
git clone https://github.com/Pratyushg1312/Custom-React-Table.git
cd custom-table-component
Install Dependencies:
```
```javascript
npm install
Run the Example:
```

```javascript
npm start
```
##Contributing

##We welcome contributions to enhance this component! Feel free to open issues or submit pull requests with your improvements.

##License
This project is licensed under the MIT License.
