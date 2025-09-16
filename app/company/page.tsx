import dynamic from 'next/dynamic';

const CompanyPage = dynamic(() => import('@/pages/Company'), {
  ssr: false
})

export default function Company({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div>
      <CompanyPage searchParams={searchParams} />
    </div>

  );
}
