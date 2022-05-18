import Link from "next/link";
import moment from "moment";
import {
  IsEmptyArray,
  TableLoader,
  IsUndefined,
  FormatCurrency,
} from "../../../";

interface TableProps {
  data: any[];
  columns: TableColumnProps[];
  className?: string;
  loading?: boolean;
}

export interface TableColumnProps {
  name: string;
  key: string;
  type?: "number" | "currency" | "date";
  url?: string | ((item: any) => string);
  renderValue?: (item: any) => any;
}

export const Table = ({
  data,
  columns,
  className = "",
  loading,
}: TableProps) => {
  let tableClasses = ["table", className];

  const getDisplayData = (
    item: any,
    column: TableColumnProps,
    index: number
  ) => {
    if (column.type === "number") {
      return (
        <td key={index} className="text-right">
          {withUrl(
            (!IsUndefined(item[column.key]) && item[column.key]) || "-",
            item,
            column.url
          )}
        </td>
      );
    }
    if (column.type === "currency") {
      return (
        <td key={index} className="text-right">
          {withUrl(
            (!IsUndefined(item[column.key]) &&
              FormatCurrency({ amount: item[column.key] })) ||
              "-",
            item,
            column.url
          )}
        </td>
      );
    }

    if (column.type === "date") {
      return (
        <td key={index}>
          {withUrl(
            (!IsUndefined(item[column.key]) &&
              moment(item[column.key]).format("MMMM Do YYYY")) ||
              "-",
            item,
            column.url
          )}
        </td>
      );
    }
    return (
      <td key={index}>
        {withUrl(
          (column.renderValue && column.renderValue(item)) ||
            item[column.key] ||
            "-",
          item,
          column.url
        )}
      </td>
    );
  };

  const withUrl = (
    children: any,
    item: any,
    url?: string | ((item: any) => string)
  ) => {
    if (!url) return children;
    let path: string = "";

    if (typeof url === "function") {
      path = url(item);
    } else {
      path = url;
    }

    return (
      <Link href={path}>
        <a className="link link-hover link-primary">{children}</a>
      </Link>
    );
  };

  return (
    <table className={tableClasses.join(" ")}>
      <thead>
        <tr>
          <td className="w-10">#</td>
          {!IsEmptyArray(columns) &&
            columns.map((column) => (
              <td
                key={column.key}
                className={`${
                  column.type && ["number", "currency"].includes(column.type)
                    ? "text-right"
                    : ""
                }`}
              >
                {column.name}
              </td>
            ))}
        </tr>
      </thead>
      <tbody>
        {loading && (
          <tr>
            <td colSpan={columns.length + 1}>
              <TableLoader />
            </td>
          </tr>
        )}
        {!loading &&
          !IsEmptyArray(data) &&
          data.map((item, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {!IsEmptyArray(columns) &&
                columns.map((column, index) =>
                  getDisplayData(item, column, index)
                )}
            </tr>
          ))}
        {!loading && IsEmptyArray(data) && (
          <tr>
            <td colSpan={columns.length + 1}>
              <div className="flex-1 justify-center items-center px-6 py-12 col-flex">
                <div className="text-lg text-base-secondary">
                  No Data Available
                </div>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
