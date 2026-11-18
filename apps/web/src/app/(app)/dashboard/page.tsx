import { listUsersAction } from "@/actions/users/list-users.action";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toArgTime } from "@/lib/timezone";

export default async function DashboardPage() {
  const users = await listUsersAction();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
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
                Registrado el: {toArgTime(user.createdAt, "Y-m-d")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
