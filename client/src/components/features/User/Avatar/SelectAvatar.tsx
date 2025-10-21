import mi1 from "../../../../assets/svg/avatars/avatar_male_1.svg"; // sostituisci con l'immagine 'smile' se non hai questa
import mi2 from "../../../../assets/svg/avatars/avatar_male_2.svg"; // sostituisci con l'immagine 'smile' se non hai questa
import mi3 from "../../../../assets/svg/avatars/avatar_male_3.svg";
import fi1 from "../../../../assets/svg/avatars/avatar_female_1.svg"; // sostituisci con l'immagine 'smile' se non hai questa
import fi2 from "../../../../assets/svg/avatars/avatar_female_2.svg"; // sostituisci con l'immagine 'smile' se non hai questa
import fi3 from "../../../../assets/svg/avatars/avatar_female_3.svg";
import { useState } from "react"; // sostituisci con l'immagine 'smile' se non hai questa

type AvatarProps = {
  id: string;
  src: string;
  alt: string;
  isSelected?: boolean;
  onSelect?: () => void;
  className?: string;
};

const avatars: AvatarProps[] = [
  { id: "m1", src: mi1, alt: "Male Avatar 1" },
  { id: "m2", src: mi2, alt: "Male Avatar 2" },
  { id: "m3", src: mi3, alt: "Male Avatar 3" },
  { id: "f1", src: fi1, alt: "Female Avatar 1" },
  { id: "f2", src: fi2, alt: "Female Avatar 2" },
  { id: "f3", src: fi3, alt: "Female Avatar 3" },
];

export const Avatar = ({
  id,
  src,
  alt,
  isSelected,
  onSelect,
  className,
}: AvatarProps) => {
  return (
    <div
      id={id}
      className={`relative cursor-pointer flex items-center justify-center rounded-full overflow-hidden ${
        isSelected
          ? "bg-theme-v-700 outline-2 outline-theme-gy-200 outline-offset-2 scale-105"
          : "bg-theme-v-800 hover:bg-theme-v-700 hover:scale-105"
      } ${className}`}
      onClick={onSelect}
    >
      <img src={src} alt={alt} className="w-12 relative top-3" />
    </div>
  );
};

export const SelectAvatar = ({
  avatar,
  onChange,
}: {
  avatar: string;
  onChange: (value: string) => void;
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(
    avatar || null
  );

  return (
    <div className="grid grid-cols-3 grid-rows-2 w-1/2 mx-auto items-center gap-3">
      {avatars.map((avatar) => (
        <Avatar
          className="w-14 h-14"
          id={`${avatar.id} icon`}
          key={avatar.id}
          src={avatar.src}
          alt={avatar.alt}
          isSelected={selectedAvatar === avatar.src}
          onSelect={() => {
            setSelectedAvatar(avatar.src);
            onChange(avatar.src);
          }}
        />
      ))}
    </div>
  );
};
