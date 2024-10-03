export default function authLyaout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-lvh flex justify-center items-center bg-[var(--bg)]">
      {children}
    </div>
  );
}
