import supabase from '~/lib/shared/settings/supabase/client'
import { HOST } from '~/lib/shared/utilities/host'

export async function signupWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${HOST}/authentications/google/callback`,
    },
  })
}

export async function signupWithFacebook() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'facebook',
    options: {
      redirectTo: `${HOST}/authentications/facebook/callback`,
    },
  })
}

export async function signupWithGitHub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${HOST}/authentications/github/callback`,
    },
  })
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
}
