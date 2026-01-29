import { trpc, type RouterOutputs } from "@/lib/trpc-server";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@repo/ui/components/card";
import { toArgTime } from "@/lib/timezone";

type UserListOutput = RouterOutputs["users"]["list"];
// Extraemos el tipo que tiene la propiedad 'data' (el caso de éxito)
type SuccessOutput = Extract<UserListOutput, { data: unknown }>;
type User = SuccessOutput["data"][number];

export default async function DashboardPage() {
  let users: User[] = [];
  try {
    const response = await trpc.users.list.query();
    // Verificamos explícitamente 'data' para que TS discrimine la unión correctamente
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
