import Developer from '@/pages/Developer';

export default async function Index({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <Developer searchParams={searchParams} />
  );
}
