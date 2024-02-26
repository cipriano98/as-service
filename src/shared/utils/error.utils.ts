export const ErrorException = (
  message: string,
  status: number
): { message: string; status: number } => {
  return {
    message,
    status
  }
}
