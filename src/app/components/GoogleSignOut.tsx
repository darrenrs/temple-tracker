import { signOut } from "@/auth"

export default function GoogleLogoutButton() {
  return (
    <button
      onClick={async () => {
        "use server"
        await signOut()
      }}
    >Sign Out
    </button>
  )
}