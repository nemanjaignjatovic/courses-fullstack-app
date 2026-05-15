export async function readErrors(response: Response): Promise<string[]> {
  const data = await response.json().catch(() => ({ errors: [] }));
  return Array.isArray(data.errors) ? data.errors : ['Something went wrong.'];
}
