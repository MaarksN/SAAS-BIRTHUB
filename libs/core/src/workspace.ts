import { headers } from 'next/headers';

export const getWorkspaceId = async (): Promise<string | null> => {
  const headersList = await headers();
  return headersList.get('x-workspace-id');
};
