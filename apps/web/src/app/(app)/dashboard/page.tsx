import { trpc } from "@/lib/trpc-server";
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/components/card";
import { logoutAction } from "@/actions/auth/logout-action";
import { Button } from "@repo/ui/components/button";
import { toArgTime } from "@/lib/timezone";

export default async function DashboardPage() {
  let users: any[] = [];
  try {
    const response = await trpc.users.list.query();
    if (response.success && "data" in response) {
      users = response.data;
    }
  } catch (e) {
    console.error("Failed to fetch users", e);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <CardTitle>{user.email}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">ID: {user.id}</p>
              <p className="text-sm text-muted-foreground">
                Joined: {toArgTime(user.createdAt!, "Y-m-d")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
