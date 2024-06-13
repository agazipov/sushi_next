import EmptyContent from "@/src/components/shop/EmptyContent/EmptyContent";
import LoadingLogo from "@/src/components/shop/LoadingLogo/LoadingLogo";

export default function SuccessLoading() {
    return (
        <EmptyContent>
            <LoadingLogo/>
        </EmptyContent>
    );
}