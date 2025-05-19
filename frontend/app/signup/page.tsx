// frontend/app/signup/page.tsx
import SignupForm from '../../components/SignupForm';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Sign Up</h1>
        <SignupForm />
      </div>
    </div>
  );
}