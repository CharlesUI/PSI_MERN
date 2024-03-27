import { FormEvent, useEffect, useState } from "react";
import "./drugsTable.css";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { API_URL } from "../hooks/config";
import { useAuthContext } from "../hooks/useAuthContext";

interface Drugs {
  _id: string;
  NAME: string;
  DESCRIPTION: string;
  RETAIL_PRICE: number;
  ISSUANCE_DATE: string;
  EXPIRY_DATE: string;
  LIFE_SPAN: {
    years: number;
    months: number;
    days: number;
  },
  STOCK_COUNT: number,
  AVAILABILITY: Boolean
}

const DrugsTable = () => {
  //Check the state of the ADMIN
  const { state } = useAuthContext();
  console.log("Initial State in the Drugs Table Component", state);

  //Initialize the variables
  const [drugs, setDrugs] = useState<Drugs[]>([]);

  //INITIALIZING TABLE COLUMNS | ROWS
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 7, //default page size
  });

  const columnHelper = createColumnHelper<Drugs>();

  const columns = [
    columnHelper.accessor("NAME", {
      header: () => "NAME",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("DESCRIPTION", {
      header: () => "DESCRIPTION",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("RETAIL_PRICE", {
      header: () => "PRICE",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("ISSUANCE_DATE", {
      header: () => "ISSUANCE",
      cell: (info) => {
        const date = info.getValue()
        const newDate = new Date(date)

        const formattedDateString = newDate.toDateString()

        return formattedDateString
      },
    }),
    columnHelper.accessor("EXPIRY_DATE", {
      header: () => "EXPIRY",
      cell: (info) => {
        const date = info.getValue()
        const newDate = new Date(date)

        const formattedDateString = newDate.toDateString()

        return formattedDateString
      },
    }),
    columnHelper.accessor("LIFE_SPAN", {
      header: () => "LIFE SPAN",
      cell: (info) => {
        const { years, months, days } = info.getValue(); // Access nested object
        return `${years} years, ${months} months, ${days} days`;
      },
    }),
    columnHelper.accessor("STOCK_COUNT", {
      header: () => "STOCK",
      cell: (info) => info.getValue()
    }),
    columnHelper.accessor("AVAILABILITY", {
      header: () => "AVAILABILITY",
      cell: (info) => {
        const data = info.getValue()
        const dataAvailability = data ? "Active" : "Inactive"

        return dataAvailability
      }
    })
  ];

  const table = useReactTable({
    data: drugs,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  });

  // FETCHING OF DATA FROM THE API
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchDrugsData = async (token: string) => {
    setError(null);
    setIsLoading(true);

    const response = await fetch(`${API_URL}/drugs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const json = await response.json();

    console.log("before checking response", json)
    if (!response.ok) {
      console.log('there is an error', json.message)
      setError(json.message);
      setIsLoading(false);
    }

    if (response.ok) {
      setDrugs(json);
      console.log("fetched drugs", json);
      console.log("token:", `Bearer ${state.user?.token}`);
      setIsLoading(false)
    }
  };


  useEffect(() => {
    console.log("component mounted!");
    //CHECK FIRST IF THE TOKEN IS PRESENT | IF PRESENT PASS THE TOKEN AS THE PARAMETER FOR THE FUNCTION
    if(state.user?.token) {
      fetchDrugsData(state.user.token);
    } else {
      setError('Use Not Authorized!')
    }
  }, [state.user?.token]);

  //SUBMIT SEARCH
  const submitSearchForm = (e: FormEvent) => {
    e.preventDefault();
  };


  if(isLoading) {
    return <div>Loading....</div>
  }

  return (
    <>
      <div className="search-bar">
        <form onSubmit={submitSearchForm}>
          <input
            type="text"
            placeholder="Search..."
            // value={inputSearchValue}
            // onChange={(e) => setInputSearchValue(e.target.value)}
          />
        </form>
      </div>

      <table className="drugs-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th key={header.id} className="drugs-table-cell">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className="drugs-table-cell">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        onClick={() => table.firstPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {"<<"}
      </button>
      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {"<"}
      </button>
      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        {">"}
      </button>
      <button
        onClick={() => table.lastPage()}
        disabled={!table.getCanNextPage()}
      >
        {">>"}
      </button>
      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize}
          </option>
        ))}
      </select>
    </>
  );
};

export default DrugsTable;
