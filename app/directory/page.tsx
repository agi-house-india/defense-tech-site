// Force dynamic rendering to avoid DB queries at build time
export const dynamic = 'force-dynamic'

import { db, responses } from '@/lib/db';
import { eq } from 'drizzle-orm';
import DirectoryContent from './DirectoryContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Member Directory | Defense Tech Network',
    description: 'Browse and connect with members of the Defense Tech Network community including investors, founders, operators and advisors.',
};

type MemberRole = "Investor" | "Advisor" | "Founder" | "Want to be a founder" | "Operator" | "Influencer";
type ExpertiseArea = "AI, Cyber, and OSINT" | "Defense & Strategic Technologies" | "Software, SaaS & Product" | "Space & Advanced Hardware" | "Autonomous Systems & Robotics" | "Healthcare, Manufacturing & Energy" | "Narrative & Public Relations";

export default async function DirectoryPage() {
    const data = await db.select().from(responses).where(eq(responses.approved, true));

    const formattedData = data.map((response) => ({
        name: response.firstName + " " + (response.lastName || ""),
        role: (response.selfDescriptions?.[0] || 'Founder') as MemberRole,
        description: response.selfDescriptions?.join(', ') || '',
        email: response.email || undefined,
        linkedin: response.linkedinUrl || undefined,
        twitter: response.xUrl || undefined,
        website: response.startupWebsite || undefined,
        expertiseAreas: (response.domainsOfInterest?.split(",").map(s => s.trim()) || []) as ExpertiseArea[],
    }));

    return <DirectoryContent initialMembers={formattedData} totalCount={data.length} />;
}