const GOOGLE_OAUTH2_BASEURL = "https://accounts.google.com/o/oauth2/auth"
const GOOGLE_TOKEN_BASEURL = "https://oauth2.googleapis.com/token"
const FACEBOOK_OAUTH_BASEURL = "https://www.facebook.com/v21.0/dialog/oauth"
const FACEBOOK_TOKEN_BASEURL = "https://graph.facebook.com/v21.0/oauth/access_token"
const X_OAUTH2_BASEURL = "https://twitter.com/i/oauth2/authorize"
const X_TOKEN_BASEURL = "https://api.x.com/2/oauth2/token"

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

const FACEBOOK_SCOPES = ["email", "public_profile", "user_age_range", "user_birthday", "user_gender"]

const X_SCOPES = ["users.read", "tweet.read", "offline.access"]

export {
  GOOGLE_OAUTH2_BASEURL, GOOGLE_TOKEN_BASEURL, FACEBOOK_OAUTH_BASEURL,
  FACEBOOK_TOKEN_BASEURL, X_OAUTH2_BASEURL, X_TOKEN_BASEURL,
  GOOGLE_SCOPES, FACEBOOK_SCOPES, X_SCOPES
}