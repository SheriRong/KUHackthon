import { NextResponse } from 'next/server';
import { auth } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { AIService } from '@/services/aiService';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's profile
    const profile = await prisma.profile.findUnique({
      where: { userId: session.user.id },
    });

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Get all active jobs
    const jobs = await prisma.job.findMany({
      where: {
        // Add any filters for active jobs
      },
      include: {
        employer: {
          select: {
            name: true,
          },
        },
      },
    });

    // Use AI to match jobs with the profile
    const aiService = new AIService(process.env.GOOGLE_AI_API_KEY || '');
    const matches = await aiService.matchJobsToProfile(profile, jobs);

    // Sort jobs by match score
    const sortedMatches = matches.matches.sort((a: any, b: any) => b.score - a.score);

    // Combine match scores with job details
    const matchedJobs = sortedMatches.map((match: any) => {
      const job = jobs.find(j => j.id === match.jobId);
      return {
        ...job,
        matchScore: match.score,
        matchExplanation: match.explanation,
        keyMatches: match.keyMatches,
        gapAreas: match.gapAreas,
      };
    });

    return NextResponse.json(matchedJobs);
  } catch (error) {
    console.error('Error finding job matches:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
