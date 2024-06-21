import GalleryForm from "@/src/components/admin/GalleryForm/GalleryForm";
import { getPicture } from "../../api/auth/[...nextauth]/actionPicture";
import GalleryList from "@/src/components/admin/GalleryList/GalleryList";

export const dynamic = 'error';
export const revalidate = 0;

export default async function GalleryPage() {
    const pictures = await getPicture();   
    
    return (
        <div className="container">
            <GalleryForm/>
            <GalleryList pictures={pictures}/>
        </div>
    )
}