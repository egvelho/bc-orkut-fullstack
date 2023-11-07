import type { Action } from "routing-controllers";
import { JwtService, InvalidAuthorizationHeaderError } from "../jwt.service";

const jwtService = new JwtService();

export async function authorizationChecker(action: Action): Promise<boolean> {
  try {
    const payload = jwtService.extractTokenFromHeader(action.request);
    return true;
  } catch (error) {
    if (error instanceof InvalidAuthorizationHeaderError) {
      return false;
    }

    throw error;
  }
}
