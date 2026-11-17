import * as v from "valibot";

export const UserResponseDto = v.pipe(
  v.object({
    id: v.number(),
    name: v.string(),
    email: v.string(),
    created_at: v.nullable(v.number()),
  }),
  v.transform((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt:
      user.created_at !== null
        ? new Date(user.created_at * 1000).toISOString()
        : null,
  })),
);
