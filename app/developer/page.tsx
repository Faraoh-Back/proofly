import dynamic from 'next/dynamic';

const DeveloperPage = dynamic(() => import('@/pages/Developer'), {
  ssr: false
})

export default function Developer({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (  
    <div>
      <DeveloperPage searchParams={searchParams} />
    </div>
  );
}
