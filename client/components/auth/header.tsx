interface headerProps {
  label: string;
}

export function Header({ label }: headerProps) {
  return (
    <div className="flex flex-col  justify-center items-center gap-y-4">
      <h1 className=" text-3xl font-semibold text-[var(--bg)]">BAS</h1>
      <p className="text-sm text-[var(--bgDark)]">{label}</p>
    </div>
  );
}
