import ItemsCard from '@/app/components/ItemsCard';

const Page = async ({ params }) => {
    const { categoryId } = await params;

    const res = await fetch(
        `https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`
    );

    const result = await res.json();

    const categoryInfo = Array.isArray(result) ? result : [];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">
                {categoryInfo[0]?.categoryNameBn || 'পণ্যের তালিকা'}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryInfo.map((info) => (
                    <ItemsCard key={info.id} product={info} />
                ))}
            </div>
        </div>
    );
};

export default Page;