export const dynamic = "force-dynamic";

import RotatingBadge from '../../components/ui/RotatingBadge'


export default function TestBadgesPage() {
  const testBadges = [
    {
      name: 'Google Logo',
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
      rarity: 'legendary' as const
    },
    {
      name: 'Meta Logo',
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Facebook_Logo_%282019%29.svg',
      rarity: 'epic' as const
    },
    {
      name: 'Amazon Logo',
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
      rarity: 'rare' as const
    },
    {
      name: 'Microsoft Logo',
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
      rarity: 'common' as const
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Teste das Badges 3D</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {testBadges.map((badge, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center mb-4">
              <RotatingBadge
                category="custom"
                rarity={badge.rarity}
                size="large"
                iconUrl={badge.iconUrl}
              />
            </div>
            <h3 className="text-lg font-semibold">{badge.name}</h3>
            <p className="text-sm text-gray-400 capitalize">{badge.rarity}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Badges Procedurais</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto">
          <div className="text-center">
            <RotatingBadge category="hackathon" rarity="legendary" size="medium" />
            <p className="text-sm mt-2">Hackathon</p>
          </div>
          <div className="text-center">
            <RotatingBadge category="project" rarity="epic" size="medium" />
            <p className="text-sm mt-2">Project</p>
          </div>
          <div className="text-center">
            <RotatingBadge category="certification" rarity="rare" size="medium" />
            <p className="text-sm mt-2">Certification</p>
          </div>
          <div className="text-center">
            <RotatingBadge category="contribution" rarity="epic" size="medium" />
            <p className="text-sm mt-2">Contribution</p>
          </div>
          <div className="text-center">
            <RotatingBadge category="neon" rarity="legendary" size="medium" />
            <p className="text-sm mt-2">Neon</p>
          </div>
          <div className="text-center">
            <RotatingBadge category="stellar" rarity="rare" size="medium" />
            <p className="text-sm mt-2">Stellar</p>
          </div>
        </div>
      </div>
    </div>
  );
}