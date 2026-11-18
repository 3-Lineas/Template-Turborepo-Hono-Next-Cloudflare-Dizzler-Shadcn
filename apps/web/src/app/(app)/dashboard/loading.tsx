import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="container mx-auto space-y-6 p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((cardIndex) => (
          <Skeleton key={cardIndex} className="h-32 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}
