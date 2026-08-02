export interface AdminActionState {
  ok: boolean;
  message: string;
}

export const INITIAL_ADMIN_ACTION_STATE: AdminActionState = {
  ok: false,
  message: "",
};
