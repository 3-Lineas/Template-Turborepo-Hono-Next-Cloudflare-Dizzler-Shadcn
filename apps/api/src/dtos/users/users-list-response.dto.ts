import * as v from "valibot";
import { UserResponseDto } from "./user-response.dto";

export const UsersListResponseDto = v.array(UserResponseDto);
