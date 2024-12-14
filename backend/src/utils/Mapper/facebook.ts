interface UserDetailsInterface {
    id: string | null;
    name: string | null;
    email: string | null;
    gender: string | null;
    birthday: Date | null;
    phoneNumber: string | null;
    photo: string | null;
    verified: boolean;
}

const mapUserDetails = (data: any): UserDetailsInterface | null => {
    if (!data) return null;

    return {
        id: data?.id || null,
        name: data?.name || null,
        email: data?.email || null,
        gender: data?.gender || null,
        birthday: data?.birthday && new Date(data?.birthday) || null,
        phoneNumber: null,
        photo: data?.picture?.data?.url || null,
        verified: true
    };
};

export { mapUserDetails }