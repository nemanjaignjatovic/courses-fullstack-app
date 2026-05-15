export type BasicAuthCredentials = {
  emailAddress: string;
  password: string;
};

/*
  Basic Auth sends credentials in this format:

  Authorization: Basic base64(email:password)

  This helper reads the header, decodes it, and returns the email/password pair.
  It intentionally does only parsing. The actual user lookup and password check
  happen in authenticateUser.ts.
*/
export function readBasicAuth(authorizationHeader: string | undefined): BasicAuthCredentials | null {
  if (!authorizationHeader || !authorizationHeader.startsWith('Basic ')) {
    return null;
  }

  const base64Credentials = authorizationHeader.slice('Basic '.length).trim();
  const decoded = Buffer.from(base64Credentials, 'base64').toString('utf8');
  const separatorIndex = decoded.indexOf(':');

  if (separatorIndex === -1) {
    return null;
  }

  const emailAddress = decoded.slice(0, separatorIndex).trim();
  const password = decoded.slice(separatorIndex + 1);

  if (!emailAddress || !password) {
    return null;
  }

  return {
    emailAddress,
    password
  };
}
