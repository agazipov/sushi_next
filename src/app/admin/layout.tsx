import AdminNavigation from "@/src/components/admin/AdminNavigation/AdminNavigation";

export default function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <AdminNavigation />
            <section>{children}</section>
        </>
    )
}