import { getSession } from "@stdy/api";

export default async function Home() {
  const session = await getSession();

  console.log(session);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h3>Hello world</h3>
    </main>
  );
}
