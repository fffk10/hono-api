type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <header>
        <h1>Warranty Management</h1>
      </header>

      <main>{children}</main>
    </div>
  );
}
