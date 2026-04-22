function NotesLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <aside>{sidebar}</aside>
      <div style={{ flex: 1 }}>{children}</div>
      {/* <main>{children}</main> */}
    </div>
  );
}

export default NotesLayout;
