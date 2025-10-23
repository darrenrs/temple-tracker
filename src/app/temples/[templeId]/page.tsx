export default async function TempleInformationPage({
  params,
}: {
  params: Promise<{ templeId: string }>;
}) {
  return (
    <>
      <h1 className="text-2xl pb-2">Temple {(await params).templeId}</h1>
      <p className="text-sm italic pb-4">Information page coming soon!</p>
    </>
  );
}