import { ReactNode } from 'react';
import { ErrorsDisplay } from './ErrorsDisplay';

interface FormProps {
  cancel: () => void;
  errors: string[];
  submit: () => void;
  submitButtonText: string;
  children: ReactNode;
}

export function Form({ cancel, errors, submit, submitButtonText, children }: FormProps) {
  return (
    <>
      <ErrorsDisplay errors={errors} />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        {children}
        <button className="button" type="submit">
          {submitButtonText}
        </button>
        <button
          className="button button-secondary"
          onClick={(event) => {
            event.preventDefault();
            cancel();
          }}
        >
          Cancel
        </button>
      </form>
    </>
  );
}
