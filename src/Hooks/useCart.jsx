import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useCart = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: cart = [], isLoading, refetch } = useQuery({
        queryKey: ['cart'],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/cart/${user?.email}`);
            return res.data;
        },
    });
    return { cart, isLoading, count: cart.length, refetch };
};

export default useCart;