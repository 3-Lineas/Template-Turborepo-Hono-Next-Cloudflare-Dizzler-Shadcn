import * as v from "valibot";
import { UserResponseDto } from "../users/user-response.dto";

export const LoginResponseDto = v.object({
  token: v.string(),
  user: UserResponseDto,
});
