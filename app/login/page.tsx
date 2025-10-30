import { LoginForm } from "@/components/login-form"
import { Folder3D } from "@/components/folder-3d"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary flex-col justify-between p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-white" />
          </div>
          <span className="text-3xl font-bold">StoreIt</span>
        </div>

        <div className="space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            Manage your files
            <br />
            the best way
          </h1>
          <p className="text-lg text-white/90 max-w-md">
            Awesome, we've created the perfect place for you to store all your documents.
          </p>
        </div>

        <div className="flex justify-center items-center">
          <Folder3D />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <LoginForm />
      </div>
    </div>
  )
}
