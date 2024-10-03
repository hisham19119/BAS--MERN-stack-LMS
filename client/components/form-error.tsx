import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface formErrorProps {
  message?: string;
}

export function FormError({ message }: formErrorProps) {
  if (!message) return null;
  return (
    <div className="flex gap-x-2 justify-center items-center bg-destructive/15 text-sm text-destructive p-2">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
}
