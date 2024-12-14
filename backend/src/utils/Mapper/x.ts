interface UserDetailsInterface {
    id: string | null;
    name: string | null;
    email: string | null;
    gender: string | null;
    birthday: { year: number; month: number; day: number } | null;
    phoneNumber: string | null;
    photo: string | null;
    verified: boolean;
}

const mapUserDetails = (data: any): UserDetailsInterface | null => {
    if (!data) return null;

    return {
        id: data?.id || null,
        name: data?.name || null,
        email: data?.username || null,
        gender: null,
        birthday: null,
        phoneNumber: null,
        photo: data?.profile_image_url || null,
        verified: data?.verified || false,
    };
};

export { mapUserDetails }