export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from 'next/server';
import { getDevelopers } from '../../../../mocks/hireMocks';
import { DeveloperProfile, SortOption } from '../../../../types/hire';

export async function GET(request: NextRequest) {
  try {
    const parameters = new URL(request.url);
    const searchParams = parameters?.searchParams;
    
    // Parse query parameters
    const query = searchParams.get('query') || '';
    const skills = searchParams.get('skills')?.split(',').filter(Boolean) || [];
    const availability = searchParams.get('availability')?.split(',').filter(Boolean) || [];
    const sortBy = searchParams.get('sortBy') as SortOption || SortOption.RELEVANCE;
    const minExperience = parseInt(searchParams.get('minExperience') || '0');
    const maxExperience = parseInt(searchParams.get('maxExperience') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    let developers = getDevelopers();

    // Filter by search query
    if (query) {
      const queryLower = query.toLowerCase();
      developers = developers.filter(dev => 
        dev.user_name.toLowerCase().includes(queryLower) ||
        dev.headline.toLowerCase().includes(queryLower) ||
        dev.skills.some(skill => skill.toLowerCase().includes(queryLower)) ||
        dev.bio.toLowerCase().includes(queryLower)
      );
    }

    // Filter by skills
    if (skills.length > 0) {
      developers = developers.filter(dev =>
        skills.some(skill => dev.skills.includes(skill))
      );
    }

    // Filter by availability
    if (availability.length > 0) {
      developers = developers.filter(dev => 
        availability.includes(dev.availability)
      );
    }

    // Filter by experience
    developers = developers.filter(dev => 
      dev.yearsOfExperience >= minExperience && 
      dev.yearsOfExperience <= maxExperience
    );

    // Sort results
    switch (sortBy) {
      case SortOption.BADGES_COUNT:
        developers.sort((a, b) => b.totalBadges - a.totalBadges);
        break;
      case SortOption.EXPERIENCE:
        developers.sort((a, b) => b.yearsOfExperience - a.yearsOfExperience);
        break;
      case SortOption.RATING:
        developers.sort((a, b) => {
          const aRating = (a.attributes.problemSolving + a.attributes.collaboration + a.attributes.innovation + a.attributes.leadership) / 4;
          const bRating = (b.attributes.problemSolving + b.attributes.collaboration + b.attributes.innovation + b.attributes.leadership) / 4;
          return bRating - aRating;
        });
        break;
      default:
        // Keep original order for relevance
        break;
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedDevelopers = developers.slice(startIndex, endIndex);

    return NextResponse.json({
      developers: paginatedDevelopers,
      totalCount: developers.length,
      currentPage: page,
      totalPages: Math.ceil(developers.length / limit),
      appliedFilters: {
        query,
        skills,
        availability,
        experience: { min: minExperience, max: maxExperience },
        sortBy
      }
    });

  } catch (error) {
    console.error('Error searching talents:', error);
    return NextResponse.json(
      { error: 'Failed to search talents' },
      { status: 500 }
    );
  }
}