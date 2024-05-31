import AdminNavigation from "@/src/components/admin/AdminNavigation/AdminNavigation";

export default function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <main className="inter">
            <AdminNavigation />
            <section>{children}</section>
        </main>
    )
}