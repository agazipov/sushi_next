import { getPicture } from "../../api/auth/[...nextauth]/actionPicture";
import GalleryList from "@/src/components/admin/GalleryList/GalleryList";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function GalleryPage() {
    const pictures = await getPicture();
    console.log("pictures", pictures.length);


    return (
        <GalleryList pictures={pictures} />
    )
}