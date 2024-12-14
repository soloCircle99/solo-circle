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

  let birthday: Date | null = null;

  if (data?.birthdays?.[0]?.date) {
    const { year, month, day } = data.birthdays[0].date;

    if (year && month != null && day) {
      birthday = new Date(year, month - 1, day);
    }
  }

  return {
    id: data?.names?.[0]?.metadata?.source?.id || null,
    name: data?.names?.[0]?.displayName || null,
    email: data?.emailAddresses?.[0]?.value || null,
    gender: data?.genders?.[0]?.value || null,
    birthday,
    phoneNumber: data?.phoneNumbers?.[0]?.value || null,
    photo: data?.photos?.[0]?.url || null,
    verified: Boolean(data?.verified || true),
  };
};

export { mapUserDetails };