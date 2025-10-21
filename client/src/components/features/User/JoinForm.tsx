import React from "react";
import { Field } from "./Field";
import { SelectAvatar } from "./Avatar/SelectAvatar";
interface JoinFormProps {
  nickname: string;
  name: string;
  surname: string;
  avatar: string;
  onChange: (
    prop: "nickname" | "name" | "surname" | "avatar",
    value: string
  ) => void;
  onSubmit: () => void;
}

export const JoinForm: React.FC<JoinFormProps> = ({
  nickname,
  name,
  surname,
  avatar,
  onChange,
  onSubmit,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  const canSubmit = Boolean(nickname?.trim());

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:gap-5" noValidate>
      <Field
        label="Nickname"
        value={nickname}
        placeholder="Inserisci il tuo nickname"
        onChange={(value) => onChange("nickname", value)}
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field
          label="Nome"
          value={name}
          placeholder="Nome"
          onChange={(value) => onChange("name", value)}
        />
        <Field
          label="Cognome"
          value={surname}
          placeholder="Cognome"
          onChange={(value) => onChange("surname", value)}
        />
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="
          mt-2 w-full rounded-xl px-4 py-3
          bg-theme-v-700 text-white font-semibold text-base
          hover:bg-theme-v-600 active:scale-[0.98]
          transition-all duration-150
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-theme-v-700
          focus:outline-none focus:ring-2 focus:ring-theme-gy-200 focus:ring-offset-2 focus:ring-offset-theme-v-900
        "
      >
        Entra in chat
      </button>
      <SelectAvatar
        avatar={avatar}
        onChange={(value) => onChange("avatar", value)}
      />
    </form>
  );
};
