'use client'

import Button from '@termsurf/leaf/component/Button'
import { MouseEvent } from 'react'
import Environment from '~/lib/frontend/components/Environment'
import {
  signupWithFacebook,
  signupWithGoogle,
} from '~/lib/frontend/services/auth'

// import { revalidatePath } from 'next/cache'
// import { redirect } from 'next/navigation'

// import { createClient } from '@/utils/supabase/server'

// export async function login(formData: FormData) {
//   const supabase = await createClient()

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   }

//   const { error } = await supabase.auth.signInWithPassword(data)

//   if (error) {
//     redirect('/error')
//   }

//   revalidatePath('/', 'layout')
//   redirect('/')
// }

// export async function signup(formData: FormData) {
//   const supabase = await createClient()

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   }

//   const { error } = await supabase.auth.signUp(data)

//   if (error) {
//     redirect('/error')
//   }

//   revalidatePath('/', 'layout')
//   redirect('/')
// }

export default function LoginPage() {
  const handleLoginGoogle = async (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    await signupWithGoogle()
  }

  const handleLoginFacebook = async (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    await signupWithFacebook()
  }

  return (
    <Environment>
      <div className="mt-64 flex flex-col gap-16">
        <Button onClick={handleLoginGoogle}>Login with Google</Button>
        <Button onClick={handleLoginFacebook}>
          Login with Facebook
        </Button>
      </div>
    </Environment>
  )
}
