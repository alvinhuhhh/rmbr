export default function NotFound({ ...props }: NotFoundProps) {
  return (
    <main style={{ padding: "1rem" }}>
      <p>There's nothing here!</p>
      <a href="/app/lists">Back to safety</a>
    </main>
  );
}

interface NotFoundProps {}
