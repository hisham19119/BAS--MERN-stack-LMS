import { CheckCircledIcon } from "@radix-ui/react-icons";

interface formSuccessProps {
  message?: string;
}

export function FormSuccess({ message }: formSuccessProps) {
  if (!message) return null;
  return (
    <div className="flex gap-x-2 justify-center items-center p-2 bg-emerald-500/15 text-sm text-emerald-500">
      <CheckCircledIcon className="w-4 h-4 " />
      <p>{message}</p>
    </div>
  );
}
