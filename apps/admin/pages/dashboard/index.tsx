import React from "react";
import { getAllUserPost } from "../../service";
import { useQuery } from "react-query";
import { Table, TableColumnProps } from "ui";
const Index = () => {
  const { isLoading, data, error, isSuccess } = useQuery(
    "admin-post",
    () => getAllUserPost(),
    {
      refetchOnWindowFocus: false,
    }
  );

  const column: TableColumnProps[] = [
    { name: "Title", key: "title" },
    { name: "Image", key: "image" },
    { name: "description", key: "description" },
    {
      name: "Created At",
      key: "created_at",
      type: "date",
    },
  ];

  return (
    <div className="container">
      <div className="bg-base-100 shadow-200 rounded-md p-2">
        <Table
          className="custom-table border !mb-0"
          data={data?.data}
          columns={column}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default Index;
