import DiscountsList from "@/src/components/admin/DiscountsList/DiscountsList";
import { getDiscounts } from "@/src/services/actionDiscount";

export const dynamic = 'force-dynamic';

export default async function DiscountPage() {
    const discounts = await getDiscounts();

    return (
        <div className="container">
            <DiscountsList discounts={discounts}/>
        </div>
    )
}