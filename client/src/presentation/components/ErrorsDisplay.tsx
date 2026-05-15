interface ErrorsDisplayProps {
  errors: string[];
}

export function ErrorsDisplay({ errors }: ErrorsDisplayProps) {
  if (!errors.length) return null;

  return (
    <div className="validation--errors">
      <h2>Validation error(s)</h2>
      <div>
        <ul>
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
