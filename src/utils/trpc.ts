import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "../../../workout-app-prisma/main";

export const trpc = createReactQueryHooks<AppRouter>();
