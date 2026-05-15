import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";

const values = [
  {
    title: "Human-curated quality",
    description:
      "Every shared bookmark is meant to be useful, not noisy. We prioritize relevance, clarity, and practical value.",
  },
  {
    title: "Focused discovery",
    description:
      "Our experience is intentionally simple so you can move from search to trusted resources in seconds.",
  },
  {
    title: "Professional sharing",
    description:
      "Save, revisit, and share resources with your team inside a structured social bookmarking workflow.",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a professional social bookmarking network built for curated discovery and meaningful sharing.`}
      actions={
        <>
          <Button variant="outline" asChild>
            <Link href="/sbm">Latest Shared Bookmarks</Link>
          </Button>
          <Button asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-border bg-card">
          <CardContent className="space-y-4 p-6">
            <Badge variant="secondary">Professional Social Bookmarking Network</Badge>
            <h2 className="text-2xl font-semibold text-foreground">
              A trusted place to discover what people actually use.
            </h2>
            <p className="text-sm text-muted-foreground">
              {SITE_CONFIG.name} helps individuals and teams share high-value links, organize them with context, and
              surface the right resource at the right time. We are designed for practical, professional discovery.
            </p>
          </CardContent>
        </Card>
        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
