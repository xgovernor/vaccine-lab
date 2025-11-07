import { getVaccineList } from "@/actions/vaccine/get-veccine-list";
import VaccineTable from "@/components/inventory-list-table";

interface UsersPageProps {
    searchParams: {
        limit?: string;
        offset?: string;
    };
}
const PageInventoryList = async ({ searchParams }: UsersPageProps) => {
    const { limit, offset } = await searchParams;

    const data = await getVaccineList({
        limit: limit ? parseInt(limit) : 10,
        offset: offset ? parseInt(offset) : 0
    });
    console.log("PageInventoryList data:", data);

    return (
        <div className="p-4">
            {/* @ts-expect-error need to define type strongly */}
            <VaccineTable data={data.data || []} />
        </div>
    );
}

export default PageInventoryList;
