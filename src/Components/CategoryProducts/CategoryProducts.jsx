import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import ProductCard from "../ProductCard/ProductCard";

const CategoryProducts = () => {
    const { name } = useParams();
    const axiosPublic = useAxiosPublic();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['category-products', name],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products/category/${name}`);
            return res.data;
        },
    });

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-4">Products in "{name}"</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default CategoryProducts;