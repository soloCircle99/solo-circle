interface UserDetailsInterface {
    id: string | null;
    name: string | null;
    email: string | null;
    gender: string | null;
    birthday: { year: number; month: number; day: number } | null;
    phoneNumber: string | null;
    age: string | null;
    photo: string | null;
}

const mapUserDetails = (data: any): UserDetailsInterface | null => {
    if (!data) return null;

    return {
        id: data?.id || null,
        name: data?.name || null,
        email: data?.email || null,
        gender: data?.gender || null,
        birthday: data?.birthday || null,
        phoneNumber: null,
        age: data?.age_range || null,
        photo: data?.picture?.data?.url || null,
    };
};

export { mapUserDetails }