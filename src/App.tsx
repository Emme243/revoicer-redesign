import ThemeButtonGroup from './components/molecules/ThemeButtonGroup';
import SpeakerSelectButton from './components/molecules/SpeakerSelectButton';
import { SPEAKERS } from './constants/speakers';

function App() {
  return (
    <div className="text-dark-900 dark:bg-dark-900 dark:text-dark-100 min-h-screen">
      <div className="m-5">
        <ThemeButtonGroup />
        <hr className="mb-2" />
        <h2>SpeakerSelectButton</h2>
        <SpeakerSelectButton
          speaker={SPEAKERS[0]}
          onToggleSelect={isOpen => {
            console.log('isOpen', isOpen);
          }}
        />
      </div>
    </div>
  );
}

export default App;
