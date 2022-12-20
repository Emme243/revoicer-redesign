import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useToggle } from 'react-use';
import { DetailedHTMLProps, HTMLAttributes, useEffect } from 'react';
import { ISpeaker } from '../../intefaces/Speaker';

type ISpeakerSelectButtonProps = {
  speaker: ISpeaker;
  onToggleSelect?: (isOpen: boolean) => void;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

function SpeakerSelectButton(props: ISpeakerSelectButtonProps) {
  const { speaker, onToggleSelect, className, ...containerElementProps } = props;
  const [isOpen, toggleIsOpen] = useToggle(false);
  useEffect(() => {
    onToggleSelect?.(isOpen);
  }, [isOpen, onToggleSelect]);

  return (
    <div
      className={`inline-block rounded-3xl flex w-72 bg-dark-100 transition-all duration-200 hover:bg-dark-200 cursor-pointer items-center pl-3 py-2 pr-2.5 gap-2 dark:bg-dark-800 dark:hover:bg-dark-700 shadow-raised ${className}`}
      onClick={event => {
        toggleIsOpen();
        containerElementProps.onClick?.(event);
      }}
    >
      <img
        src={speaker.picture}
        alt={speaker.name}
        className="w-10 h-10 object-cover rounded-full shadow-image"
      />
      <div className="w-2/3 -space-y-0.5">
        <h3 className="font-semibold text-dark-700 dark:text-dark-300">{speaker.name}</h3>
        <p className="text-sm truncate text-dark-500 dark:text-dark-400">{speaker.description}</p>
      </div>
      <input type="checkbox" className="hidden peer" checked={isOpen} readOnly />
      <button className="transition-all text-dark-400 dark:text-dark-500 w-1/4 peer-checked:rotate-180">
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
    </div>
  );
}

export default SpeakerSelectButton;
