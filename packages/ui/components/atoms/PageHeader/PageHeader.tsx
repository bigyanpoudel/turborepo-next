import Head from "next/head";
interface HeadProps {
  loading: boolean;
  title: string;
}
export const PageHeader = ({ loading, title }: HeadProps) => {
  return (
    <Head>
      {loading ? <title>Loading...</title> : <title>BIZRYT - {title}</title>}
    </Head>
  );
};
