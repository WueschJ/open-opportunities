
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Stats {
  totalInactive: number;
  nudgedCount: number;
  totalEnriched: number;
  dismissedCount: number;
}

interface DashboardHeaderProps {
  stats: Stats;
}

const DashboardHeader = ({ stats }: DashboardHeaderProps) => {
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardDescription>Total Inactive</CardDescription>
          <CardTitle>{stats.totalInactive}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Nudged Users</CardDescription>
          <CardTitle>{stats.nudgedCount}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Enriched Users</CardDescription>
          <CardTitle>{stats.totalEnriched}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Dismissed News</CardDescription>
          <CardTitle>{stats.dismissedCount}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default DashboardHeader;
