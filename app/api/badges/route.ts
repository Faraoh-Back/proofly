// app/api/badges/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface Badge {
  id: string;
  name: string;
  image: string;
  eventLink: string;
  issuedDate: string;
}

interface BadgeResponse {
  badges: Array<Badge>;
}

// GET handler
export async function GET(request: NextRequest) {
  const response: BadgeResponse = {
    badges: [
      {
        id: "1",
        name: "Meridian Hackathon 2025",
        image: "/badge/meridian-badge.svg",
        eventLink: "link",
        issuedDate: "2025-09-09",
      },
      {
        id: "2",
        name: "Stellar Colaborator",
        image: "/badge/stellar-colab-badge.png",
        eventLink: "link",
        issuedDate: "2025-08-09",
      },
      {
        id: "3",
        name: "Google cloud summit",
        image: "/badge/google-summit.png",
        eventLink: "link",
        issuedDate: "2025-08-10",
      }
    ]
  };
  
  return NextResponse.json(response);
}