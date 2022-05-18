import { useQuery } from "react-query";
import { ProductCard } from "../components/molecules";
import { getAllPost } from "../service";

export default function Web() {
  const { isLoading, data, error, isSuccess } = useQuery(
    "post",
    () => getAllPost(),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) {
    return <div>Loading..</div>;
  }

  return (
    <div className="flex flex-row gap-4 flex-wrap w-full justify-center">
      {data && data.data.map((el: any) => <ProductCard {...el} />)}
    </div>
  );
}
