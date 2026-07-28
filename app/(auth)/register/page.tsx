import RegisterForm from "@/components/auth/RegisterForm";

interface RegisterPageProps {
  searchParams: Promise<{ role?: string }>;
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const { role } = await searchParams;
  const initialRole = role === "clinic" ? "clinic" : "patient";

  return <RegisterForm initialRole={initialRole} />;
}
