import { db, responses } from '@/lib/db';
import { eq } from 'drizzle-orm';
import DirectoryContent from './DirectoryContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Member Directory | Defense Tech Network',
    description: 'Browse and connect with members of the Defense Tech Network community including investors, founders, operators and advisors.',
};

export default async function DirectoryPage() {
    const data = await db.select().from(responses).where(eq(responses.approved, true));

    const formattedData = data.map((response) => ({
        name: response.firstName + " " + (response.lastName || ""),
        role: response.selfDescriptions?.[0] || '',
        description: response.selfDescriptions,
        email: response.email,
        linkedin: response.linkedinUrl,
        twitter: response.xUrl,
        website: response.startupWebsite,
        expertiseAreas: response.domainsOfInterest?.split(",") || [],
    }));

    return <DirectoryContent initialMembers={formattedData} totalCount={data.length} />;
}