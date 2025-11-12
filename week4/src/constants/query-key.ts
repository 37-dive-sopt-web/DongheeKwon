export const QUERY_KEY = {
  ALL: ["users"],
  USER: (id: string) => [...QUERY_KEY.ALL, id],
};
