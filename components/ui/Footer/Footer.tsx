
const partners = [
  { name: 'Stellar', logo: '/stellar_logo.png', invert: true },
  { name: 'Meridian', logo: '/meridian-logo.png', invert: true },
  { name: 'Vercel', logo: '/vercel.svg' },
  { name: 'Supabase', logo: '/supabase.svg' },
];

export default function Footer() {
  return (
      <footer className="py-8 bg-db-dark-blue">
        
        <div className="container mx-auto px-6 text-center">

          <div className="mt-4 flex gap-8 items-center justify-center">
            {partners.map((partner) => (
              <div key={partner.name} className="flex justify-center grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-300">
                <img src={partner.logo} alt={partner.name} className="h-8 object-contain"  width="100px" style={{ filter: partner.invert ? "invert(1)" : "" }} />
              </div>
            ))}
          </div>
        </div>
      </footer>
  );
}
