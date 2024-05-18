import { getServerSession } from "next-auth/next";
import { authConfig } from "../api/auth/[...nextauth]/route";

export default async function AdminPage() {   
    const session = await getServerSession(authConfig);

    if (!session) {
        return <div>Нет сессии</div>        
    }

    return (
      <div>
        <h1>AdminPanel</h1>
      </div>
    );
}