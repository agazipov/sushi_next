import AdminNavigation from "@/src/components/admin/AdminNavigation/AdminNavigation";

export default function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <main>
            <AdminNavigation />
            <section>{children}</section>
        </main>
    )
}