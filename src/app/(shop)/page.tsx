import Glagne from "@/src/components/shop/Glagne/Glagne";

export const dynamic = 'error';
export const revalidate = 0;

export default async function Main() {
    return (
        <Glagne />
    );
}
