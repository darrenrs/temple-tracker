import { signIn } from "@/auth"
 
export default function GoogleLoginButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit">Login with Google</button>
    </form>
  )
}