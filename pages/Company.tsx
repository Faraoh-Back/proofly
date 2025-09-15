import Events from "@/components/ui/Events";
import Forum from "@/components/ui/Forum";
import Freelancers from "@/components/ui/Freelancers";

export default async function CompanyPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const activeMenu = searchParams?.tab || "forum";

  console.log('searchParams', searchParams)

  return (
    <div className="flex min-h-screen bg-db-dark-blue text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-black/30 backdrop-blur-md border-r border-gray-700 p-6 space-y-4">
        <a
          href="/company?tab=forum"
          className={`block py-2 px-4 rounded-lg transition ${
            activeMenu === "forum"
              ? "bg-db-cyan text-db-dark-blue font-bold"
              : "hover:bg-db-blue-dark"
          }`}
        >
          Forum
        </a>
        <a
          href="/company?tab=freelance"
          className={`block py-2 px-4 rounded-lg transition ${
            activeMenu === "freelance"
              ? "bg-db-cyan text-db-dark-blue font-bold"
              : "hover:bg-db-blue-dark"
          }`}
        >
          Freelance
        </a>
        <a
          href="/company?tab=events"
          className={`block py-2 px-4 rounded-lg transition ${
            activeMenu === "events"
              ? "bg-db-cyan text-db-dark-blue font-bold"
              : "hover:bg-db-blue-dark"
          }`}
        >
          Events
        </a>

       
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeMenu === "forum" && <Forum />}
        {activeMenu === "freelance" && <Freelancers />}
        {activeMenu === "events" && <Events />}
      </main>
    </div>
  );
}
