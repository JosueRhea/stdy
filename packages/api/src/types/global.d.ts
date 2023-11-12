export type ApiGetResponse<T> = Promise<
  { data: T; error: null } | { data: null; error: { message: string } }
>;
