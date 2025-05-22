import { Error } from "@/types";

interface ErrorMessageResponse {
  error: Error;
  success: false;
}

export default function errorMessage(message: string): ErrorMessageResponse {
  return {
    error: {
      issues: [
        {
          message,
        },
      ],
    },
    success: false,
  };
}
