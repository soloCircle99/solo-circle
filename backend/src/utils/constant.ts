const GOOGLE_OAUTH2_BASEURL = "https://accounts.google.com/o/oauth2/auth"
const GOOGLE_TOKEN_BASEURL = "https://oauth2.googleapis.com/token"
const FACEBOOK_OAUTH_BASEURL = "https://www.facebook.com/v21.0/dialog/oauth"
const FACEBOOK_TOKEN_BASEURL = "https://graph.facebook.com/v21.0/oauth/access_token"

const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/contacts.readonly",
  "https://www.googleapis.com/auth/profile.agerange.read",
  "https://www.googleapis.com/auth/user.birthday.read",
  "https://www.googleapis.com/auth/user.emails.read",
  "https://www.googleapis.com/auth/user.gender.read",
  "https://www.googleapis.com/auth/user.phonenumbers.read",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile"
]

export { GOOGLE_OAUTH2_BASEURL, GOOGLE_TOKEN_BASEURL, FACEBOOK_OAUTH_BASEURL, FACEBOOK_TOKEN_BASEURL, GOOGLE_SCOPES }