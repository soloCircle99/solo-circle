interface UserDetailsInterface {
    providerId: string;
    fullName: string
    email: string
    gender: string | null;
    birthday: Date | null;
    phoneNumber: string | null
    avatar: string;
    verified: boolean;
}

const mapUserDetails = (data: any): UserDetailsInterface => {
    return {
        providerId: data?.id,
        fullName: data?.name,
        email: data?.email || null,
        gender: data?.gender || null,
        birthday: data?.birthday && new Date(data?.birthday) || null,
        phoneNumber: null,
        avatar: data?.picture?.data?.url,
        verified: true
    };
};

export { mapUserDetails }