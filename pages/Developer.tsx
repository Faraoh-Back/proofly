import Events from "@/components/ui/Events";
import Forum from "@/components/ui/Forum";
import Freelancers from "@/components/ui/Freelancers";
import Classes from "@/components/ui/Classes";
import Profile from "@/components/ui/Profile/Profile";


export default async function DeveloperPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const activeMenu = searchParams?.tab || "profile";

  console.log('searchParams', searchParams)

  return (
    <div className="flex min-h-screen bg-db-dark-blue text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-black/30 backdrop-blur-md border-r border-gray-700 p-6 space-y-4">
        <a
          href="/developer?tab=profile"
          className={`block py-2 px-4 rounded-lg transition ${
            activeMenu === "profile"
              ? "bg-db-cyan text-db-dark-blue font-bold"
              : "hover:bg-db-blue-dark"
          }`}
        >
          Profile
        </a>

        <a
          href="/developer?tab=forum"
          className={`block py-2 px-4 rounded-lg transition ${
            activeMenu === "forum"
              ? "bg-db-cyan text-db-dark-blue font-bold"
              : "hover:bg-db-blue-dark"
          }`}
        >
          Forum
        </a>
        <a
          href="/developer?tab=freelance"
          className={`block py-2 px-4 rounded-lg transition ${
            activeMenu === "freelance"
              ? "bg-db-cyan text-db-dark-blue font-bold"
              : "hover:bg-db-blue-dark"
          }`}
        >
          Freelance
        </a>
        <a
          href="/developer?tab=events"
          className={`block py-2 px-4 rounded-lg transition ${
            activeMenu === "events"
              ? "bg-db-cyan text-db-dark-blue font-bold"
              : "hover:bg-db-blue-dark"
          }`}
        >
          Events
        </a>
        <a
          href="/developer?tab=classes"
          className={`block py-2 px-4 rounded-lg transition ${
            activeMenu === "classes"
              ? "bg-db-cyan text-db-dark-blue font-bold"
              : "hover:bg-db-blue-dark"
          }`}
        >
          Classes
        </a>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {activeMenu === "profile" && <Profile />}
        {activeMenu === "forum" && <Forum />}
        {activeMenu === "freelance" && <Freelancers userType="developer" />}
        {activeMenu === "events" && <Events />}
        {activeMenu === "classes" && <Classes />}

      </main>
    </div>
  );
}
