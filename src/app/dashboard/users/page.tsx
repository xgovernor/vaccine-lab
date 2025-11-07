
import { getUserList } from "@/actions/auth/get-user-list";
import UsersTable from "@/components/users-table";


interface UsersPageProps {
    searchParams: {
        limit?: string;
        offset?: string;
    };
}

const PageUsers = async ({ searchParams }: UsersPageProps) => {
    const { limit, offset } = await searchParams;

    const data = await getUserList({
        limit: limit ? parseInt(limit) : 10,
        offset: offset ? parseInt(offset) : 0
    });


    console.log("PageUsers data:", data);

    return (
        <div className="p-4">
            {/* @ts-expect-error Type need to define properly */}
            <UsersTable users={data.users || []} />
        </div>
    )
}

export default PageUsers
