interface FieldType {
  changeUser: (
    event: React.ChangeEvent<HTMLInputElement>,
    prop: string
  ) => void;
  label: string;
  role: string;
}

interface FormType {
  changeUser: (
    event: React.ChangeEvent<HTMLInputElement>,
    role: string
  ) => void;
  createUser: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}

const Field = ({ changeUser, label, role }: FieldType) => {
  return (
    <div className="flex flex-col gap-3">
      <label className="font-bold text-2xl" htmlFor="username">
        {label}
      </label>
      <input
        className="p-5 bg-theme-v-700 rounded-2xl outline-0 outline-theme-gy-500 outline-offset-1 focus:outline-2 transition-outline duration-100 font-medium placeholder:text-theme-v-200"
        onChange={(event) => changeUser(event, role)}
        type="text"
        aria-label={`Input to set ${role}`}
        placeholder={`indica il tuo ${role}`}
      ></input>
    </div>
  );
};

export const JoinForm = ({ changeUser, createUser }: FormType) => {
  return (
    <form className="flex flex-col gap-y-3">
      <Field changeUser={changeUser} role="nickname" label="Nickname" />
      <Field changeUser={changeUser} role="name" label="Name" />
      <Field changeUser={changeUser} role="surname" label="Surname" />
      <input
        className="bg-theme-gy-400 text-theme-v-800 rounded-2xl py-4 cursor-pointer font-black my-4 text-2xl hover:bg-theme-gy-500  hover:scale-[1.02] transition-[colors_transform] duration-150 tracking-tight"
        type="submit"
        value="inizia a chattare"
        onClick={(event) => createUser(event)}
      />
    </form>
  );
};
