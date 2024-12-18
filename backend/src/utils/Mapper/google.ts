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
  let birthday: Date | null = null;

  if (data?.birthdays?.[0]?.date) {
    const { year, month, day } = data.birthdays[0].date;

    if (year && month != null && day) {
      birthday = new Date(year, month - 1, day);
    }
  }

  return {
    providerId: data?.names?.[0]?.metadata?.source?.id || null,
    fullName: data?.names?.[0]?.displayName || null,
    email: data?.emailAddresses?.[0]?.value || null,
    gender: data?.genders?.[0]?.value || null,
    birthday,
    phoneNumber: data?.phoneNumbers?.[0]?.value || null,
    avatar: data?.photos?.[0]?.url || null,
    verified: Boolean(data?.verified || true),
  };
};

export { mapUserDetails };