interface UserDetailsInterface {
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
    name: data?.names?.[0]?.displayName || null,
    email: data?.emailAddresses?.[0]?.value || null,
    gender: data?.genders?.[0]?.value || null,
    birthday: data?.birthdays?.[0]?.date || null,
    phoneNumber: data?.phoneNumbers?.[0]?.value || null,
    age: data?.ageRanges?.[0]?.ageRange || null,
    photo: data?.photos?.[0]?.url || null,
  };
};

export { mapUserDetails }