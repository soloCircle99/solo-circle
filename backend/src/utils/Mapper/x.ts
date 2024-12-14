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
        email: data?.username || null,
        gender: null,
        birthday: null,
        phoneNumber: null,
        avatar: data?.profile_image_url,
        verified: data?.verified || false,
    };
};

export { mapUserDetails }