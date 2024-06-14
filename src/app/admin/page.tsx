import AdminHome from "@/src/components/admin/AdminHome/AdminHome";
import { getMetrickOrder } from "@/src/services/metric";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const metric = await getMetrickOrder();

    return (
        <AdminHome metric={metric[0]} />
    );
}