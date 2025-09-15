import CompanyPage from '@/pages/Company';

export default async function Index({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <CompanyPage searchParams={searchParams} />
  );
}
