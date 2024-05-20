import AdminNavigation from "@/src/components/admin/AdminNavigation/AdminNavigation";

export default function AdminLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div>
            <AdminNavigation />
            <div>{children}</div>
        </div>
    )
}