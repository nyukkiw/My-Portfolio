// Batas dipakai bersama oleh form (client) dan route (server).
export const NAME_MAX = 40;
export const MESSAGE_MAX = 500;

export type PublicComment = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};
